const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken", function () {
  it("mints and transfers", async function () {
    const [owner, user] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("MyToken");
    const token = await Token.deploy();
    await token.waitForDeployment();

    const addr = await token.getAddress();
    expect(addr).to.properAddress;

    const amount = ethers.parseUnits("100", 18);
    await (await token.mint(owner.address, amount)).wait();

    expect(await token.balanceOf(owner.address)).to.equal(amount);

    await (await token.transfer(user.address, ethers.parseUnits("40", 18))).wait();
    expect(await token.balanceOf(user.address)).to.equal(ethers.parseUnits("40", 18));
  });
});
