# Getting Started the Basics

1. npm Install, make sure you are using the newest Version ov svelte-web3 you might need to install it separately.

2. npx hardhat node - Start you local Blockchain

3. ./DeRep.bash - This should get all necessary Backend Applications running and start hosting the app on localhost:5173




# This is what happens in Derep.bash:

3. npx hardhat run scripts/deploy.js --network localhost - This should deploy the contracts to your local Blockchain

4. npm run dev - Start the dev server (Frontend)

5. node main.js -  Go to the Backend and run main.js to generate an example Network of Users

# If you're on goerli branch all you need is npm run dev

On this branch the contract has already been published to test network, all you need to do is to start the application to interact with it.

However, if you want to make changes to the contract or easily manipulate tokens, accounts etc. for testing, then working on main is adviced.
