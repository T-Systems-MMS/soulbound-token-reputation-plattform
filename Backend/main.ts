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

import { accounts, networkSouls } from './networks/network-souls';
import { Soul } from './models/soul';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import SBT_ABI from '../artifacts/contracts/SBT.sol/SBT.json';
import { Sbt } from 'models/sbt';
import { circleOfTrustSouls } from './networks/circle-of-trust';
import { generateScore } from './reputation';
import { richNetworkSouls } from './networks/rich-network';
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const sbt =  new web3.eth.Contract(SBT_ABI.abi as AbiItem[], contractAddress);

const user1 =  '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
const user2 =  '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';
const user3 =  '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC';
const user4 =  '0x90F79bf6EB2c4f870365E785982E1f101E93b906';
const user5 =  '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65';
const user6 =  '0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc';
const user7 =  '0x976EA74026E726554dB657fA54763abd0C3a0aa9';
const user8 =  '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955';
const user9 =  '0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f';
const user10 =  '0xa0Ee7A142d267C1f36714E4a8F75612F20a79720';

const description = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.';
main();

/**
 *  The Main function;
 */
async function main(): Promise<void> {
  console.log('Starting DeRep...');
  initializeContract();
  if (!await hasSoul(user1)) {
    await createCircleOfTrust();
  }
  if (!await hasSoul(user4)) {
    await createRichNetwork();
  }

  /*   await revokeSBT(3, user4);*/
  // await mintSoul(user7, {identity: 'test', url: 'test', score: 0, timestamp: 0 });
  // await attestSBT(user7, user2, true, description);

  // console.log(await getSoul(user1));


  /*  const score = await generateScore(user1, 1);
  console.log('Final Score', score); */
}

/**
 *  The function to initalize Web3 provider and the sbt contract
 */
function initializeContract(): void {

  if ( web3.eth.net.isListening()) {
    console.log('We are live! ');
  } else {
    console.log('Something went wrong connecting to Web3...');
  }

}

/**
 *  Simulates an established network of Souls with dedicated SBTs to create personalities
 */
async function createNetwork(): Promise<void> {
  let index = 0;
  for (const networkSoul of networkSouls) {
    await mintSoul(accounts[index], networkSoul);
    console.log(await getSoul(accounts[index]));
    index++;
  }
  await attestSBT(user2, user1, true, 'test SBT');
  await attestSBT(user3, user2, true, 'test self mint');
  await attestSBT(user1, user3, true, 'Nein DU!');

}

/**
 *  Function to create a Circle of Trust Network
 */
async function  createCircleOfTrust(): Promise<void> {
  console.log('Initiating ambigous Circle of Trust');
  let index = 0;
  for (const Soul of circleOfTrustSouls) {
    await mintSoul(accounts[index], Soul);
    console.log(await getSoul(accounts[index]));
    index++;
  }
  await attestSBT(user2, user1, true, description);
  await attestSBT(user3, user2, true, description);
  await attestSBT(user1, user3, true, description);

}


/**
 *  Function to create a rich Trust Network
 */
async function createRichNetwork(): Promise<void> {
  console.log('Initiating  rich Network of Trust');
  let index = 3;
  for (const Soul of richNetworkSouls) {
    await mintSoul(accounts[index ], Soul);
    console.log(await getSoul(accounts[index]));
    index++;
  }
  await attestSBT(user4, user5, true, 'A most wonderful friend of mine. Love her with all my might, god bless this person.');
  await attestSBT(user4, user6, true, 'A very capable trader and fetcher. Sold me an item being sold at much higher prices usually, but gave me a fair deal. Would definitely make business with again.');
  await attestSBT(user4, user7, true, 'A most wonderful friend of mine. Love her with all my might, god bless this person.');
  await attestSBT(user4, user8, true, 'Very due diligent. Certified in the use of advanced machine learning algorithms and able to handle loads of stress when it comes to Data Minin. Overall a superb Worker.');
  await attestSBT(user4, user9, true, 'Attended Devcon in the Year 2021. Accomplished 3 out of 4 possible Modules.');
  await attestSBT(user4, user10, true, 'Graduated University in 2019 in Computer Science and finished a course on advanced machine learning pattern. GPA: 4.0');

}



