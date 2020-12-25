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
    
    string public method;
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
    
    constructor(string memory _method) {
        contractOwner = msg.sender;
        method = _method;
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


contract Authorization {
    
    struct AuthorizationInfo{
        uint registerTime;
        bytes32 claimHash;
        uint expireTime;
    }
    
    mapping(address => address) public owners;  //identity => ownerAddress
    mapping(address => bool) public protectedResourceDIDs;
    mapping(bytes32 => address) public permissionTickets; //tickets => DID
    mapping(address => AuthorizationInfo) public authorizationPolicies; //requestPartyDID => AuthorizationInfo
    mapping(address => mapping(bytes32 => bytes32)) public accessToken; //DIDrqp => ticket => token
    
    modifier onlyOwner(address _sender) {
        require (contractOwner == _sender);
        _;
    }
    
    modifier verifyDID(address _identity) {
       DIDRegistry RC = DIDRegistry(_identity);
       require (RC.owners(_identity) != address(0));
       _;
    }
    
    address public DIDRegistryAddress;
    address public contractOwner;
    string public DID_method;
    uint public tokenExpireDays = 30;
    
    event DIDRegistryAddressChanged(
        address indexed DIDRegistryAddress,
        string method,
        uint timestamp
    );
    
    event PolicyRegistered(
        address indexed targetDID,
        address msgSender, 
        string claimHash,
        uint timestamp,
        uint expireTime
    );
    
    event ProtectedResourceDIDCreated(
        address indexed protectedResourceDID,
        uint timestamp
    );
    
    event TicketGenerated(
        address protectedResourceIdentifier, 
        bytes32 permissionTicket, 
        address msgSender,
        string DID_Method
    );
    
    event TokenReleased (
        address DIDrqp,
        address msgSender,
        bytes32 accessToken,
        uint timestamp,
        uint expireTime
    );
    
    constructor(address _DIDRegistryAddress, string memory _method) {
        contractOwner = msg.sender;
        DID_method = _method;
        DIDRegistryAddress = _DIDRegistryAddress;
    }
    
    function setDIDRegistry(address _DIDRegistryAddress, string memory _DID_method) public onlyOwner(msg.sender){
        DIDRegistryAddress = _DIDRegistryAddress;
        DID_method = _DID_method;
        emit DIDRegistryAddressChanged(_DIDRegistryAddress,DID_method,block.timestamp);
    }
    
    function setProtectedResourceDID(address _idenetity) public onlyOwner(msg.sender){
        protectedResourceDIDs[_idenetity] =true;
        emit ProtectedResourceDIDCreated(_idenetity,block.timestamp);
    }
    
    function setPolicy(address _idenetity, bytes memory _claim, uint _expireDate) public onlyOwner(msg.sender){
        bytes32 claimHash = (keccak256(abi.encodePacked(_claim)));
        uint expireDate = block.timestamp+ _expireDate* 1 days;
        authorizationPolicies[_idenetity] = AuthorizationInfo(
            block.timestamp,
            claimHash,
            expireDate
            );
        emit PolicyRegistered(_idenetity,msg.sender,claimHash,block.timestamp,expireDate);
    }


    function ticketGenerate(address _DeviceIdentity, string memory _DID_method) public verifyDID(_DeviceIdentity) {
        //要先檢查msg.sender(resource server)與identifier是否存在
        require(protectedResourceDIDs[_DeviceIdentity] == true  ,"identifier");
        require((keccak256(abi.encodePacked(_DID_method))) == (keccak256(abi.encodePacked(DID_method)))  ,"invalid_method");
        uint random_number = uint(keccak256(abi.encodePacked(block.timestamp)))%100 +1;
        bytes32 ticket= (keccak256(abi.encodePacked(random_number, msg.sender, _DeviceIdentity))) ;
        //用ticket mapping到identifier 以利查詢ticket是要對應到什麼resource
        permissionTickets[ticket] = _DeviceIdentity;
        emit TicketGenerated(_DeviceIdentity, ticket, msg.sender, DID_method);
    }
    
    function accessAuthorize(
        bytes32 _ticket,
        address _DIDrqp, 
        uint8 _v,
        bytes32 _r,
        bytes32 _s
        ) public returns(bool) {
        //ticket mapping到identifier 以查詢ticket是要對應到什麼resource
        require(permissionTickets[_ticket] != address(0), "invaild_ticket");
        AuthorizationInfo storage claimInfo = authorizationPolicies[permissionTickets[_ticket]];
        
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        address signer = ecrecover(
            (keccak256(abi.encodePacked(prefix,claimInfo.claimHash))),
            _v, _r, _s
        );
        
        if(signer == _DIDrqp){
            // Token透過msg.sender/timestamp/random number/隨機生成
            uint random_number = uint(keccak256(abi.encodePacked(block.timestamp)))%100 +1;
            uint expireDate = block.timestamp+ tokenExpireDays * 1 days;
            accessToken[msg.sender][_ticket] = (keccak256(abi.encodePacked(block.timestamp, _DIDrqp,_ticket, random_number))) ;
            emit TokenReleased(_DIDrqp,msg.sender,accessToken[msg.sender][_ticket],block.timestamp,expireDate);
            return true;
        }else{
            return false;
        }
    }
    
    function TokenIntrospect(address _identity, bytes memory _url) public view returns(address){
        require(_token != 0, "invaild_signedToken");

        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        address signer = ecrecover(
            (keccak256(abi.encodePacked(prefix,_token))),
            _v, _r, _s
        );

        if(access_token[signer] != 0 && access_token[signer] == _token){
            return signer;
        }else{
            return signer;
        }

    }
}