// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

//import merkle library
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract ExampleNFT is ERC1155, Ownable { //0xb1cdf03F187b03b2b0b796a5d4b771D297309B12
   
    string public name;
    string public symbol;

    uint256 public saleState;
    address payable public withdrawWallet;

    mapping(uint256 => uint256) public maxPerTokenId;
    mapping(uint256 => uint256) public maxSupply;
    mapping(uint256 => uint256) public mintAmount;
    //could be tiered mint price
    mapping(uint256 => uint256) public mintPrice;

    //store merkle tree root 
    bytes32 public merkleRoot;

    constructor() ERC1155("https://gateway.pinata.cloud/ipfs/QmS4zRSb9Pe2HhvAnNQfndmd2i8PbmgNnF8FKyKk7ML4XU/{id}.json") {
        name = "Example";
        symbol = "XMPLE";
    }

    //set merkleRoot
    function setMerkleRoot(bytes32 _merkleRoot) public onlyOwner {
        merkleRoot = _merkleRoot;
    }

    //set ipfs uri
    function setURI(string memory newuri) external onlyOwner {
        _setURI(newuri);
    }

    //override ipfs uri to add tokenId
    function uri(uint256 _tokenId) override public pure returns (string memory) {
        return string(
            abi.encodePacked(
                "https://gateway.pinata.cloud/ipfs/QmS4zRSb9Pe2HhvAnNQfndmd2i8PbmgNnF8FKyKk7ML4XU/",
                Strings.toString(_tokenId),
                ".json"
            )
        );
    }

    //set WL/ public 
    function setSaleState(uint256 _saleState) external onlyOwner {
        saleState = _saleState;
    }

    //set maxPerTokenId
    function setmaxPerTokenId(uint256 _id, uint256 _maxPerTokenId) external onlyOwner {
        maxPerTokenId[_id] = _maxPerTokenId;
    }

    //set maxSupply
    function setMintAmount(uint256 _id, uint256 _mintAmount) external onlyOwner {
        mintAmount[_id] = _mintAmount;
    }

    //set maxSupply
    function setMaxSupply(uint256 _id, uint256 _maxSupply) external onlyOwner {
        maxSupply[_id] = _maxSupply;
    }

    //set mintPrice
    function setMintPrice(uint256 _id, uint256 _mintPrice) external onlyOwner {
        mintPrice[_id] = _mintPrice;
    }

    //set withdraw wallet
    function setWithdrawWallet(address payable _withdrawWallet) external onlyOwner {
        withdrawWallet = _withdrawWallet;
    }

    //withdraw funds
    function withdraw() external onlyOwner {
        (bool success, ) = withdrawWallet.call{value: address(this).balance }('');
        require(success, 'withdraw failed');
    }


//=====================================================================================================//

//MINT Details

//=====================================================================================================//
    //mint WL
    function mintWLOnly(uint256 _id, uint256 _amount, bytes32[] calldata merkleProof) external payable {

        require(mintAmount[_id] + _amount <= maxSupply[_id], "Not enough supplies");
        require(saleState == 1, "WL Minting is not live");
        require(msg.value == mintPrice[_id] * _amount, "Insufficient funds");
        require(_amount <= maxPerTokenId[_id], "Exceed max mint");

        //use merkleRoot to verify against merkleProof and leaf
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(MerkleProof.verify(merkleProof, merkleRoot, leaf), "Not on WL");
        
        mintAmount[_id] += _amount;
        
        _mint(msg.sender, _id, _amount, '');
        
    }

    //mint Public
    function mintPublic(uint256 _id, uint256 _amount) external payable {

        require(mintAmount[_id] + _amount <= maxSupply[_id], "Not enough supplies");
        require(saleState == 2, "WL Minting is not live");
        require(msg.value == mintPrice[_id] * _amount, "Insufficient funds");
        require(_amount <= maxPerTokenId[_id], "Exceed max mint");
          
        mintAmount[_id] += _amount;
        
        _mint(msg.sender, _id, _amount, '');
        
    }

}
