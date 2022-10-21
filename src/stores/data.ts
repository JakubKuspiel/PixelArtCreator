import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useDataStore = defineStore("data", () => {

  const gridSize = ref(64);
  const pixelSize = ref(5);
  const canvasSize = ref(gridSize.value);
  const pickedColor = ref();
  const pixelColor = ref([0]);

  return { gridSize, pixelSize, canvasSize, pickedColor, pixelColor };
});
