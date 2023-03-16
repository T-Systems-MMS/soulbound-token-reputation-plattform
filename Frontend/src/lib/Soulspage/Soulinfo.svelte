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
import type { Soul } from "../../../../Backend/models/soul";

    export let soul: Soul;
    export let searchedSoul: string;
</script> 


<div class="bg-gradient-to-r from-primary to-neutral border bg-primary text-center justify-center w-full h-2/4  left-10 top-10">
     <p class="font-bold text-xl pb-2 underline">Basic Information</p>
     <p class="font-bold text-lg pb-2"  > Address: {searchedSoul}</p> 
     <p class="font-bold text-xl pb-2"  > Identity: {soul.identity}</p> 
     <p class="font-bold text-xl pb-2 "> URL: {soul.url} </p> 
     <p class="font-bold text-xl pb-2"> Created at: {new Date(Number(soul.timestamp )).toLocaleDateString("en-GB")}</p> 
</div>