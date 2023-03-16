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
// File to host different Souls of the personalities

import { Soul } from '../models/soul';

// timestamp is 02.03.2022
const Alice: Soul = {
  identity: 'Alice A.', url: 'AliceA@testsouls.com', score: 0, timestamp: 1_646_206_905 * 1000 };

// timestamp is 13.05.2022
const Bob: Soul = {
  identity: 'Bob B.', url: 'BobB@testsouls.com', score: 0, timestamp: 1_652_424_105 * 1000 };

// timestamp is 10.07.2022
const Trent: Soul = {
  identity: 'Trent T.', url: 'TrentT@testsouls.com', score: 0, timestamp: 1_657_435_305 * 1000 };

const Charlie: Soul = {
  identity: 'Charlie C.', url: 'CharlieC@testsouls.com', score: 0, timestamp: 1_657_435_305 * 1000 };

const CEO: Soul = {
  identity: 'Zee Eh O.', url: 'CEO@genericcompany.com', score: 0, timestamp: 1_646_206_905 * 1000 };

const DevelopmentConference: Soul = {
  identity: 'DevCon', url: 'Host@devcon.com', score: 0, timestamp: 1_646_206_905 * 1000 };

const University: Soul = {
  identity: 'University Of apllied Sciences', url: 'Attesting@hs-mittweida.de', score: 0, timestamp: 1_646_206_905 * 1000 };


export const richNetworkSouls: Soul[] = [
  Alice,
  Bob,
  Charlie,
  Trent,
  CEO,
  DevelopmentConference,
  University,
];


