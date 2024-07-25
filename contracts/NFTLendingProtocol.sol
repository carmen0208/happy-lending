// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTLendingProtocol is Ownable {
    constructor(address initialOwner) Ownable(initialOwner) {
    }

    struct Loan {
        address borrower;
        uint256 nftId;
        address nftContract;
        uint256 loanAmount;
        uint256 interestRate;
        uint256 duration;
        uint256 startTime;
        bool repaid;
    }

    uint256 public loanIdCounter = 0;
    mapping(uint256 => Loan) public loans;
    mapping(uint256 => bool) public nftCollateralized;

    event LoanCreated(uint256 indexed loanId, address indexed borrower, uint256 loanAmount, uint256 duration);
    event LoanRepaid(uint256 indexed loanId, address indexed borrower);
    event CollateralLiquidated(uint256 indexed loanId, address indexed liquidator);

    function createLoan(
        uint256 nftId,
        address nftContract,
        uint256 loanAmount,
        uint256 interestRate,
        uint256 duration
    ) external {
        require(nftCollateralized[nftId] == false, "NFT already collateralized");
        IERC721 nft = IERC721(nftContract);
        require(nft.ownerOf(nftId) == msg.sender, "You are not the owner of this NFT");

        nftCollateralized[nftId] = true;
        nft.transferFrom(msg.sender, address(this), nftId);

        loanIdCounter++;
        loans[loanIdCounter] = Loan({
            borrower: msg.sender,
            nftId: nftId,
            nftContract: nftContract,
            loanAmount: loanAmount,
            interestRate: interestRate,
            duration: duration,
            startTime: block.timestamp,
            repaid: false
        });

        // Issue loan amount to the borrower
        payable(msg.sender).transfer(loanAmount);

        emit LoanCreated(loanIdCounter, msg.sender, loanAmount, duration);
    }

    function repayLoan(uint256 loanId) external payable {
        Loan storage loan = loans[loanId];
        require(loan.borrower == msg.sender, "You are not the borrower");
        require(loan.repaid == false, "Loan already repaid");
        require(block.timestamp <= loan.startTime + loan.duration, "Loan duration exceeded");

        uint256 totalRepayment = loan.loanAmount + (loan.loanAmount * loan.interestRate / 100);
        require(msg.value >= totalRepayment, "Insufficient repayment amount");

        loan.repaid = true;
        nftCollateralized[loan.nftId] = false;

        IERC721 nft = IERC721(loan.nftContract);
        nft.transferFrom(address(this), loan.borrower, loan.nftId);

        emit LoanRepaid(loanId, msg.sender);
    }

    function liquidateCollateral(uint256 loanId) external onlyOwner {
        Loan storage loan = loans[loanId];
        require(loan.repaid == false, "Loan already repaid");
        require(block.timestamp > loan.startTime + loan.duration, "Loan duration not exceeded");

        nftCollateralized[loan.nftId] = false;

        IERC721 nft = IERC721(loan.nftContract);
        nft.transferFrom(address(this), owner(), loan.nftId);

        emit CollateralLiquidated(loanId, msg.sender);
    }

    // Fallback function to accept Ether
    receive() external payable {}
}
