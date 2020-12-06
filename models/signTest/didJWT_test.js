const didJWT = require('did-jwt')
const signer = didJWT.SimpleSigner('278a5de700e29faae8e40e366ec5012b5ec63d36ec77e8a2417154cc1d25383f');
const Resolver = require('did-resolver')
const ethrDid =  require('ethr-did-resolver').getResolver({rpcUrl: 'https://mainnet.infura.io/v3/...'})

let resolver = new Resolver.Resolver(ethrDid)

// let jwt;

async function a(){
    let jwt = await didJWT.createJWT({aud: 'did:ethr:0xf3beac30c498d9e26865f34fcaa57dbb935b0d74', exp: 1957463421, name: 'uPort Developer'},
    {alg: 'ES256K', issuer: 'did:ethr:0xf3beac30c498d9e26865f34fcaa57dbb935b0d74', signer})
    console.log(jwt);

    let decoded = await didJWT.decodeJWT(jwt)
    console.log(decoded)

    let verifiedResponse = await didJWT.verifyJWT(jwt, {resolver: resolver, audience: 'did:ethr:0xf3beac30c498d9e26865f34fcaa57dbb935b0d74'})
    console.log(verifiedResponse);
}

a();