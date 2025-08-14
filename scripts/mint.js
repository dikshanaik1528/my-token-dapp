const hre = require("hardhat");

async function main() {
  const contractAddress = process.env.CONTRACT || "PASTE_CONTRACT_ADDRESS";
  const to = process.env.TO || "PASTE_RECIPIENT";
  const amountHuman = process.env.AMOUNT || "50";

  const Token = await hre.ethers.getContractFactory("MyToken");
  const token = Token.attach(contractAddress);
  const amount = hre.ethers.parseUnits(amountHuman, 18);

  const tx = await token.mint(to, amount);
  await tx.wait();
  console.log(`Minted ${amountHuman} DIK to ${to}`);
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
