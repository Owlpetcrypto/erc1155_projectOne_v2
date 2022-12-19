const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

let whitelistAddresses = [
  "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
  "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
  "0x46685d1f7A86f037a019Ec33a4D29b491d2E645D",
  "0x65AAf6d3fAe0E3BC43bB7cd48f4bb1B105Ab2b7E"
  // "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
  // "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB",
  // "0x617F2E2fD72FD9D5503197092aC168c91465E7f2",
  // "0x17F6AD8Ef982297579C203069C1DbfFE4348c372",
  // "0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678",
  // "0x03C6FcED478cBbC9a4FAB34eF9f40767739D1Ff7",
  // "0x1aE0EA34a72D944a8C7603FfB3eC30a6669E454C",
  // "0x0A098Eda01Ce92ff4A4CCb7A4fFFb5A43EBC70DC",
  // "0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c",
  // "0x14723A09ACff6D2A60DcdF7aA4AFf308FDDC160C",
  // "0x4B0897b0513fdC7C541B6d9D7E929C4e5364D2dB",
  // "0x583031D1113aD414F02576BD6afaBfb302140225",
  // "0xdD870fA1b7C4700F2BD7f44238821C26f7392148", 
  ];

const leafNodes = whitelistAddresses.map(addr => keccak256(addr));
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true});
const rootHash = merkleTree.getRoot();
const buf2hex = x => '0x' + x.toString('hex');

console.log('Whitelist Merkle Tree\n', merkleTree.toString());
console.log("Root Hash: ", rootHash);

const claimingAddress = leafNodes[2];
//const claimingAddress = keccak256("0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"); //true
// const claimingAddress = keccak256("0x5B38Da6a701c568545dCfcB03FcB875f56bedddd"); //false

const hexProof = merkleTree.getHexProof(claimingAddress);
console.log("Hex Proof: ", hexProof);

console.log(merkleTree.verify(hexProof, claimingAddress, rootHash));

// for (let i=0;i<proof.length;i++){
//     console.log(`${i} element position: ${proof[i].position} data: ${MerkleTree.bufferToHex(proof[i].data)}`)
// }

console.log("Leaf: ", buf2hex(keccak256(claimingAddress)));
console.log("Root: ", buf2hex(merkleTree.getRoot()));
