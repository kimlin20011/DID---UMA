import EthrDID from 'EthrDID'
import Web3 from 'web3'
Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send
const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const ethrDid = new EthrDID({provider, address, registry})

const keypair = EthrDID.createKeyPair()
// Save keypair somewhere safe

console.log(keypair)

//const ethrDid = new EthrDID({...keypair, provider