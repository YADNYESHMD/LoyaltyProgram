let Token = artifacts.require("./Token.sol");
let LoyaltyToken = artifacts.require("./Loyalty.sol");


module.exports = async function (deployer) {
    let addr = await web3.eth.getAccounts()
    await deployer.deploy(Token)
    await deployer.deploy(LoyaltyToken)

    let instance1 = await Token.deployed()
    let instance2 = await LoyaltyToken.deployed()

}