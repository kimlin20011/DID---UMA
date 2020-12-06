# DID-UMA

# DID-Resolver Design

# 參考資料
* [Baidu DID ](https://did.baidu.com/did-resolver-api/)
* [Decentralized Identifiers (DIDs) v1.0](https://www.w3.org/TR/did-core
* [將資料編碼為bytes32](https://ethereum.stackexchange.com/questions/23058/how-to-convert-string-to-bytes32-in-web3js)

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
> `http://localhost:3001/didRegistry/deploy`
> did管理人員部署 DID registry合約
* 參數：
    * account：geth中的帳戶地址
    * password：geth中帳戶設定的密碼


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