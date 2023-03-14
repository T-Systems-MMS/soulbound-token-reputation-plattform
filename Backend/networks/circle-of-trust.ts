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
// File to host different Souls of the personalities
import { Soul } from '../models/soul';

// createNetwork();
/**
 *  Creates test network for a circle of trust
 */


// timestamp is 02.03.2022
const Alice: Soul = {
  identity: 'Alice A.', url: 'AliceA@testsouls.com', score: 0, timestamp: 1_646_206_905 * 1000 };

// timestamp is 13.05.2022
const Bob: Soul = {
  identity: 'Bob B.', url: 'BobB@testsouls.com', score: 0, timestamp: 1_652_424_105 * 1000 };

// timestamp is 10.07.2022, 1_657_435_305 * 1000
const Charlie: Soul = {
  identity: 'Charlie C.', url: 'CharlieC@testsouls.com', score: 0, timestamp: Date.now() };

export const circleOfTrustSouls: Soul[] = [
  Alice,
  Bob,
  Charlie,
];


