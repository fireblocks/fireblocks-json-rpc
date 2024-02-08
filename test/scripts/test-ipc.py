import sys
from web3 import Web3

web3 = Web3(Web3.IPCProvider(sys.argv[1], 60000))

print("block number: ", web3.eth.blockNumber)

address = Web3.toChecksumAddress("0x000095E79eAC4d76aab57cB2c1f091d553b36ca0")
print("account balance: ", web3.fromWei(web3.eth.getBalance(address), "ether"))
