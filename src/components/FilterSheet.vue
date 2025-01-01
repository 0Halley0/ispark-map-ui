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
        <v-checkbox
          v-model="showOnlyAvailable"
          color="primary"
          label="Sadece boş park yerlerini göster"
          @change="applyFilter"
        ></v-checkbox>
        <v-checkbox
          v-model="showOnlyFreeTime"
          color="primary"
          label="Sadece ücretsiz park yerlerini göster"
          @change="applyFilter"
        ></v-checkbox>
      </div>
      <v-btn @click="applyFilter" color="primary" class="mt-4"> Uygula </v-btn>
    </v-sheet>
  </transition>
</template>

<script setup>
import { defineProps, ref } from "vue";

const props = defineProps({
  isFilterActive: Boolean,
  onFilterChange: Function,
});

const showOnlyAvailable = ref(false);
const showOnlyFreeTime = ref(false);

const applyFilter = () => {
  const filters = {
    emptyCapacity: showOnlyAvailable.value,
    freeTime: showOnlyFreeTime.value,
  };
  props.onFilterChange(filters);
};
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
