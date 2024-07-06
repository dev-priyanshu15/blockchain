// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function symbol() external view returns (string memory);
    function totalSupply() external view returns (uint256);
    function name() external view returns (string memory);
}

contract MusicICO {
    address public owner;
    address public tokenAddress;
    uint256 public tokenSalePrice;
    uint256 public soldTokens;
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can perform this action");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    function updateToken(address _tokenAddress) public onlyOwner {
        tokenAddress = _tokenAddress;
    }
    
    function updateTokenSalePrice(uint256 _tokenSalePrice) public onlyOwner {
        tokenSalePrice = _tokenSalePrice;
    }
    
    function multiply(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require(y == 0 || (z = x * y) / y == x);
    }

    function buyToken(uint256 _tokenAmount) public payable {
        require(msg.value == multiply(_tokenAmount , tokenSalePrice), "Insufficient Ether provided for the token purchase");
        
        ERC20 token = ERC20(tokenAddress);
        require(_tokenAmount <= token.balanceOf(address(this)), "Not enough tokens left for sale");
        
        // Transfer tokens to buyer
        require(token.transfer(msg.sender, _tokenAmount * 1000000000000000000));
        
        // Transfer Ether to owner
        payable(owner).transfer(msg.value);
        
        soldTokens += _tokenAmount;
    }

    function tokenReward(uint256 _tokenAmount) public payable { 
        ERC20 token = ERC20(tokenAddress);
        require(_tokenAmount <= token.balanceOf(address(this)), "Not enough tokens left for sale");
        
        // Transfer tokens to buyer
        require(token.transfer(msg.sender, _tokenAmount * 1000000000000000000));
        soldTokens += _tokenAmount;
    }
    
    function getTokenDetails() public view returns (string memory name, string memory symbol, uint256 balance, uint256 supply, uint256 tokenPrice, address tokenAddr) {
        ERC20 token = ERC20(tokenAddress);
        return (
            token.name(),
            token.symbol(),
            token.balanceOf(address(this)),
            token.totalSupply(),
            tokenSalePrice,
            tokenAddress
        );
    }

     function transferToOwner(uint256 _amount) external payable {
        require(msg.value >= _amount, "Insufficient funds sent");
        
        (bool success, ) = owner.call{value: _amount}("");
        require(success, "Transfer failed");
    }

     function transferEther(address payable _receiver, uint256 _amount) external payable {
        require(msg.value >= _amount, "Insufficient funds sent");
        
        (bool success, ) = _receiver.call{value: _amount}("");
        require(success, "Transfer failed");
    }
}
