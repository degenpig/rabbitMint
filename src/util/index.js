import MerkleTree from "merkletreejs";
import keccak256 from "keccak256";
import { utils } from "ethers";

//merkle tree
export const createMerkleProof = async (address) => {
  const jsondata = await fetch("data/whitelist.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const whitelist = await jsondata.json();
  const whitelistNodes = whitelist.map((x) =>
    utils.solidityKeccak256(["address"], [x.address])
  );

  const merkleTree = new MerkleTree(whitelistNodes, keccak256, {
    sortPairs: true,
  });
  const leaf = utils.solidityKeccak256(["address"], [address]);
  const rootHash = merkleTree.getRoot();
  const hexProof = merkleTree.getHexProof(leaf);
  const proof = merkleTree.verify(hexProof, leaf, rootHash);

  return { merkleProof: hexProof, result: proof };
};
