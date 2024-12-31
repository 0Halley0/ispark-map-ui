<template>
  <transition name="fade-slide">
    <v-sheet
      v-if="isFilterActive"
      class="p-4 col-span-1 text-cardText text-center mx-auto"
      elevation="12"
      rounded="lg"
      width="100%"
    >
      <h2 class="text-h5">Filtre</h2>
      <div class="text-start">
        <v-radio-group v-model="selectedParkingType" inline>
          <v-radio color="primary" label="Kapalı Otopark" value="0"></v-radio>
          <v-radio color="primary" label="Açık Otopark" value="1"></v-radio>
        </v-radio-group>
        <v-checkbox
          v-model="showOnlyAvailable"
          color="primary"
          label="Sadece boş park yerlerini göster"
        ></v-checkbox>
        <span
          >Ücretsiz Zaman ({{ freeTimeRange[0] }} -
          {{ freeTimeRange[1] }} dk)</span
        >
        <v-range-slider
          v-model="freeTimeRange"
          color="primary"
          step="15"
          thumb-label
        ></v-range-slider>
      </div>
    </v-sheet>
  </transition>
</template>

<script setup>
import { defineProps, ref } from "vue";

defineProps({
  isFilterActive: Boolean,
});
const selectedParkingType = ref("0");
const showOnlyAvailable = ref(false);
const freeTimeRange = ref([0, 120]);
</script>
<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.2s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
