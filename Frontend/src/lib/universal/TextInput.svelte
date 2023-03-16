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

    import { createEventDispatcher } from "svelte";
    import { writable } from "svelte/store";
    import {browser} from "$app/env"

    export const soulSearched = writable(
        browser && (localStorage.getItem('soulSearched') || ''));
    soulSearched.subscribe((val) => browser && localStorage.setItem("soulSearched", val));

    const dispatch = createEventDispatcher();

    
    function manageEnter(event: any){
        event.preventDefault();
        //Code 13 = Enter
        if (event.keyCode === 13) {
            dispatch('searchEntered', {
                search: $soulSearched
            });
            console.log($soulSearched);

        } 
    }

</script>

<div style="left:42%" class= "absolute  w-80">
    <input on:keyup={manageEnter} bind:value={$soulSearched} type="text" placeholder="Search for Soul..." class="input input-bordered  input-accent w-full max-w-xs" />
</div>
