<script setup lang="ts">
import pixel from "./components/pixel.vue";
import { ref } from "vue";

let gridSize = ref(64);
let pixelSize = ref(5);
let canvasSize = ref(gridSize.value);
let pickedColor = ref();
let pixelColor = ref([0]);

function changeColor(picked: number) {
  console.log("change Color to " + pickedColor.value);
  pixelColor.value[picked] = pickedColor.value;
}

function changeGrid(picked: String) {
  console.log("change grid to " + canvasSize.value);
  if (picked == '8x8') {
    gridSize.value = 64;
    pixelSize.value = 5;
  } else if (picked == '12x12') {
    gridSize.value = 144;
    pixelSize.value = 3.3;
  } else if (picked == '16x16') {
    gridSize.value = 256;
    pixelSize.value = 2.5;
  } else if (picked == '32x32') {
    gridSize.value = 1024;
    pixelSize.value = 1.25;
  }
}
</script>

<template>
  <div class="container">
    <div>
      <p>Pick a Size:</p>
      <select id="size" v-model="canvasSize" @change="changeGrid(canvasSize)">
        <option>8x8</option>
        <option>12x12</option>
        <option>16x16</option>
        <option>32x32</option>
      </select>

      <p>Pick a color:</p>
      <select id="color" v-model="pickedColor">
        <option value="white">white</option>
        <option value="red">red</option>
        <option value="blue">blue</option>
        <option value="green">green</option>
        <option value="yellow">yellow</option>
      </select>

      <div>
        <div>
          picked color:
          <p :style="{ color: pickedColor }">{{ pickedColor }}</p>
        </div>
      </div>
    </div>

    <div class="canvas">
      <div v-for="i in gridSize" :key="i">
        <div>
          <pixel
            :style="{
              backgroundColor: pixelColor[i],
              width: pixelSize + 'rem',
              height: pixelSize + 'rem',
            }"
            @click="changeColor(i)"
          ></pixel>
        </div>
      </div>
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
