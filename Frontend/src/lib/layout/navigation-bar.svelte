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
<script lang=ts>
import {  user } from "$lib/stores";


import ButtonPrimary from "$lib/universal/button-primary.svelte";
import TextInput from "$lib/universal/TextInput.svelte";
import { onMount } from "svelte";
import { web3,connected, defaultEvmStores, selectedAccount } from "svelte-web3";


function changePage(event: { detail: { search: string; } }) {
    let route = event.detail.search;
    window.location.href = "/souls/"+route
}

/* defaultEvmStores.attachContract('sbtcontract',contractAddress.SBT, SBT_ABI.abi as AbiItem[])
 */
/**
 * Disconnect all connections form metamask
 */
async function disconnect(){
    await defaultEvmStores.disconnect()
    user.set("No Account Connected")
    localStorage.setItem('isWalletConnected', "false");
}

async function connect(){
        await defaultEvmStores.setProvider() 
        localStorage.setItem('isWalletConnected', "true");
        let address =  await $web3.eth.getAccounts()
        user.set(address[0]);
    }

/**
 *  Check if User is still connected after page reload
*/
onMount(async () => {
		if (localStorage?.getItem('isWalletConnected') === 'true'){
            try{
                console.log("Reconnecting...")
                await defaultEvmStores.setProvider();
                let address = await $web3.eth.getAccounts();
                user.set(address[0]);

                localStorage.setItem('isWalletConnected', "true");
            } catch (ex){
                console.log(ex);
            }
        }
	});

let address: string;

user.subscribe(value => {
    address = value;
});

</script>

<div class="navbar bg-gradient-to-r from-primary via-neutral to-secondary w-full gap-5">
    <p class="btn btn-ghost normal-case text-xl "><a href ='/' >Decentralized Reputation</a></p>

    <a class="btn-ghost" href="/about">About</a>

    <a class="ml-4 btn-ghost" href="/mint">Mint</a>
    
   
    <TextInput on:searchEntered={changePage}> </TextInput>
   

    <div style="margin-left:auto;" class=" w-auto gap-5">

        <!-- use this instead of user store here-->
<!--         <p class="ml-auto  ">0x0000000000000000000000000000000000000000</p>
 -->                                      
        {#if $connected}
        <p class="ml-auto btn-ghost "><a href ='/souls/{$selectedAccount}' >{$selectedAccount}</a></p>
       <!--  {:else}
        <p class="ml-auto invisible border ">0x0000000000000000000000000000000000000000</p> -->
        {/if}
        {#if $connected}
        <button  on:click={disconnect} class="btn btn-ghost normal-case text-xl">Disconnect </button>
        {:else}
        <button  on:click={connect} class="btn btn-ghost normal-case text-xl">Connect </button>
        {/if}
      
        
    </div>
    
</div>

