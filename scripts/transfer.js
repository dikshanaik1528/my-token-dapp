const hre = require("hardhat");

async function main() {
  const contractAddress = process.env.CONTRACT || "PASTE_CONTRACT_ADDRESS";
  const to = process.env.TO || "PASTE_RECIPIENT";
  const amountHuman = process.env.AMOUNT || "10";

  const Token = await hre.ethers.getContractFactory("MyToken");
  const token = Token.attach(contractAddress);
  const amount = hre.ethers.parseUnits(amountHuman, 18);

  const tx = await token.transfer(to, amount);
  await tx.wait();
  console.log(`Transferred ${amountHuman} DIK to ${to}`);
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
