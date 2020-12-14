pragma solidity ^0.7.0;

contract DIDRegistry {
    
    mapping(address => address) public owners;  //identity => ownerAddress
    mapping(address => bytes) public DIDsDocumentUrls; //identity => DIDsDocumentsUrlHash
    mapping(address => mapping(bytes32 => bytes32)) public DIDsDocumentInfo; //mapping identity => urlHash => docInfoHash
    mapping(address => mapping(bytes32 => uint)) public DIDsUrlExpiration; //mapping identity => urlHash => docInfoHash
    
    modifier onlyOwner(address identity, address actor) {
        require (actor == owners[identity]);
        _;
    }
    
    address public contractOwner;
    
    event Registered(
        address indexed identity,
        address owner,
        bytes32 url_hash_keccak256,
        uint timestamp
    );
    
    event DocumentUrlChanged(
        address indexed identity,
        bytes url,
        uint timestamp
    );
    
    event DIDOwnerChanged(
        address indexed identity,
        address owner,
        uint timestamp
    );
    
    event DocumentInfoChanged(
        address indexed identity,
        bytes32 url_hash_keccak256,
        bytes32 docHash,
        uint validTo,
        uint timestamp
    );
    
    event DIDrevoked(
        address indexed identity,
        bool status
    );
    
    constructor() {
        contractOwner = msg.sender;
    }
    
    //map the identity to owner address;map the identity to DIDUrl
    function registerIdentity(address _identity, bytes memory _url) public returns(bool) {
        owners[_identity] = msg.sender;
        //(keccak256(abi.encodePacked(_url, msg.sender, random_number))) ;
        DIDsDocumentUrls[_identity] = _url;
        
        emit Registered(_identity, msg.sender, (keccak256(abi.encodePacked(DIDsDocumentUrls[_identity]))), block.timestamp);
        return true;
    }
    
    function revokeIdentity(address _identity) public  onlyOwner(_identity, msg.sender) {
        delete DIDsDocumentUrls[_identity];
        delete DIDsDocumentInfo[_identity][(keccak256(abi.encodePacked(DIDsDocumentUrls[_identity])))];
        emit DIDrevoked(_identity, true);
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
    
    function changeDIDDocumentUrl(address _identity, bytes memory _previous_url, bytes memory _new_url) public onlyOwner(_identity, msg.sender) {
        require((keccak256(abi.encodePacked(DIDsDocumentUrls[_identity]))) == (keccak256(abi.encodePacked(_previous_url))));
        DIDsDocumentUrls[_identity] = _new_url;
        emit DocumentUrlChanged(_identity, DIDsDocumentUrls[_identity], block.timestamp);
    }
    
    //map the identity to the document information hash
    function setDocumentInfo(address _identity, bytes memory _url, bytes memory _doc, uint _expTime) public onlyOwner(_identity, msg.sender) {
        bytes32 url = (keccak256(abi.encodePacked(_url)));
        bytes32 doc = (keccak256(abi.encodePacked(_doc)));
        DIDsDocumentInfo[_identity][url] = doc;
        DIDsUrlExpiration[_identity][url]= block.timestamp + _expTime;
        emit DocumentInfoChanged(_identity, url, doc, block.timestamp + _expTime, block.timestamp);
    }
      
   function verifyUrl(address _identity, bytes memory _url) public view returns(bool){
       bytes32 url = (keccak256(abi.encodePacked(_url)));
       if((keccak256(abi.encodePacked(DIDsDocumentUrls[_identity]))) == url){
           return true;
       } else {
           return false;
       }
   }

   function verifyDocument(address _identity, bytes memory _url,bytes memory _doc) public view returns(bool){
       bytes32 url = (keccak256(abi.encodePacked(_url)));
       bytes32 doc = (keccak256(abi.encodePacked(_doc)));
       if(DIDsDocumentInfo[_identity][url]== doc){
           return true;
       } else {
           return false;
       }
   }
}