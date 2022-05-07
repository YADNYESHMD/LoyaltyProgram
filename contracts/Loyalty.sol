//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//import token
import "./Token.sol"; 

contract Loyalty  is Token{

    //state variables
    constructor() {

    }
    //function setLoyaltyBonus()
   
    //function bookFLight() 
    function bookFlight(uint256 _amount,address _minter) public {
        mintToken(_amount, _minter);
    }

    //function bookHotel() 
    function bookHotel(uint256 _tok) public {
        burnToken(msg.sender, _tok);
    }

}