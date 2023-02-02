#!/usr/bin/env node
import { textSync } from "figlet"
import { homedir } from "os"



export const asciiTitle = textSync("Fireblocks JSON-RPC")
export const DEBUG_NAMESPACE = "fireblocks-json-rpc"
export const LINUX_DEFAULT_IPC_PATH = "~/.fireblocks/json-rpc.ipc"
export const WINDOWS_DEFAULT_IPC_PATH = "\\\\.\\pipe\\fireblocks-json-rpc.ipc"
export const DEFAULT_IPC_PATH = process.platform === "win32" ?
    WINDOWS_DEFAULT_IPC_PATH :
    LINUX_DEFAULT_IPC_PATH.replace("~", homedir())
export const DEFAULT_ENV_VAR = "FIREBLOCKS_JSON_RPC_ADDRESS"
export const FIREBLOCKS_WEB3_PROVIDER_OPTION_DESC = "Fireblocks Web3 Provider option"
export const DEFAULT_TX_NOTE = "Created by Fireblocks JSON-RPC"
