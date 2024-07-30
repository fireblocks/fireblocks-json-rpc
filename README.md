[![npm version](https://badge.fury.io/js/@fireblocks%2Ffireblocks-json-rpc.svg)](https://badge.fury.io/js/@fireblocks%2Ffireblocks-json-rpc)

# Fireblocks Local JSON-RPC

`fireblocks-json-rpc` is a command-line [JSON-RPC](https://ethereum.org/en/developers/docs/apis/json-rpc/) server powered by the Fireblocks API.  
Its goal is to make it easy for Fireblocks users to interact with EVM chains.

Additional SDKs:
* [Fireblocks Web3 Provider](https://github.com/fireblocks/fireblocks-web3-provider)
* [Fireblocks Hardhat Plugin](https://github.com/fireblocks/hardhat-fireblocks)

## Installation
```bash
npm install -g @fireblocks/fireblocks-json-rpc
```
#### Running in Docker 
As an alternative option, you can also run the Local JSON-RPC server as a Docker container using the official Docker image. 

**Please note the image is currently in beta.**

For more information, please see the official [DockerHub repository](https://hub.docker.com/r/fireblocksofficial/json-rpc).


## Usage
```sh
$ fireblocks-json-rpc --help
  _____ _          _     _            _              _ ____   ___  _   _       ____  ____   ____
 |  ___(_)_ __ ___| |__ | | ___   ___| | _____      | / ___| / _ \| \ | |     |  _ \|  _ \ / ___|
 | |_  | | '__/ _ \ '_ \| |/ _ \ / __| |/ / __|  _  | \___ \| | | |  \| |_____| |_) | |_) | |
 |  _| | | | |  __/ |_) | | (_) | (__|   <\__ \ | |_| |___) | |_| | |\  |_____|  _ <|  __/| |___
 |_|   |_|_|  \___|_.__/|_|\___/ \___|_|\_\___/  \___/|____/ \___/|_| \_|     |_| \_\_|    \____|

Usage: fireblocks-json-rpc [options] [-- tool [argument ...]]

A CLI for running a local Ethereum JSON-RPC server powered by Fireblocks

Options:
  --apiKey <key>                                               Fireblocks API key (env: FIREBLOCKS_API_KEY)
  --privateKey <path_or_contents>                              Fireblocks API private key (env: FIREBLOCKS_API_PRIVATE_KEY_PATH)
  --chainId [chainId]                                          Either chainId or rpcUrl must be provided (env: FIREBLOCKS_CHAIN_ID)
  --rpcUrl [rpcUrl]                                            Either rpcUrl or chainId must be provided (env: FIREBLOCKS_RPC_URL)
  --http                                                       Run an HTTP server instead of using IPC (env: FIREBLOCKS_HTTP)
  --port [port]                                                HTTP server port (default: 8545, env: FIREBLOCKS_PORT)
  --host [host]                                                HTTP server host (default: "127.0.0.1", env: FIREBLOCKS_HOST)
  --suppressHostWarning                                        Supress the warning printed when setting --host not to localhost (env: FIREBLOCKS_HOST)
  --httpPath [path]                                            HTTP JSON-RPC endpoint path (env: FIREBLOCKS_HTTP_PATH)
  --ipcPath [path]                                             IPC path to listen on, defaults to '~/.fireblocks/json-rpc.ipc' on linux and macos, and '\\.\pipe\fireblocks-json-rpc.ipc'
                                                               on windows (default: "/Users/user/.fireblocks/json-rpc.ipc", env: FIREBLOCKS_IPC_PATH)
  --env [env_var_name]                                         Sets the listening address as an environment variable (default: "FIREBLOCKS_JSON_RPC_ADDRESS", env:
                                                               FIREBLOCKS_JSON_RPC_ENV_VAR)
  --vaultAccountIds [vaultAccountIds]                          Fireblocks Web3 Provider option (env: FIREBLOCKS_VAULT_ACCOUNT_IDS)
  --apiBaseUrl [apiBaseUrl]                                    Fireblocks Web3 Provider option (env: FIREBLOCKS_API_BASE_URL)
  --fallbackFeeLevel [fallbackFeeLevel]                        Fireblocks Web3 Provider option (env: FIREBLOCKS_FALLBACK_FEE_LEVEL)
  --note [note]                                                Fireblocks Web3 Provider option (default: "Created by Fireblocks JSON-RPC", env: FIREBLOCKS_NOTE)
  --pollingInterval [pollingInterval]                          Fireblocks Web3 Provider option (env: FIREBLOCKS_POLLING_INTERVAL)
  --oneTimeAddressesEnabled [oneTimeAddressesEnabled]          Fireblocks Web3 Provider option (env: FIREBLOCKS_ONE_TIME_ADDRESSES_ENABLED)
  --externalTxId [externalTxId]                                Fireblocks Web3 Provider option (env: FIREBLOCKS_EXTERNAL_TX_ID)
  --userAgent [userAgent]                                      Fireblocks Web3 Provider option (env: FIREBLOCKS_USER_AGENT)
  --logTransactionStatusChanges [logTransactionStatusChanges]  Fireblocks Web3 Provider option (env: FIREBLOCKS_LOG_TX_STATUS_CHANGES)
  -q, --quiet                                                  Don't print anything (env: FIREBLOCKS_QUIET)
  -v, --verbose                                                Print a lot of stuff, useful for debugging, same as setting DEBUG=fireblocks-json-rpc (env: FIREBLOCKS_VERBOSE)
  -r, --raw                                                    Only output the listening address (env: FIREBLOCKS_VERBOSE)
  --version                                                    Output the version number
  -h, --help                                                   display help for command

Learn more about the Fireblocks Web3 Provider configuration options at
https://github.com/fireblocks/fireblocks-web3-provider#fireblocksproviderconfig

Example usage:
  Basic usage:
      $ fireblocks-json-rpc --apiKey <key> --privateKey <path_or_contents> --chainId <chainId>
      $ fireblocks-json-rpc --apiKey <key> --privateKey <path_or_contents> --rpcUrl <rpcUrl>

  Using environment variables (.env file also works):
      $ FIREBLOCKS_API_KEY=<key> FIREBLOCKS_API_PRIVATE_KEY_PATH=<path_or_contents> FIREBLOCKS_CHAIN_ID=<chainId>         fireblocks-json-rpc

  Run another tool using "--":
      $ fireblocks-json-rpc --http -- cast estimate 0x5fe5a74b7628c43514DB077d5E112cf6593ed8D3 "increment()" --rpc-url {}
      $ fireblocks-json-rpc --http -- forge script script/NFT.s.sol:MyScript --sender "0x827226cc80020b343a8c03e44A974CEbF0336e74" --broadcast --unlocked --rpc-url {}

  Print requests and responses using --verbose:
      $ fireblocks-json-rpc --verbose --http -- cast estimate 0x5fe5a74b7628c43514DB077d5E112cf6593ed8D3 "increment()" --rpc-url {}

  Using a sandbox workspace with --apiBaseUrl:
      $ fireblocks-json-rpc --apiBaseUrl https://sandbox-api.fireblocks.io --apiKey <key> --privateKey <path_or_contents> --chainId <chainId>
```

## Development

### Installation
```bash
npm install
npm run build
npm install -g .
```
