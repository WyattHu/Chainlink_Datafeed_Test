const { network } = require("hardhat");
const {
    networkconfig,
    developmentChains,
} = require("../hardhat-config-helper");
require("dotenv").config();
const { verify } = require("../utility/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;
    let ChainlinkDatafeedTest;
    log('chainId:' + chainId)
    log(deployer)
    log("Deploying ChainlinkDatafeedTest Contract...");

    ChainlinkDatafeedTest = await deploy("ChainlinkDatafeedTest", {
        contract: "ChainlinkDatafeedTest",
        from: deployer,
        log: true,
        args: [process.env.DATAFEED_ETHUSD],
        waitConfirmations: network.config.blockConfirmations || 1,
    });


    log("------------------------------------------------");
    log(`ChainlinkDatafeedTest deployed at ${ChainlinkDatafeedTest.address}`);

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(ChainlinkDatafeedTest.address, [process.env.DATAFEED_ETHUSD]);
    }
};
module.exports.tags = ["all", "ChainlinkDatafeedTest"];
