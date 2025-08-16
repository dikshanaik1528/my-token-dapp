// scripts/deploy.js
const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const MyToken = await ethers.getContractFactory("MyToken");
  const myToken = await MyToken.deploy();
  await myToken.waitForDeployment();

  const address = await myToken.getAddress();
  console.log("MyToken deployed to:", address);

  // Save deployment info for frontend
  const deploymentsDir = path.join(__dirname, "..", "frontend", "src", "deployments", "localhost");
  fs.mkdirSync(deploymentsDir, { recursive: true });

  const deploymentData = {
    address,
    abi: (await artifacts.readArtifact("MyToken")).abi,
  };

  fs.writeFileSync(
    path.join(deploymentsDir, "MyToken.json"),
    JSON.stringify(deploymentData, null, 2)
  );

  console.log("Deployment data saved to frontend/src/deployments/localhost/MyToken.json");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
