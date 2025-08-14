const hre = require("hardhat");

async function main() {
  const Token = await hre.ethers.getContractFactory("MyToken");
  const token = await Token.deploy();
  await token.waitForDeployment();

  console.log("MyToken deployed to:", await token.getAddress());

  // optional: mint some tokens to the deployer for quick testing
  const [deployer] = await hre.ethers.getSigners();
  const amount = hre.ethers.parseUnits("1000", 18);
  const tx = await token.mint(deployer.address, amount);
  await tx.wait();
  console.log("Minted 1000 DIK to:", deployer.address);
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
