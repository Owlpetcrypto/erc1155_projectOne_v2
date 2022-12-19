import { ethers } from "ethers";
import keccak256 from "keccak256";
import MerkleTree from "merkletreejs";
// Map tokenID to wallets
// e.g.
const tokens = {
  1:"0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
  1:"0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
  1:"0x46685d1f7A86f037a019Ec33a4D29b491d2E645D",
  1:"0x65AAf6d3fAe0E3BC43bB7cd48f4bb1B105Ab2b7E",
  2:"0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
  2:"0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
  2:"0x46685d1f7A86f037a019Ec33a4D29b491d2E645D",
  2:"0x65AAf6d3fAe0E3BC43bB7cd48f4bb1B105Ab2b7E",
  3:"0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
  3:"0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
  3:"0x46685d1f7A86f037a019Ec33a4D29b491d2E645D",
  3:"0x65AAf6d3fAe0E3BC43bB7cd48f4bb1B105Ab2b7E",
  4:"0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
  4:"0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
  4:"0x46685d1f7A86f037a019Ec33a4D29b491d2E645D",
  4:"0x65AAf6d3fAe0E3BC43bB7cd48f4bb1B105Ab2b7E"
}
export function hashToken(tokenId, account) {
  return Buffer.from(ethers.utils.solidityKeccak256(["uint256", "address"], [tokenId, account]).slice(2), "hex");
}
export function generateMerkleTree() {
  const merkleTree = new MerkleTree(
    Object.entries(tokens).map((token) => hashToken(...token)),
    keccak256,
    { sortPairs: true }
  );
  console.log(merkleTree.getHexRoot())
  return merkleTree;
}