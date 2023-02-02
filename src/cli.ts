#!/usr/bin/env node
import { ServerConfig } from "./types"
import { createServer } from "."
import { createFireblocksJsonRpcCommand } from "./command"
import { spawn } from "child_process"
import { asciiTitle, DEBUG_NAMESPACE } from "./constants"
import { env, exit } from "process"
import Debug from "debug";

const debug = Debug(DEBUG_NAMESPACE);

async function main() {
    const command = createFireblocksJsonRpcCommand().parse()
    const options: ServerConfig = command.opts()
    const log = (message: string) => !(options as any).quiet && !(options as any).raw && console.log(message)

    if (options.verbose) {
        Debug.enable(DEBUG_NAMESPACE)
    }

    if (!options.chainId && !options.rpcUrl) {
        return console.error("error: chainId or rpcUrl must be provided")
    }

    log(asciiTitle)

    const { server, address } = await createServer(options)

    const args = command.args.map(arg => arg.replace("{}", address))

    if (options.raw) {
        console.log(address)
    } else {
        log(`Fireblocks JSON-RPC server listening on\n${address}\n`)
    }
    if (command.args.length > 0) {
        log(`Running command:\n${args.join(' ')}\n`)

        if (options.env) {
            env[options.env] = address
        }
        delete env['FIREBLOCKS_API_PRIVATE_KEY_PATH']
        delete env['FIREBLOCKS_API_KEY']

        let process
        try {
            process = spawn(command.args[0], args.slice(1), { stdio: "inherit" })
        } catch (error) {
            server.close()
            throw error
        }

        const onExit = (code: number | null) => {
            debug(`Child process exited with code ${code}`)
            server.close()
            exit(code === null ? 1 : code)
        }
        process.on("exit", onExit)
        process.on("disconnect", () => {
            onExit(null)
        })
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
