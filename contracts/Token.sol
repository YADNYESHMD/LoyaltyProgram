// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract Token is ERC20{

    constructor() ERC20("Loyalty","SFT"){

    }

    //state variable
    
    //function mint() 
    function mintToken(uint256 _amount, address _minter) public {
        _mint(_minter,_amount);
    }

    //function transfer() 
    function transfer(address _from, address _to, uint256 _amt ) public {
        _transfer(_from, _to, _amt);
    }

    //function burn()  
    function burnToken(address _owner, uint256 _amt) public {
        _burn(_owner,_amt);
    }
}