// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// CEDARSRUBON Perpetuity Endowment
contract CedarsRubonPerpetuity {
    uint public constant RENEWAL_INTERVAL = 365 days;
    uint public lastRenewalFund;
    address public guardian;
    address public domainVault;
    address public constant ARWEAVE_FUND = 0x0000000000000000000000000000000000000000; // replace
    address public constant ENS_REGISTRY = 0x0000000000000000000000000000000000000000; // replace

    event PerpetuityFunded(uint amount, uint timestamp);

    modifier onlyGuardian() {
        require(msg.sender == guardian, "not guardian");
        _;
    }

    constructor(address _domainVault) {
        guardian = msg.sender;
        domainVault = _domainVault;
        lastRenewalFund = block.timestamp;
    }

    function fundPerpetuity() external onlyGuardian {
        require(block.timestamp >= lastRenewalFund + RENEWAL_INTERVAL, "too early");
        uint amount = address(this).balance * 5 / 1000; // 0.5% yearly
        payable(domainVault).transfer(amount * 40 / 100);
        payable(ARWEAVE_FUND).transfer(amount * 30 / 100);
        payable(ENS_REGISTRY).transfer(amount * 30 / 100);
        lastRenewalFund = block.timestamp;
        emit PerpetuityFunded(amount, block.timestamp);
    }

    receive() external payable {}
}
