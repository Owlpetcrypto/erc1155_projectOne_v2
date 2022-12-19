const hre = require("hardhat");

async function main() {

  const ExampleNFT = await hre.ethers.getContractFactory("ExampleNFT");
  const exampleNFT = await ExampleNFT.deploy();

  await exampleNFT.deployed();

  console.log(
    `Greeter deployed to: `, exampleNFT.address
  );
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
