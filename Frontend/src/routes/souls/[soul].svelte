<!--
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
-->
<!--  <script context="module">
    export async function load({fetch,page}){

    }
</script> -->
 
<script lang="ts">
import Score from '../../lib/Soulspage/Score.svelte';
import Soulinfo from '$lib/Soulspage/Soulinfo.svelte';
import PageNotFound from '../../lib/universal/PageNotFound.svelte';
import {  user } from "$lib/stores";
import { defaultEvmStores as evm, connected,  web3, contracts , selectedAccount } from 'svelte-web3'
import type { AbiItem } from "web3-utils";
import SBT_ABI from "../../contracts/SBT.json";
import contractAddress from "../../contracts/contract-address.json";
import type {Sbt} from "../../../../Backend/models/sbt"
import type {Soul} from "../../../../Backend/models/soul"
import { attestSBT, getSbtsBySoul, revokeSBT } from "$lib/sbtfunctions";
import {page} from "$app/stores";
import Sbtlist from '$lib/Soulspage/Sbtlist.svelte';
import AttestBox from '$lib/Soulspage/Attestbox.svelte';
import RevokeBox from '$lib/Soulspage/Revokebox.svelte';


evm.attachContract('sbtcontract',contractAddress.SBT, SBT_ABI.abi as AbiItem[])
 
let reputation: boolean;
let description = '';

let soulExists: boolean;
let searchedSoul: string;
let SoulObject: Soul;
let sbts: Sbt[];
let tokenId: number;

let score: string;

    async function getSbts(){
        console.log("Souls sbts are:",await getSbtsBySoul(searchedSoul, $contracts.sbtcontract));
        return await getSbtsBySoul(searchedSoul, $contracts.sbtcontract);
    }

    async function attestSBTFront(event: { detail: { reputation: boolean; description: string; }; }) {
        reputation = event.detail.reputation;
        description = event.detail.description; 
        if (description === '') {
            alert("Please fill in a description ");
            return;
        }
        await attestSBT(searchedSoul, $user, reputation, description, $contracts.sbtcontract);
    }

    async function revokeSBTFront(event: { detail: { tokenId: number}; }){
        tokenId = event.detail.tokenId;
        
        if (tokenId === null) {
            alert("Please fill in a tokenId ");
            return;
        }
        //check who attested the sbt with this tokenId
        let sbt = await $contracts.sbtcontract.methods.getSbt(tokenId).call();
        if (sbt.attester !== $user){
            alert("You are not the attester of this SBT");
            return;
        }


        await revokeSBT(tokenId, $user, $contracts.sbtcontract);

    }
   

    // Load in all data needed for display
    let data = getData();

    async function getData() {
        searchedSoul =  $page.params.soul
        console.log("here is the searched soul: ", searchedSoul); 


        await evm.setProvider();

        if (!$web3.utils.isAddress(searchedSoul)){
            console.log("no valid adress input")
            return;
        }

        connected.subscribe(async value => {
            if (!value) return
            soulExists = await $contracts.sbtcontract.methods.hasSoul(searchedSoul).call();
            console.log('target has Soul:', soulExists);
        })

        selectedAccount.subscribe(async $selectedAccount => {
        if (!$selectedAccount) return;
        console.log('connected to account ', $selectedAccount)
        })

        contracts.subscribe(async $contracts => {
            if (!$contracts.sbtcontract) return;
            SoulObject = await $contracts.sbtcontract.methods.getSoul(searchedSoul).call();
            console.log('Soul is', SoulObject);
            sbts = await getSbts()

        })

        score = await fetch(
            `/api/+server?searchedSoul=${searchedSoul}&contractInstance=${$contracts.sbtcontract}`,
            {
                method: 'GET',
            },
        ).then((response) => {
            if (!response.ok) {
                throw new Error('Error while fetching Score');
            }
            console.log(response.text,"ola")
            return response.text();
        });
        console.log("test: ", score)

   /*  return new Promise(resolve => {
        setTimeout(async () => {
        resolve({ hasSoul: await hasSoulFront()  ,  sbt: await showSbts()  });
        }, 1000);
    }); 
 */
    // Just an empty promise to make svelte wait for the data to be loaded
    return new Promise(resolve => {
        setTimeout(async () => {
        resolve({});
        }, 1000);
    });
    }


</script>

 {#await data}
 <p>Loading..</p> <!-- TODO: make loading page nice -->
 {:then value}

{#if soulExists}
 
<div style="height: 93%" class="w-full h-full bg-cover fixed flex gap-3 p-5">
  
    <div id="Basic Information"  class="border relative flex-col w-1/4  ">
         <Soulinfo soul={SoulObject} searchedSoul={searchedSoul}/>
         <Score score={score} searchedSoul={searchedSoul}></Score>
    </div>

    <div id="SbtList"class="w-2/4 border grid gap-2 place-items-center ">
        <Sbtlist sbt={sbts} />
    </div>

    <div class="w-1/4  border relative">
        <AttestBox on:attestSbt={attestSBTFront} ></AttestBox>
        <RevokeBox on:revokeSbt={revokeSBTFront} ></RevokeBox>
    </div>
</div>
{:else}
<PageNotFound></PageNotFound>
{/if}

{/await}
