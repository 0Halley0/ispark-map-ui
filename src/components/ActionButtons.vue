<template>
  <div class="col-span-1 md:hidden w-full grid grid-cols-3 gap-4">
    <v-btn
      @click="toggleFilter"
      class="col-span-1"
      prepend-icon="mdi-filter-outline"
      stacked
      variant="tonal"
    >
      Filtre
    </v-btn>
    <v-btn
      @click="getCurrentPosition"
      class="col-span-1"
      prepend-icon="mdi-crosshairs-gps"
      stacked
      variant="tonal"
    >
      Konum
    </v-btn>
    <v-btn
      @click="toggleHelp"
      class="col-span-1"
      prepend-icon="mdi-help"
      stacked
      variant="tonal"
    >
      Yardım
    </v-btn>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  isHelpActive: Boolean,
  isFilterActive: Boolean,
  toggleHelp: Function,
  toggleFilter: Function,
  getCurrentPosition: Function,
});
</script>

<style scoped></style>
