const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main(name) {

  const merkleTree = new MerkleTree(niceList);

  const root = merkleTree.getRoot();

  const index = niceList.findIndex(n => n === name);

  const proof = merkleTree.getProof(index);


  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof,
    name,
    root
  });

  console.log({ gift });
}

process.stdin.on("data", data => {
  const name = data.toString().trim();
  console.log("name: " + name)
  return main(name);
})