/*
    Graphical Soulbound-Token based Reputation Platform>
    Copyright (C) T-Systems Multimedia Management Solutions

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
import { makeContractStore } from 'svelte-web3';
import { writable, derived, readable } from 'svelte/store';
import type { AbiItem } from 'web3-utils';
import SBT_ABI from  '../contracts/SBT.json';
import contractAddress from '../contracts/contract-address.json';

/**
 * Tracks the currently logged in user.
 */
export const user = writable('No Account Connected');

/* export const test = makeContractStore(SBT_ABI.abi as AbiItem[], contractAddress.SBT);
 */
