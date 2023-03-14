<!--
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
-->
<script lang="ts">
    import type { Sbt } from "../../../../Backend/models/sbt";

    export let sbt: Sbt[];

</script>

<div id="AffiliatedSouls"
    class="shadow-md shadow-accent bg-gradient-to-r from-neutral to-neutral flex-col border overflow-y-auto w-full h-full left-10 top-10">
        {#each sbt as s}
            <div class="{s.reputation ? 'positive bg-gradient-to-r from-neutral to-neutral via-green-700' : 'negative bg-gradient-to-r from-neutral to-neutral via-red-700'} ">
                <p class="font-bold ">TokenId: {s.tokenId} </p> 
                <p class="font-bold "> Attested by <a href={s.attester} target="_blank">{s.attester}</a> </p> 
                <p class="font-bold "> Description: {s.explanation_url} </p>
                <p class="font-bold "> active: {s.active} </p>
                <p class="font-bold "> timestamp: { new Date(Number(s.timestamp * 1000)).toLocaleDateString("en-GB")} </p>
            </div>
        {/each} 
        
</div>
<style>
    .positive{
        border-width: 2px;
        border-color: rgb(74 222 128);
        flex: 1 1 0%;
        flex-direction: row;
        margin: 0.25rem;
        background-color: rgb(209 250 229);
        padding: 3px;

    }

    .negative{
        border-width: 2px;
        border-color: rgb(185 28 28);
        flex: 1 1 0%;
        flex-direction: row;
        margin: 0.25rem;
        background-color: rgb(251 207 232);
        padding: 3px;

    }


</style>