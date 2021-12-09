//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FooV2 {

    uint256 private number;

    function add(uint256 n) external {
        number += n;
    }

    function minus(uint256 n) external {
        number -= n;
    }

    function retrieve() view external returns(uint256) {
        return number;
    }
}