/*
    Graphical Soulbound-Token based Reputation Platform>
    Copyright (C) T-Systems Multimedia Solutions GmbH

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.

const path = require("path");

async function main() {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  // ethers is available in the global scope
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const SBT = await ethers.getContractFactory("SBT");

  //get value of eth gas price
  const gasPrice = await ethers.provider.getGasPrice();
  console.log("Gas price:", gasPrice.toString());
  
  
  const estimatedGas = await SBT.signer.estimateGas(
    SBT.getDeployTransaction()
   );
   console.log(`Estimated gas: ${estimatedGas}`);

  const sbt = await SBT.deploy();
  await sbt.deployed();

  console.log("SBT Contract address:", sbt.address);

  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(sbt);
}

function saveFrontendFiles(sbt) {
  const fs = require("fs");
  const contractsDir = path.join(__dirname, "..", "Frontend", "src", "contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify({ SBT: sbt.address }, undefined, 2)
  );

  const SBTArtifact = artifacts.readArtifactSync("SBT");

  fs.writeFileSync(
    path.join(contractsDir, "SBT.json"),
    JSON.stringify(SBTArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
