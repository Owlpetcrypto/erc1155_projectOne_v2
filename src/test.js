const { MerkleTree } = require('merkletreejs')
const KECCAK256 = require('keccak256')
import ExampleNFT from './ExampleNFT.json';
    const contract = new ethers.Contract(
    ExampleNFTAddress,
    ExampleNFT.abi,
    signer);
    const contractAddress = "0xb1cdf03F187b03b2b0b796a5d4b771D297309B12";
    //Get the contract instance
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const instance = new web3.eth.Contract(abi, contractAddress);
    //Generate the tree
    const leaves = addresses.map(x => KECCAK256(x));
    const tree = new MerkleTree(leaves, KECCAK256, { sortPairs: true })

    const BuyTokens = () => {
        let leaf = buf2hex(KECCAK256(accounts[0]));
        let proof = tree.getProof(leaf).map(x => buf2hex(x.data));
        let price = web3.utils.toWei('1', 'ether');
        await instance.methods.whitelistMint(1, proof).send({ from: accounts[0], value: price, gas: 300000 })

        <button class="button" onClick={BuyTokens}> Mint!</button>