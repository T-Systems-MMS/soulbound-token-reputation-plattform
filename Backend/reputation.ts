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
import { Soul } from './models/soul';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import SBT_ABI from '../artifacts/contracts/SBT.sol/SBT.json';
import { Sbt } from 'models/sbt';
import  { getSbtCount, getSbtsBySoul, getSoul }  from './main';
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const sbt =  new web3.eth.Contract(SBT_ABI.abi as AbiItem[], contractAddress);
let score = 0;

const SBTCOUNTCAP = 15;
/**
 * Algorithm to get Score
 * output: number from 0-100
 * a trust level: trusted, cautious, danger (for frontend icons)
 * parameters: sbts, soul timestamp, affiliated souls
 * 75% sbt quality, 25% soul quality
 *
 * 20% ------
 * timestamp of soul
 * if 1 year > timestamp then 100% points
 * less than a week = 0 points
 * then linear up
 *
 * 80% ------------
 *
 * sbtcount
 * (limit impact of sbts from same people )
 *  diverse souls help
 * max out at 20 sbts form different people( each sbt from same person yields diminising returns with -20% sbt; capped at 20%)
 * over 50% of sbts need to be attested by different souls e.g. 6 sbts ( 3 from user 1, 1 from user 2,user 3, user 4,)
 * sbts from people without sbts get lower score (maybe should not be considered)
 * ~ 45%
 *
 * len of desc (prolly like 50 char for max score)
 *  ~ 20%
 *
 *
 * sbt timestamp  (max out at 1 month with 100% impact)
 * ~ 15%
 *
 *
 *
 * @param address - The souls address to be generated a score for
 * @param depth
 */
export async function generateScore(address: string, depth?: number): Promise<number> {
  // Fetching Phase
  const soul = await getSoul(address);
  const sbts = await getSbtsBySoul(address);

  // Calculation Phase
  const soulScore = calculateSoulTimestampScore(soul.timestamp);
  const sbtScore = await calculateSbtScore(sbts, address);

  // Output Phase
  score = 0.2 *  soulScore +  0.8 * sbtScore ;
  return score;
}

/**
 *  The function generates 20% of final score based on the age of the soul
 *
 * @param timestamp -  The minted Souls date of creation in unix timestamp seconds
 */
function calculateSoulTimestampScore(timestamp: number): number {
  const today = Date.now();
  /*   console.log('today:', today);
  console.log('today:', new Date(today).toLocaleDateString('en-GB'));

  console.log('soul creation:', timestamp );
  console.log('soul creation:', new Date((timestamp * 1000 )).toLocaleDateString('en-GB'));
 */
  // Unix timestamps will be considered for Date() Object when it is displayed in miliseconds, hence timestamp * 1000
  const difference = ((today - timestamp * 1000) / ( 1000 * 3600 * 24 * 365)) ;
  console.log('soultimestampscore:', difference);

  return difference > 1 ?
    1 :
    difference;
}



/**
 *  Function to calculate points based on the number of sbts the soul has
 *
 * @param sbts - The Array of sbts of the soul
 * @param address - string - The souls address
 */
async function calculateSbtScore(sbts: Sbt[], address: string): Promise<number> {
  // only consider sbts with active flag true , true reputation and attester != soul
  sbts = sbts.filter((sbt) => sbt.active && sbt.reputation && sbt.attester !== address);


  let score = 0;

  const quantityScore = calculateSbtQuantityScore(sbts);
  const qualityScore = await calculateSbtQualityScore(sbts);

  score = quantityScore * 0.55  + qualityScore * 0.45; // 55% quantity, 45% quality, because quantity is easier to measure

  return score;
}


/**
 *  Function to calculate points based on the number of sbts the soul has
 *
 * @param sbts - The Array of sbts of the soul
 */
