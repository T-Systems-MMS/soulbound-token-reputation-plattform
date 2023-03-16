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
<script lang="ts">
  import { defaultEvmStores as evm, connected,  web3, contracts , selectedAccount } from 'svelte-web3'
  import type { AbiItem } from "web3-utils";
  import SBT_ABI from "../../contracts/SBT.json";
  import contractAddress from "../../contracts/contract-address.json";
  import { hasSoul, mintSoul } from "$lib/sbtfunctions";
  import type {Soul} from "../../../../Backend/models/soul"

  export let SoulObject: Soul;

  
</script>

   <div class="w-1/2 h-1/2 bg-gradient-to-r from-primary to-neutral border justify-items-center p-5  text-2xl shadow-md shadow-accent ">
      <p class="font-bold  pb-10 ">Basic Information</p>
      <p class="font-bold  pb-4"  > Address: {$selectedAccount}</p> 
      <p class="font-bold  pb-4"  > Identity: {SoulObject.identity}</p> 
      <p class="font-bold pb-4 "> URL: {SoulObject.url} </p> 
      <p class="font-bold  pb-14"> Created at: {new Date(Number(SoulObject.timestamp )).toLocaleDateString("en-GB")}</p> 

      <button
        class="w-fit h-12 btn btn-accent fontsize-100"
        ><a href="souls/{$selectedAccount}" class=" text-3xl text-white normal-case">Check your profile now! </a>
      </button>

    </div>

