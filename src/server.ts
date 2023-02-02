import { promisify } from "util"
import express from "express"
import { FireblocksWeb3Provider, FireblocksProviderConfig, version as FireblocksWeb3ProviderVersion } from "@fireblocks/fireblocks-web3-provider"
import { ServerConfig } from "./types";
import Debug from "debug";
import { DEBUG_NAMESPACE, DEFAULT_IPC_PATH } from "./constants";
import { version } from "../package.json"
import net from "net";
import { mkdirSync } from "fs";
import { dirname } from "path";

const debug = Debug(DEBUG_NAMESPACE);

async function applyDefaults(config: ServerConfig): Promise<ServerConfig> {
    return {
        ...config,
        port: config.port || 0,
        hostname: config.hostname || "127.0.0.1",
        httpPath: config.httpPath || `/${config.apiKey}`,
    }
}

function serverConfigToWeb3ProviderConfig(config: ServerConfig): FireblocksProviderConfig {
    const web3ProviderConfig = {
        ...config,
        userAgent: `${config.userAgent ? `${config.userAgent} ` : ''}fireblocks-json-rpc/${version} (${config.http ? 'HTTP' : 'IPC'})`
    }

    return web3ProviderConfig as FireblocksProviderConfig
}

function payloadId(): number {
    const date = Date.now() * Math.pow(10, 3);
    const extra = Math.floor(Math.random() * Math.pow(10, 3));
    return date + extra;
}

async function createServer(this: any, config: ServerConfig): Promise<{ server: net.Server, address: string }> {
    config = await applyDefaults(config)
    const web3ProviderConfig = serverConfigToWeb3ProviderConfig(config)

    const fireblocksProvider = new FireblocksWeb3Provider(web3ProviderConfig)

    function receiveRequest(jsonRpcRequest: any, exteernalResponseCallback: (response: any) => void) {
        debug("Received request", jsonRpcRequest)

        const responseCallback = (response: any) => {
            debug("Sending response", response)
            exteernalResponseCallback(response)
        }

        if (jsonRpcRequest.method == "web3_clientVersion") {
            const providerResponse = {
                "id": jsonRpcRequest.id ?? payloadId(),
                "jsonrpc": jsonRpcRequest.jsonrpc,
                "result": `${web3ProviderConfig.userAgent} fireblocks-web3-provider/${FireblocksWeb3ProviderVersion}`
            }

            responseCallback(providerResponse)
        } else {
            fireblocksProvider.send(jsonRpcRequest, (error, providerResponse) => {
                if (error) {
                    debug("Error received from FireblocksWeb3Provider: ", error)
                    providerResponse = {
                        "id": jsonRpcRequest.id,
                        "jsonrpc": jsonRpcRequest.jsonrpc,
                        error: { code: -32603, message: error.message }
                    }
                }

                responseCallback(providerResponse)
            })
        }
    }

    let app;

    if (config.http) {
        app = express()
        app.use(express.json())
        app.disable("x-powered-by")

        app.post(config.httpPath!, (req, res) => {
            receiveRequest(req.body, (response: any) => {
                res.send(response)
            })
        })
    } else {
        app = net.createServer(function (socket) {
            socket.on('data', function (data) {
                receiveRequest(JSON.parse(data.toString()), (response: any) => {
                    socket.write(JSON.stringify(response))
                })
            })
        })

        if (process.platform !== "win32") {
            mkdirSync(dirname(config.ipcPath!), { recursive: true });
        }
    }

    const server = config.http ?
        app.listen(config.port!, config.hostname!) :
        app.listen(config.ipcPath)

    const closeServerOnSignal = (signal: string) => {
        debug(`${signal} signal received: closing server`)
        server
        server.close(() => {
            debug('Server closed')
            process.exit(1)
        })
    }
    process.on('SIGINT', closeServerOnSignal)
    process.on('SIGTERM', closeServerOnSignal)

    await promisify<string>(server.once).bind(server)("listening")

    const addr = server.address()
    const address = typeof addr == 'string' ? addr : `http://${addr?.address}:${addr?.port}${config.httpPath}`

    return { server, address }
}

export { createServer }