function calculateSbtQuantityScore(sbts: Sbt[]): number {
  let score = 0;

  const sbtCount = sbts.length;
  score = sbtCount > SBTCOUNTCAP ?
    1 :
    sbtCount / SBTCOUNTCAP;

  console.log('sbtcountscore based only on quantity:', score);

  /*
  * Calculate Uniqueness Factor
  */
  const sbtSouls = sbts.map((sbt) => sbt.attester);
  const uniqueSoulCount = new Set(sbtSouls).size;
  // uniqueness factor is a new value indicating sbt diversity, the higher the better
  // Having a uniqueness Factor of 0.8 is sufficient. it approaches zero the wors it gets, we will cap the penalty at 0.2
  const uniquenessFactor = uniqueSoulCount / sbtSouls.length;
  console.log('uniqueness Factor', uniquenessFactor );
  if (uniquenessFactor < 0.8) {
    score = score * ((uniqueSoulCount / sbtSouls.length) + 0.2);
  }
  console.log('sbtcountscore based on quantity and uniqueness:', score);
  return score;
}


/**
 *  Function to calculate points based on the quality of sbts the soul has
 *  I.E. Desription parameters and timestamp, the older an sbt the less value
 *
 * @param sbts - The Array of sbts of the soul
 */
function calculateSbtQualityScore(sbts: Sbt[]): number {
  score = 0;
  let timestampScore = 0;

  // get element with highest timestamp for each unique attester
  const newestSbts = sbts.reduce((accumulator, sbt) => {
    if (!accumulator[sbt.attester] || accumulator[sbt.attester].timestamp < sbt.timestamp) {
      accumulator[sbt.attester] = sbt;
    }
    return accumulator;
  }, {} as Sbt[]);

  // calculate average timestamp of sbts
  const today = Date.now();
  for (const sbt of Object.values(newestSbts)) {
    const difference = ((today - sbt.timestamp * 1000) / ( 1000 * 3600 * 24 * 365)) ;
    timestampScore += difference;
  }
  timestampScore = 1 - timestampScore / sbts.length;
  console.log('timestamp Score:', timestampScore);




  // check the length of the description of sbts a soul has, the longer the sbt the more value
  // accumulate score of all sbts and then use average  as score for the description parameter
  let descritpionScore = 0;
  for (const sbt of sbts) {
    let sbtDescriptionScore: number;

    const sbtDescription = sbt.explanation_url;
    const descriptionLength = sbtDescription.length;
    const wordcount = sbtDescription.split(' ').length;
    // eslint-disable-next-line unicorn/prefer-ternary
    if ( descriptionLength > 100 && wordcount > 20) {
      sbtDescriptionScore = 1; // 100% score for sbts with a description of 100 characters and 20 words or more
    } else {
      sbtDescriptionScore = descriptionLength / 100 * 0.5 + wordcount / 20 * 0.5;
    }
    descritpionScore += sbtDescriptionScore;
  }
  console.log('accumulated descritpionScore:', descritpionScore);

  descritpionScore = descritpionScore / sbts.length;
  console.log('final descritpionScore:', descritpionScore);

  //  calculate final quality score
  score = 0.45 * descritpionScore + 0.55 * timestampScore;
  console.log('final quality score:', score);
  return score;
}



/*   //  check how many attesters have no sbts themselves and disregard them for score if it is 0
  const affiliatedSoulsSbts = await Promise.all(sbts.map(async(sbt) => await getSbtsBySoul(sbt.attester)));
  const affiliatedSoulsThatHabeSbts = affiliatedSoulsSbts.map((affiliatedSoulsSbts) => affiliatedSoulsSbts.length);
  const affiliatedSoulsThatHabeSbtsSum = affiliatedSoulsThatHabeSbts.reduce((a, b) => a + b, 0);
  console.log('affiliatedSoulsThatHabeSbtsSum:', affiliatedSoulsThatHabeSbtsSum);
  console.log('affiliatedSoulsThatHabeSbts:', affiliatedSoulsThatHabeSbts);
  console.log('affiliatedSoulsThatHabeSbts:', affiliatedSoulsThatHabeSbts.length);
  console.log('affiliatedSoulsThatHabeSbts score', affiliatedSoulsThatHabeSbtsSum / affiliatedSoulsThatHabeSbts.length );
  score = score * ( affiliatedSoulsThatHabeSbtsSum / affiliatedSoulsThatHabeSbts.length );
  console.log('sbtcountscore:', score); */
