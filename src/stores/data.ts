import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useDataStore = defineStore("data", () => {
  const testString = ref("this is Pinia!!");

  const gridSize = ref(64);
  const pixelSize = ref(5);
  const canvasSize = ref(gridSize.value);
  const pickedColor = ref();
  const pixelColor = ref([0]);

  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }

  return { count, doubleCount, increment, testString, gridSize, pixelSize, canvasSize, pickedColor, pixelColor};
});
