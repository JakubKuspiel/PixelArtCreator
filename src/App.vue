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
    state.pixelSize = 3.3;
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
  <div class="container">
    <div>
      <p>Pick a Size:</p>
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
      <p>Pick a color:</p>
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
          picked color:
          <p :style="{ color: state.pickedColor }">{{ state.pickedColor }}</p>
        </div>
      </div>
    </div>

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
      <button class="button" @click="printCanvas">Download as png</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: block;
}
.canvas {
  width: 40rem;
}


</style>
