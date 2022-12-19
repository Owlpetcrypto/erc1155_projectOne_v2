import whitelist from "./whitelist.json";
import { generateMerkleTree, hashToken } from "previous section"
// Generate the Merkle tree (use supplied code in previous section)
const merkleTree = generateMerkleTree();
export default function handler(req, res) {
  const { wallet } = req.query;
  // Lookup the token ID for this wallet, use your own implementation
  const id = addressToTokenId[wallet];
  if (!id) return res.json({ error: "Wallet not in whitelist" });
  // Return the Merkle proof
  const proof = merkleTree.getHexProof(hashToken(id, wallet));
  return res.json({ id, proof });
}