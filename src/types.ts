import { FireblocksProviderConfig } from '@fireblocks/fireblocks-web3-provider'

type ServerConfig = FireblocksProviderConfig & {
    port?: number,
    hostname?: string,
    httpPath?: string,
    verbose?: boolean,
    quiet?: boolean,
    http?: boolean,
    ipcPath?: string,
    raw?: boolean,
    env?: string,
}

export { ServerConfig }