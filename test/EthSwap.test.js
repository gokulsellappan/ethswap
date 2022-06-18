const { assert } = require("chai");

const EthSwap = artifacts.require("EthSwap");
const Token = artifacts.require("Token");

require("chai").use(require("chai-as-promised")).should();

contract("EthSwap", ([deployer, investor]) => {
  let token, ethswap;

  function tokens(n) {
    return web3.utils.toWei(n.toString(), "ether");
  }

  before(async () => {
    token = await Token.new();
    ethswap = await EthSwap.new(token.address);
    await token.transfer(ethswap.address, tokens(100000));
  });

  describe("TokenDeployment", async () => {
    it("Token Name", async () => {
      const name = await token.name();
      assert.equal(name, "INDtoken");
    });
  });

  describe("Ethswap Deployment", async () => {
    it("Contract Name", async () => {
      const name = await ethswap.name();
      assert.equal(name, "Eth instant Exchange");
    });
    it("Contract Token Amount", async () => {
      const amount = await token.balanceOf(ethswap.address);
      assert.equal(amount.toString(), tokens(100000));
    });
  });

  describe("TokenBuy", async () => {
    let result;
    before(async () => {
      result = await ethswap.buyTokens({
        from: investor,
        value: await web3.utils.toWei("1", "ether"),
      });
    });

    it("buytoken", async () => {
      let investorBalance = await token.balanceOf(investor);
      assert.equal(investorBalance.toString(), tokens(100));

      let ethSwapBalance = await token.balanceOf(ethswap.address);
      assert.equal(ethSwapBalance.toString(), tokens(99900));
      ethSwapBalance = await web3.eth.getBalance(ethswap.address);
      assert.equal(
        ethSwapBalance.toString(),
        await web3.utils.toWei("1", "ether")
      );

      let event = result.logs[0].args;
      assert.equal(event.account, investor);
      assert.equal(event.token, token.address);
      assert.equal(event.amount.toString(), tokens(100).toString());
      assert.equal(event.rate.toString(), "100");
    });
  });

  describe("Token Sell", async () => {
    let result;
    before(async () => {
      await token.approve(ethswap.address, tokens(100), { from: investor });
      result = await ethswap.sellToken(tokens(100), { from: investor });
    });
    it("token Selling", async () => {
      let investorBalance = await token.balanceOf(investor);
      assert.equal(investorBalance.toString(), tokens(0));
      let ethSwapBalance = await web3.eth.getBalance(ethswap.address);
      assert.equal(
        ethSwapBalance.toString(),
        await web3.utils.toWei("0", "ether")
      );

      let ethtokenBalance = await token.balanceOf(ethswap.address);
      assert.equal(ethtokenBalance.toString(), tokens(100000));

      let event = result.logs[0].args;
      assert.equal(event.account, investor);
      assert.equal(event.token, token.address);
      assert.equal(event.amount.toString(), tokens(100).toString());
      assert.equal(event.rate.toString(), "100");
    });
  });
});
