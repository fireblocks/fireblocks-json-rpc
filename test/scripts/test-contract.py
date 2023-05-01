import json
import os
from datetime import datetime
from web3 import Web3

web3 = Web3(Web3.IPCProvider(os.environ['FIREBLOCKS_JSON_RPC_ADDRESS'], 60000))
web3.eth.defaultAccount = web3.eth.accounts[0]
CONTRACT_ADDRESS = Web3.toChecksumAddress("0x8A470A36a1BDE8B18949599a061892f6B2c4fFAb")
GREETER_ABI = json.loads('[{"inputs":[{"internalType":"string","name":"_greeting","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"greet","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_greeting","type":"string"}],"name":"setGreeting","outputs":[],"stateMutability":"nonpayable","type":"function"}]')
GREETING = "Hello web3! By " + web3.eth.defaultAccount + " at " + str(datetime.now())

if __name__ == '__main__':
    print('last block number: ', web3.eth.blockNumber)
    for account in web3.eth.accounts:
        print('account: ', account)
        print('account balance: ', web3.fromWei(web3.eth.getBalance(account), "ether"), ' ETH\n')

    print('Greeter contract: https://goerli.etherscan.io/address/' + CONTRACT_ADDRESS)

    contract = web3.eth.contract(address=CONTRACT_ADDRESS, abi=GREETER_ABI)

    print('Current greeting:', contract.functions.greet().call())
    
    print('Setting greeting to:', GREETING)
    tx_hash = contract.functions.setGreeting(GREETING).transact()
    print('Transaction signed and broadcasted: https://goerli.etherscan.io/tx/' + tx_hash.hex())
    print('Waiting for transaction to be mined...')
    web3.eth.wait_for_transaction_receipt(tx_hash)

    print('Current greeting:', contract.functions.greet().call())
