module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("MyToken", {
    from: deployer,
    args: ["MyToken", "MTK", 18], // update args if needed
    log: true,
  });
};
module.exports.tags = ["MyToken"];
