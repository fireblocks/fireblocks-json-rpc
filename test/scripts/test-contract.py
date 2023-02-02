import json
import os
from web3 import Web3

web3 = Web3(Web3.IPCProvider(os.environ['FIREBLOCKS_JSON_RPC_ADDRESS'], 60000))
CONTRACT_ADDRESS = Web3.toChecksumAddress("0x8A470A36a1BDE8B18949599a061892f6B2c4fFAb")
GREETER_ABI = json.loads('[{"inputs":[{"internalType":"string","name":"_greeting","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"greet","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_greeting","type":"string"}],"name":"setGreeting","outputs":[],"stateMutability":"nonpayable","type":"function"}]')
GREETING = "Hello web3"

if __name__ == '__main__':
    web3.eth.defaultAccount = web3.eth.accounts[0]
    contract = web3.eth.contract(address=CONTRACT_ADDRESS, abi=GREETER_ABI)
    tx_hash = contract.functions.setGreeting(GREETING).transact()
