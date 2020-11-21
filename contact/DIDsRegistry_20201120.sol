pragma solidity ^0.7.0;

contract DIDRegistry {
    
    mapping(address => address) public owners;  //identity => ownerAddress
    //mapping(address => mapping(bytes32 => mapping(address => uint))) public delegates;  //identity => delegateUrl => delegetAddress
    mapping(address => bytes32) public DIDsDocumentUrls; //identity => DIDsDocumentsUrlHash
    mapping(address => mapping(bytes32 => bytes32)) public DIDsDocumentInfo; //mapping identity => urlHash => docInfoHash
    //mapping(address => uint) public changed;
    //mapping(address => uint) public nonce;
    
    
    modifier onlyOwner(address identity, address actor) {
        require (actor == owners[identity]);
        _;
    }
    
    address public contractOwner;
    
    event Registered(
        address indexed identity,
        address owner,
        bytes32 UrlHash,
        uint timestamp
    );
    
    event DocumentChanged(
        address indexed identity,
        bytes32 UrlHash,
        uint timestamp
    );
    
    
    event DIDOwnerChanged(
        address indexed identity,
        address owner,
        uint timestamp
    );
    
    event DocumentInfoChanged(
        address indexed identity,
        bytes32 url_hash,
        bytes32 docHash,
        uint validTo,
        uint timestamp
    );
    
    constructor() {
        contractOwner = msg.sender;
    }
    
    //map the identity to owner address;map the identity to DIDUrl
    function registerIdentity(address _identity, bytes32 _url_hash) public returns(bool) {
        owners[_identity] = msg.sender;
        DIDsDocumentUrls[_identity] = _url_hash;
        emit Registered(_identity, msg.sender, _url_hash, block.timestamp);
        return true;
    }
    
    /* function checkSignature(address _identity, uint8 _sigV, bytes32 _sigR, bytes32 _sigS, bytes32 hash) internal returns(address) {
        address signer = ecrecover(hash, _sigV, _sigR, _sigS);
        require(signer == owners[_identity]);
        nonce[signer]++;
        return signer;
    } */
    
    function changeOwner(address _identity, address _newOwner) public onlyOwner(_identity, msg.sender) {
        owners[_identity] = _newOwner;
        emit DIDOwnerChanged(_identity, _newOwner, block.timestamp);
    }
    
    function changeDIDDocument(address _identity, bytes32 _previous_url_hash, bytes32 _new_hash) public onlyOwner(_identity, msg.sender) {
        require(DIDsDocumentUrls[_identity] == _previous_url_hash);
        DIDsDocumentUrls[_identity] == _new_hash;
        emit DocumentChanged(_identity, _new_hash, block.timestamp);
    }
    
    //map the identity to the document information hash
    function setDocumentInfo(address _identity, address _actor, bytes32 _url_hash, bytes32 _docHash, uint _validity) internal onlyOwner(_identity, _actor) {
        DIDsDocumentInfo[_identity][_url_hash] = _docHash;
        emit DocumentInfoChanged(_identity, _url_hash, _docHash, block.timestamp + _validity, block.timestamp);
      }
    
    //
    function setDocumentInfo(address _identity, bytes32 _url_hash, bytes32 _docHash, uint _validity) public {
        setDocumentInfo(_identity, msg.sender, _url_hash, _docHash, _validity);
    }
}