import sys
from web3 import Web3

web3 = Web3(Web3.IPCProvider(sys.argv[1], 60000))

print("block number: ", web3.eth.block_number)

address = Web3.to_checksum_address("0x000095E79eAC4d76aab57cB2c1f091d553b36ca0")
print("account balance: ", web3.from_wei(web3.eth.get_balance(address), "ether"))
