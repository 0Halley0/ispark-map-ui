<template>
  <transition name="fade-slide">
    <v-sheet
      v-if="isHelpActive"
      class="p-4 col-span-1 text-cardText text-center mx-auto"
      elevation="12"
      rounded="lg"
      width="100%"
    >
      <v-icon
        class="mb-5"
        color="success"
        icon="mdi-help-circle"
        size="80"
      ></v-icon>

      <h2 class="text-h5 mb-6">Nasıl Kullanılır?</h2>
      <div class="flex gap-4">
        <v-icon
          class="mb-5"
          color="success"
          icon="mdi-numeric-1-circle-outline"
          size="30"
        ></v-icon>
        <span
          class="mb-4 text-cardText text-justify text-medium-emphasis text-body-2"
        >
          Harita (<v-icon
            color="primary"
            icon="mdi-map-search"
            size="20"
          ></v-icon
          >) tuşuna tıklayarak uygulama üzerinden otoparkları harita üzerinde
          görüntüleyin.
        </span>
      </div>
      <div class="flex gap-4">
        <v-icon
          class="mb-5"
          color="success"
          icon="mdi-numeric-2-circle-outline"
          size="30"
        ></v-icon>
        <span
          class="mb-4 text-cardText text-justify text-medium-emphasis text-body-2"
        >
          Liste (<v-icon
            color="primary"
            icon="mdi-format-list-bulleted"
            size="20"
          ></v-icon
          >) tuşuna tıklayarak otopark detaylarını görüntüleyin.
        </span>
      </div>
      <div class="flex gap-4">
        <v-icon
          class="mb-5"
          color="success"
          icon="mdi-numeric-3-circle-outline"
          size="30"
        ></v-icon>
        <span
          class="mb-4 text-cardText text-justify text-medium-emphasis text-body-2"
        >
          Filtre (<v-icon
            color="primary"
            icon="mdi-filter-outline"
            size="20"
          ></v-icon
          >) tuşuna tıklayarak otoparkları doluluk durumuna, çalışma saatlerine
          ve ücretlendirme bilgilerinie göre filtreleyin.
        </span>
      </div>
      <div class="flex gap-4">
        <v-icon
          class="mb-5"
          color="success"
          icon="mdi-numeric-4-circle-outline"
          size="30"
        ></v-icon>
        <span
          class="mb-4 text-cardText text-justify text-medium-emphasis text-body-2"
        >
          Konum (<v-icon
            color="primary"
            icon="mdi-crosshairs-gps"
            size="20"
          ></v-icon
          >) tuşuna tıklayarak mevcut konumunuzu bulun ve en yakın otoparkları
          arayın.
        </span>
      </div>
    </v-sheet>
  </transition>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  isHelpActive: Boolean,
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
