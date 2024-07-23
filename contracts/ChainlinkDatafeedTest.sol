// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";


contract ChainlinkDatafeedTest {
    /*
     *  Events
     */

    /*
     *  Constants
     */

    /*
     *  Storage
     */
    address immutable i_owner;
    AggregatorV3Interface immutable dataFeed;
    /*
     *  Modifiers
     */

    modifier onlyOwner() {
        require(msg.sender == i_owner);
        _;
    }

    /// @dev Fallback function allows to deposit ether.
    receive() external payable {}

    fallback() external {}

    /*
     * Public functions
     */
    /// @dev Contract constructor .
    constructor(address AggregatorV3){
        dataFeed = AggregatorV3Interface(AggregatorV3);
        i_owner = msg.sender;
    }

    function getData() public view returns(int256){
        (,int answer,,,) = dataFeed.latestRoundData();
        return answer;
    }

    /// @dev Returns owner.
    /// @return i_owner address.
    function getOwner() public view returns (address) {
        return i_owner;
    }

}
