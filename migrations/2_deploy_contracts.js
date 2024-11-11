const TokenFaucet = artifacts.require("TokenFaucet");

module.exports = function (deployer) {
  deployer.deploy(TokenFaucet);
};
