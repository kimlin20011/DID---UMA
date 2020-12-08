# DID-UMA
# DID-Resolver Design

# 參考資料
* [Baidu DID ](https://did.baidu.com/did-resolver-api/)
* [Decentralized Identifiers (DIDs) v1.0](https://www.w3.org/TR/did-core
* [將資料編碼為bytes32](https://ethereum.stackexchange.com/questions/23058/how-to-convert-string-to-bytes32-in-web3js)


# 設計筆記
## DID Document URL
* router格式 為 domain之後加 DIDDocument 路由
* 參數代did數值，範例：
http://localhost:3001/DIDDocument/?did={id}

# 主要功能
* resolve：根據DID return document
* dereference:從DID Url取得resource
![](https://i.imgur.com/Nzbopyt.png)

* 輸入DID
    * ex：`did:ethr:development:0xabcabc03e98e0dc2b855be647c39abe984193675`
* 步驟一（DID resolve）：
    * 解析did，並從did registry 挖掘相關資料 (DID Url)
    * 從did registry 中的 url取得相關資料
* 步驟二（dereference）：
    * 從did registry中的url，取得相關did document資料


# DID resolver API
## DID resolve
* 輸入
    * did(string)
    * versionID(DID 版本)
* 輸出
    * DID document
* 動作
    * 拆解did，識別identifier
    * 透過智能合約取得url encode之後的值（bytes => base64 => url string）
    * decode url
    * 透過Url取得DID document並回傳

### resolve
> get
> http://localhost:3001/didResolver/resolve?did={did}
* 說明：透過didResolver取得對應的did document
* 流程
    * resolver model取得url後面的did
    * resolver向智能合約取得did document url
    * resolver透過url向did storage取得did document檔案並作為輸出回傳
* 輸入：did
    * ex：`did:ethr:0x46D7e659044A21A11547f4Eec966Ad0da4CFb671`
* 輸出：did document objext
    * ex:
```json=
{
    "@context": "https://w3id.org/did/v1",
    "id": "did:ethr:0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
    "issuer": "did:ethr:0xb9c5714089478a327f09197987f16f9e5d936e8a",
    "publicKey": [
        {
            "id": "did:ethr:0x5B38Da6a701c568545dCfcB03FcB875f56beddC4#controller",
            "type": "Secp256k1VerificationKey2018",
            "controller": "did:ethr:0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
            "ethereumAddress": "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"
        }
    ],
    "claim": {
        "staffID": "a2020011",
        "allowenceStatus": 1,
        "expire": 1609372800
    },
    "signautre": [
        {
            "type": "Secp256k1SignatureAuthentication2018",
            "publicKey": "did:ethr:0xb9c5714089478a327f09197987f16f9e5d936e8a#controller",
            "nonce": "factory013",
            "signaturevalue": "dsfdasfadswefsdadsvczegnbrthnrtsda"
        }
    ]
}
```


## DID Dereference
* 輸入
    * did URL (可以先轉換為base64後，在編碼為bytes32)
* 輸出
    * didDocument

![](https://i.imgur.com/WvH3Ae2.png)


## DID operation 
* 創建、修改、刪除 DID
* 輸入
    * did
    * document
    * operation（create/delete/modify）
    * timestamp
    * signature(修改與刪除的時候需要)
* 輸出
    * 處理的ID （transactionID）

### Deploy registry contract
> post
> `http://localhost:3001/didRegistry/deploy`
> did管理人員部署 DID registry合約
* 參數：
    * account：geth中的帳戶地址
    * password：geth中帳戶設定的密碼


### registerIdentity
> post
> `http://localhost:3001/didRegistry/registerIdentity`
* DID　controller 可以註冊其did與did document url到did registry
* 輸入參數
    * url：存取did的url
    * account：controller 的以太坊account
    * identity
    * registryAddress
    * password：controller 的geth密碼
* 輸出
    * Registered event

### setDocumentInfo
> post
> `http://localhost:3001/didRegistry/setDocumentInfo`
* DID　controller 可以註冊其did url中的驗證用 document hash到 registry
* 輸入參數
    * url：存取did的url
    * account：controller 的以太坊account
    * identity
    * registryAddress
    * password：controller 的geth密碼
    * docHex: document編碼過後的的值
    * expTime: 設定有效期間
* 輸出
    * DocumentInfoChanged event

### verifyUrl
* 驗證url的完整性
* 輸入編碼後的url與identity，輸出true/false

### DIDsDocumentUrls
> get
> http://localhost:3001/didRegistry/DIDsDocumentUrls
* 從從智能合約取得已註冊的編碼後did url
* 輸入 identifier
* 輸出編碼後的did url

### verifyDocument


## DID operation result
* 輸入
    * transactionID
* 輸出
    * status

    
# 研究
## 智能合約中URL存取型態
* URL存入
    * 先將URL編碼成base64
    * 再將base64的string透過web3轉換成hex

`web3.utils.utf8ToHex(string)    `

* URL讀取
    * 從solidity中將bytes變數讀出
    * 將讀出數值透過web3轉換成utf-8 string
    * 最後透過base64解碼

`web3.utils.hexToUtf8(Hex2)`




###### tags: `區塊鏈物聯網研究`