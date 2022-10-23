<script setup lang="ts">
import pixel from "./components/pixel.vue";
import { reactive } from "vue";
import { useDataStore } from './stores/data';
import html2canvas from 'html2canvas';

const dataStore = useDataStore();

const state = reactive({
  pickedColor: dataStore.pickedColor,
  pixelColor: dataStore.pixelColor,
  gridSize: dataStore.gridSize,
  pixelSize: dataStore.pixelSize,
  canvasSize: dataStore.canvasSize,
})

// switches CSS color of picked pixel tile to currently picked color 
function changeColor(picked: number) {
    state.pixelColor[picked] = state.pickedColor;
  }

// changes the grid pattern by adjusting CSS size of pixel tiles and canvas
function changeGrid(picked: number) {
  if (picked == 64) {
    state.gridSize = 64;
    state.pixelSize = 5;
  } else if (picked == 144) {
    state.gridSize = 144;
    state.pixelSize = 3.333;
  } else if (picked == 256) {
    state.gridSize = 256;
    state.pixelSize = 2.5;
  } else if (picked == 1024) {
    state.gridSize = 1024;
    state.pixelSize = 1.25;
  }
}

// takes a screenshot of the current canvas element and downloads it
function printCanvas(){
  // error message for screenshotTarget does not seem to bother the app
  const screenshotTarget:HTMLElement = document.getElementById('canvasArt');

  // html2canvas library takes a screenshot of a selected DOM element
  html2canvas(screenshotTarget, {width: 640, height: 640 }).then((c)=>{
    const base64image = c.toDataURL("image/png");
    let anchor = document.createElement('a');
    anchor.setAttribute("href", base64image);
    anchor.setAttribute("download", "my-pixel-art.png")
    anchor.click();
    anchor.remove();
  })
}
</script>

<template>
  <div>
    <div class="container">
      <h1>Pixel Art Creator</h1>

      <!-- control panel for color and grid size -->
      <div class="controls">
        <h3>Grid Size:</h3>
        <select
          id="size"
          v-model="state.canvasSize"
          @change="changeGrid(state.canvasSize)"
        >
          <option value="64">8x8</option>
          <option value="144">12x12</option>
          <option value="256">16x16</option>
          <option value="1024">32x32</option>
        </select>
        <h3>Color Palette:</h3>
        <button
          class="paletteTile"
          @click="state.pickedColor = 'white'"
          style="background-color: white"
        ></button>
        <button
          class="paletteTile"
          @click="state.pickedColor = 'black'"
          style="background-color: black"
        ></button>
        <button
          class="paletteTile"
          @click="state.pickedColor = 'red'"
          style="background-color: red"
        ></button>
        <button
          class="paletteTile"
          @click="state.pickedColor = 'green'"
          style="background-color: green"
        ></button>
        <button
          class="paletteTile"
          @click="state.pickedColor = 'blue'"
          style="background-color: blue"
        ></button>
        <button
          class="paletteTile"
          @click="state.pickedColor = 'yellow'"
          style="background-color: yellow"
        ></button>
        <button
          class="paletteTile"
          @click="state.pickedColor = 'orange'"
          style="background-color: orange"
        ></button>
        <button
          class="paletteTile"
          @click="state.pickedColor = 'pink'"
          style="background-color: pink"
        ></button>
        <button
          class="paletteTile"
          @click="state.pickedColor = 'violet'"
          style="background-color: violet"
        ></button>
        <button
          class="paletteTile"
          @click="state.pickedColor = 'purple'"
          style="background-color: purple"
        ></button>
        <button
          class="paletteTile"
          @click="state.pickedColor = 'brown'"
          style="background-color: brown"
        ></button>
        <input type="color" v-model="state.pickedColor" />

        <div>
          <h3>Picked Color:</h3>
          <p v-if="state.pickedColor" :style="{ color: state.pickedColor }">
            {{ state.pickedColor }}
          </p>
          <p v-else style="font-style: italic">no color picked</p>
        </div>
      </div>

      <!-- pixel canvas -->
      <div class="canvas" id="canvasArt">
        <div v-for="i in state.gridSize" :key="i">
          <pixel
            :style="{
              backgroundColor: state.pixelColor[i],
              width: state.pixelSize + 'rem',
              height: state.pixelSize + 'rem',
            }"
            @click="changeColor(i)"
          ></pixel>
        </div>
      </div>
      <!-- download current pixel canvas -->
      <button class="btn" @click="printCanvas">Download as png</button>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Roboto+Condensed&display=swap');

.controls{
  background-color: rgb(225, 225, 225);
  min-height: auto;
  min-width: auto;
  padding-bottom: 1rem;
  padding-left: 1rem;
  margin-bottom: 1rem;
}
.paletteTile{
  border-style: solid;
  border-width: 1px;
  width: 2rem;
  height: 2rem;
  float: left;
  margin-right: 3px;
}
.paletteTile:hover{
  cursor: pointer
}

p{
  font-family: 'Roboto Condensed', Arial, Helvetica, sans-serif;
}

h1{
  font-family: 'Press Start 2P', Arial, Helvetica, sans-serif;
  font-weight: bold;
  text-align: center;
}

h3{
  font-family: 'Roboto Condensed', Arial, Helvetica, sans-serif;
  padding-top: 1rem;
}
.container{
  display: block;
}
.canvas{
  width: 40rem;
}

.btn{
  background-color: rgb(255,67,47,0.8);
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  border: none;
  color: white;
  padding: 12px 30px;
  cursor: pointer;
  font-size: 20px;
  font-family: 'Roboto Condensed'
}

select{
    padding: 0.5rem;
}
.btn:hover{
  background-color: rgb(255,67,47,1);
}
</style>
