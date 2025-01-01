<template>
  <transition name="fade-slide">
    <v-sheet
      v-if="isGraphActive"
      class="p-4 col-span-1 text-cardText text-center mx-auto"
      elevation="12"
      rounded="lg"
      width="100%"
    >
      gfg
    </v-sheet>
  </transition>
</template>
<script setup>
import { defineProps } from "vue";

defineProps({
  isGraphActive: Boolean,
});
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
