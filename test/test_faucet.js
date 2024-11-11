const TokenFaucet = artifacts.require("TokenFaucet");

contract("TokenFaucet", accounts => {
  it("debería distribuir tokens", async () => {
    const instance = await TokenFaucet.deployed();
    const balanceBefore = await instance.balanceOf(accounts[1]);
    await instance.requestTokens({ from: accounts[1] });
    const balanceAfter = await instance.balanceOf(accounts[1]);
    assert(balanceAfter.gt(balanceBefore), "Los tokens no se distribuyeron correctamente");
  });

  it("debería respetar el tiempo de enfriamiento", async () => {
    const instance = await TokenFaucet.deployed();
    try {
      await instance.requestTokens({ from: accounts[1] });
      assert.fail("No debería permitir solicitar tokens antes del tiempo de enfriamiento");
    } catch (error) {
      assert(error.message.includes("Debe esperar más tiempo"), "Se permitió solicitar tokens antes del tiempo de enfriamiento");
    }
  });
});
