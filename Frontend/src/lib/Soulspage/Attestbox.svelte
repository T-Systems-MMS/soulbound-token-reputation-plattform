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
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();


let reputation = true;
let description = '';

function AttestSBTFront() {
    dispatch('attestSbt', {
        reputation: reputation,
        description: description,
    });
    console.log(reputation)
    console.log(description)

}

</script>

<div class="pl-1 bg-gradient-to-r from-neutral to-secondary border justify-items-center grid bg-primary w-full h-2/4  ">
            <p class="text-center text-2xl font-bold">
                Attest an SBT to that Soul here. Uncheck the Checkbox to attest negative reputation.
            </p>

            <div class="justify-center flex flex-row w-full ">
                
                <input
                    bind:value={description}
                    type="text"
                    placeholder="SBT Description"
                    class="input input-bordered input-accent w-full max-w-xs"
                />

                <input
                    bind:checked={reputation}
                    type="checkbox"
                    class="border  input input-bordered input-accent w-16 "
                />

               
            </div>
            <button
                on:click={AttestSBTFront}
                class="w-48 h-12 btn btn-accent fontsize-100 "
                ><span class=" text-3xl text-white">Attest</span>
            </button>
        </div>

