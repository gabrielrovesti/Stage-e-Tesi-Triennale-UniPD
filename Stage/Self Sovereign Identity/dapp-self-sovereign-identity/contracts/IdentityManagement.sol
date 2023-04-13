pragma solidity ^0.5.8;

contract IdentityManagement
{

    address contractOwner;
    
    constructor() public {
        contractOwner = msg.sender;
    }

    struct UserInfo{
		string fullName;
		string emailId;
		uint mobileNo;
    }
    
    struct UserTraderCert{
		string tcNo;
		string tcFullName;
                        string tcId;
		string tcBirthDate;
		string tcAddress;
                        bytes tcGreater500kHash;
                        bytes tcAtLeast1YearHash; 
                        bytes tc10TransHash;
    }

    struct TradeCertRequest{
		string requestedBy;
                        uint tcNo;
                        uint tcFullNameAndId;
                        uint tcBirthDate;
                        uint tcAddress;
                        uint tcGreater500kHash;
                        uint tcAtLeast1YearHash; 
                        uint tc10TransHash;
                        uint requestOverAllStatus;
    }

    /*
            ApprovalStatus
        -------------
        0 --  default status
        1 --  Requested
        2 --  Approved
        3 --  Rejected
    */

    mapping(address => UserInfo[]) userMap;
    mapping(address => UserTraderCert[]) userTraderCertMap;
    mapping(address => TradeCertRequest[]) tradeCertRequestMap;
	
    function addUser(address userAddress, string memory fullName, string memory emailId, uint mobileNo) public
    {
        userMap[userAddress].push(UserInfo(fullName, emailId, mobileNo));
    }

    function addUserTraderCert(address userAddress, string memory tcNo, string memory tcFullName, string memory tcId, string memory tcBirthDate, string memory tcAddress, bytes memory tcGreater500kHash, bytes memory tcAtLeast1YearHash, bytes memory tc10TransHash) public
    {
        userTraderCertMap[userAddress].push(UserTraderCert(tcNo,  tcFullName, tcId, tcBirthDate, tcAddress, tcGreater500kHash,  tcAtLeast1YearHash, tc10TransHash));
    }

    function addTradeCertRequest(address userAddress, string memory requestedBy, uint tcNo, uint tcFullNameAndId, uint tcBirthDate, uint tcAddress, uint tcGreater500kHash, uint tcAtLeast1YearHash, uint tc10TransHash, uint requestOverAllStatus) public
    {
        tradeCertRequestMap[userAddress].push(TradeCertRequest(requestedBy, tcNo, tcFullNameAndId, tcBirthDate, tcAddress, tcGreater500kHash, tcAtLeast1YearHash, tc10TransHash, requestOverAllStatus));
    }

    function viewTradeCertRequestLength(address userAddress) public view returns(uint) 
    {
        return tradeCertRequestMap[userAddress].length;
    }

    function viewTradeCertRequestHeader(address userAddress, uint requestIndex) public view returns(string memory requestedBy, uint requestOverAllStatus) 
    {
        TradeCertRequest memory thisTradeCertRequest= tradeCertRequestMap[userAddress][requestIndex];
        return (thisTradeCertRequest.requestedBy, thisTradeCertRequest.requestOverAllStatus);
    }

    function viewTradeCertRequestDetail(address userAddress, uint requestIndex) public view returns(string memory requestedBy, uint tcNo, uint tcFullNameAndId, uint tcBirthDate, uint tcAddress,  uint tcGreater500kHash, uint tcAtLeast1YearHash, uint tc10TransHash, uint requestOverAllStatus
    ) 
    {
        TradeCertRequest memory thisTradeCertRequest= tradeCertRequestMap[userAddress][requestIndex];
        return (thisTradeCertRequest.requestedBy, thisTradeCertRequest.tcNo, thisTradeCertRequest.tcFullNameAndId, thisTradeCertRequest.tcBirthDate, thisTradeCertRequest.tcAddress, thisTradeCertRequest.tcGreater500kHash, thisTradeCertRequest.tcAtLeast1YearHash, thisTradeCertRequest.tc10TransHash, thisTradeCertRequest.requestOverAllStatus);
    }

    function updateRequestStatus(address userAddress, uint requestIndex, uint tcNo, uint tcFullNameAndId, uint tcBirthDate, uint tcAddress, uint tcGreater500kHash, uint tcAtLeast1YearHash, uint tc10TransHash, uint requestOverAllStatus) public
    {
            tradeCertRequestMap[userAddress][requestIndex].tcNo = tcNo;
            tradeCertRequestMap[userAddress][requestIndex].tcFullNameAndId = tcFullNameAndId;
            tradeCertRequestMap[userAddress][requestIndex].tcBirthDate = tcBirthDate;
            tradeCertRequestMap[userAddress][requestIndex].tcAddress = tcAddress;
            tradeCertRequestMap[userAddress][requestIndex].tcGreater500kHash = tcGreater500kHash;
            tradeCertRequestMap[userAddress][requestIndex].tcAtLeast1YearHash = tcAtLeast1YearHash;
            tradeCertRequestMap[userAddress][requestIndex].tc10TransHash = tc10TransHash;
            tradeCertRequestMap[userAddress][requestIndex].requestOverAllStatus = requestOverAllStatus;
    }

    function viewUser(address userAddress, uint userIndex) public view returns(string memory fullName, string memory emailId, uint mobileNo) 
    {
        UserInfo memory thisUser = userMap[userAddress][userIndex];
        return (thisUser.fullName, thisUser.emailId, thisUser.mobileNo);
    }

    function viewUserTraderCert(address userAddress) public view returns(string memory tcNo, string memory tcFullNameAndId, string memory tcBirthDate, string memory tcAddress, bytes memory tcGreater500kHash, bytes memory tcAtLeast1YearHash, bytes memory tc10TransHash)
    {
        UserTraderCert memory thisUserTraderCert = userTraderCertMap[userAddress][0];
        return (thisUserTraderCert.tcNo, 
        strConcat(thisUserTraderCert.tcFullName, " (",  thisUserTraderCert.tcId, ")", ""),
        thisUserTraderCert.tcBirthDate, 
        thisUserTraderCert.tcAddress, thisUserTraderCert.tcGreater500kHash, 
        thisUserTraderCert.tcAtLeast1YearHash, 
        thisUserTraderCert.tc10TransHash);
    }

    function strConcat(string memory _a, string memory _b, string memory _c, string memory _d, string memory _e) internal view returns (string memory){
        bytes memory _ba = bytes(_a);
        bytes memory _bb = bytes(_b);
        bytes memory _bc = bytes(_c);
        bytes memory _bd = bytes(_d);
        bytes memory _be = bytes(_e);
        string memory abcde = new string(_ba.length + _bb.length + _bc.length + _bd.length + _be.length);
        bytes memory babcde = bytes(abcde);
        uint k = 0;
        for (uint i = 0; i < _ba.length; i++) babcde[k++] = _ba[i];
        for (uint i = 0; i < _bb.length; i++) babcde[k++] = _bb[i];
        for (uint i = 0; i < _bc.length; i++) babcde[k++] = _bc[i];
        for (uint i = 0; i < _bd.length; i++) babcde[k++] = _bd[i];
        for (uint i = 0; i < _be.length; i++) babcde[k++] = _be[i];
        return string(babcde);
    }
}
