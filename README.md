# Loyalty Program Decentralized App
This app uses React, Solidity, Web3, MongoDB and NodeJS

To start it you need to have MongoDB running on your machine
# Must have installation
Works smoothly with windows 10 and above
1. node.js
2. truffle
3. mongodb 

# For setup:
1. At Root : Do `npm install`
2. At database dir: Do `npm install`
3. At client dir: Do `npm install`

# To Run the project: 
Ganache has to be running in the background
1. At Root : Do `truffle migrate`
2. At database dir: Do `nodemon ./index.js`
3. At client dir: Do `npm start`


# For Modular Project Development
1. Contracts Development:  in contract directory
2. Migration of contract: in migrations
3. Contract Integartion and Contract function call: client->src->layout-> LoggedIn.js
4. Contract function call: client-> src->components->flight/hotel->flight.js/hotel.js(using props)