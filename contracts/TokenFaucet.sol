// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenFaucet is ERC20, Ownable {
    uint256 public constant amountToDistribute = 1000 * 10 ** 18; // cantidad a distribuir
    uint256 public constant cooldownTime = 1 days; // tiempo de enfriamiento entre solicitudes

    mapping(address => uint256) public lastRequestTime;

    constructor() ERC20("TestToken", "TTK") {
        _mint(address(this), 1000000 * 10 ** 18); // 1 millón de tokens para el faucet
    }

    function requestTokens() public {
        require(block.timestamp >= lastRequestTime[msg.sender] + cooldownTime, unicode"Debe esperar mas tiempo antes de solicitar nuevamente.");
        _transfer(address(this), msg.sender, amountToDistribute);
        lastRequestTime[msg.sender] = block.timestamp;
    }
}