/**
 *  Mints a new Soul of the specified user
 *
 * @param address - The wallet addres of the soul
 * @param soulData - The Data of the specified sOul
 */
async function mintSoul(address: string, soulData: Soul): Promise<void> {
  console.log(`Minting Soul for  ${address}`);
  await sbt.methods.mint(address, soulData).send({ from: address, gasPrice: '20000000000' }).
    catch((error) => {
      console.error(error.data.message);
    });
}

/**
 *  Burns the new Soul of the specified user
 *
 * @param address - The wallet addres of the soul
 */
async function burnSoul(address: string): Promise<void> {
  console.log(`Burning ${address}'s Soul...`);

  await sbt.methods.burn(address).send({ from: address, gasPrice: '20000000000' })
    .catch((error) => {
      console.error(error.data.message);
    });
}

/**
 *  Burns the new Soul of the specified user
 *
 * @param address - The wallet addres of the soul
 */
export async function hasSoul(address: string): Promise<boolean> {
  return !!(await sbt.methods.hasSoul(address).call());
}

/**
 *  Function to update data of a users soul
 *
 * @param address - The wallet addres of the soul
 * @param soulData - The data to be changed about the soul
 */
export async function updateSoul(address: string, soulData: Soul): Promise<void> {
  await sbt.methods.update(address, soulData).send({ from: address, gasPrice: '20000000000' })
    .catch((error) => {
      console.error(error.data.message);
    });
}

/**
 *  Function to get the soul of a user
 *
 * @param address - The wallet addres of the soul
 */
export async function getSoul(address: string): Promise<Soul> {
  return await sbt.methods.getSoul(address).call();
}

/**
 *  Function to attest an SBT to a soul
 *
 * @param target_address -The wallet addres of the soul
 * @param attester_address - The addres of the attester
 * @param reputation - The value to indivate psoitive/negative sbt
 * @param explanation_url - The link to a text explanation
 */
async function attestSBT(
  target_address: string,
  attester_address: string,
  reputation: boolean,
  explanation_url: string,
): Promise<void> {
  await sbt.methods.attest(target_address, reputation, explanation_url).send({ from: attester_address, gasPrice: '20000000000' })
    .catch((error) => {
      console.error(error.data.message);
    });
}

/**
 *  Function to revoke an attested SBT
 *
 * @param tokenId - the unique tokenId of the attested SBT
 * @param attester_address - The addrs of the attester
 */
async function revokeSBT(tokenId: number, attester_address: string): Promise<void> {
  await sbt.methods.revoke(tokenId).send({ from: attester_address, gasPrice: '20000000000' })
    .catch((error) => {
      console.error(error.data.message);
    });
}

/**
 * Function to get a list of SBTs of a specified soul
 *
 * @param address - The addres of the soul whose sbt it's looking for
 */
export async function getSbtsBySoul(address: string): Promise<Sbt[]> {
  return await sbt.methods.getSbtsBySoul(address).call();
}

/**
 * Function to return a specified sbt via tokenId
 *
 * @param tokenId - The Id of the sbt to be retrieved
 */
export async function getSbt(tokenId: number): Promise<Sbt> {
  return await sbt.methods.getSbt(tokenId).call();
}

/**
 * Function to return a specified sbt via tokenId
 *
 * @param address - The addres of the soul whose Sbts should be counted
 */
export async function getSbtCount(address: string): Promise<number> {
  return  await sbt.methods.soulSbtCount(address).call();
}

/**
 * Function to see if a soul has any sbts
 *
 * @param address - The address of the soul
 */
export async function hasSbt(address: string): Promise<Sbt> {
  return await sbt.methods.hasSbt(address).call();
}


