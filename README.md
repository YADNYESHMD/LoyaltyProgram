# Loyalty Program Decentralized App
Loyalty program: 
Loyalty programs, sponsored by retailers and other businesses, offer rewards, discounts, and other special incentives as a way to attract and retain customers. They are designed to encourage repeat business, offering people a reward for store/brand loyalty (hence the name). Typically, the more often a customer patronizes the merchant—and the more they spend—the greater their rewards. 


# Must have installation
This app uses React, Solidity, Web3, MongoDB and NodeJS
Works smoothly with windows 10 and above
This app uses React, Solidity, Web3, MongoDB and NodeJS
- [Node Js](https://nodejs.org/en/download/) - Network Architecture
- [Truffle](https://www.trufflesuite.com/truffle) - Framework
- [Ganache](https://www.trufflesuite.com/ganache) - Creation of Private Blockchain 
- [React](https://reactjs.org/docs/getting-started.html) - Front-End 
- [Mongodb](https://www.mongodb.com/docs/manual/administration/install-community/) - Database Storage Provider
- [Solidity Ver 8+](https://docs.soliditylang.org/en/v0.8.4/) - Back-End 
- [MetaMask](https://metamask.io/download) - Wallet & web3 provider 

# For setup:
1. At Root : Do `npm install`
2. At database dir: Do `npm install`
3. At client dir: Do `npm install`

# To Run the project: 
Ganache has to be running in the background
1. At Root : Do `truffle migrate`
2. At database dir: Do `nodemon ./index.js`
3. At client dir: Do `npm start`

### Connecting MetaMask to Dapp 
1. Install the [MetaMask](https://metamask.io/download) browser extension
2. Setup a new wallet account
3. Go to Ganache and copy the `RPC Server` Address in the top panel
   > You need this to import your Ganache Blockchain into MetaMask
4. Go to MetaMask and click on the networks tab (This should be selected as Ethereum Mainnet or some testnet such as Rinkeby)
5. Select `Custom RPC` in this tab at the bottom
6. Enter the name of your choice, the `RPC Address` that you copied, and `1337` as the chain ID
7. Other details should be auto-filled after entering the above details
8. Click on save and you should have the Ganache network in your MetaMask now
9. Then go to Ganache and click on the 🔑  on the right of the account number
10. Copy the `Private Key` which would look something like this 
  ```
  357e626beea4019ee4ca96c1234ed52e390b71c6db0c64d15cdee1cc68a57aef
  ```
11. Now open MetaMask and click on your account image and click `Import account`
12. Paste the copied private key in this and press on `Import`
 > Note: The `Quickstart Ethereum` you started in Ganache is temporary and every account that was generated will be lost forever once you close Ganache. You will have to do the steps `9 to 12` every time you open ganache. You will have to save the Workspace in Ganache if you wish to prevent this.
- Now reload the page
- MetaMask should popup asking you to connect your account
- If you connected successfully, your wallet address should be visible in the top right of the app. E.g.: `0xC9b87aeC184293A1D6d79806c8a0D70921090921`



# For Modular Project Development
1. Contracts Development:  in contract directory
2. Migration of contract: in migrations
3. Contract Integartion and Contract function call: client->src->layout-> LoggedIn.js
4. Contract function call: client-> src->components->flight/hotel->flight.js/hotel.js(using props)