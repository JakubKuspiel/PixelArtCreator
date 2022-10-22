<script setup lang="ts">
import pixel from "./components/pixel.vue";
import { reactive, computed } from "vue";
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

function changeColor(picked: number) {
    console.log("change Color to " + state.pickedColor);
    state.pixelColor[picked] = state.pickedColor;
  }

function changeGrid(picked: number) {
  console.log("change grid to " + state.canvasSize);
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

function printCanvas(){
  const screenshotTarget:HTMLElement = document.getElementById('canvasArt');

  html2canvas(screenshotTarget, {width: 640, height: 640 }).then((c)=>{
    const base64image = c.toDataURL("image/png");
    let anchor = document.createElement('a');
    anchor.setAttribute("href", base64image);
    anchor.setAttribute("download", "my-image.png")
    anchor.click();
    anchor.remove();
  })
}
</script>

<template>
  <div>
    <div class="container">
      <h1>Pixel Art Creator</h1>
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
        <h3>Color:</h3>
        <input type="color" v-model="state.pickedColor" />
        <!-- <select id="color" v-model="state.pickedColor">
        <option value="white">white</option>
        <option value="black">black</option>
        <option value="red">red</option>
        <option value="blue">blue</option>
        <option value="green">green</option>
        <option value="yellow">yellow</option>
      </select> -->

        <div>
          <div>
            <h3>Picked Color:</h3>
            <p :style="{ color: state.pickedColor }">{{ state.pickedColor }}</p>
          </div>
        </div>
      </div>

      <h3>Canvas:</h3>
      <div class="canvas" id="canvasArt">
        <div v-for="i in state.gridSize" :key="i">
          <div>
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
        <button class="btn" @click="printCanvas">Download as png</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Roboto+Condensed&display=swap');

.controls{
  background-color: rgb(245, 245, 245);
  min-height: auto;
  min-width: auto;
  padding-bottom: 1rem;
  padding-left: 1rem;
}
body {
  background-color: black;
}

h1{
  font-family: 'Press Start 2P', Arial, Helvetica, sans-serif;
  font-weight: bold;
  padding-bottom: 1rem;
  text-align: center;
}
h3{
  font-family: 'Roboto Condensed', Arial, Helvetica, sans-serif;
  padding-top: 1rem;
}
.container {
  display: block;
}
.canvas {
  width: 40rem;
}

.btn {
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

/* Darker background on mouse-over */
.btn:hover {
  background-color: rgb(255,67,47,1);
}
</style>
