<template>
  <v-card
    flat
    class="md:w-[89vw] hidden gap-4 px-2 mb-4 md:flex flex-wrap h-fit bg-transparent"
  >
    <v-card-actions>
      <v-btn
        @click="getCurrentPosition"
        class="rounded-xl"
        prepend-icon="mdi-crosshairs-gps"
        variant="outlined"
      >
        Konuma Göre Ara
      </v-btn>
      <v-btn
        @click="toggleFilterMenu"
        class="rounded-xl"
        prepend-icon="mdi-filter-outline"
        variant="outlined"
      >
        Filtre
      </v-btn>
      <transition name="fade-slide">
        <div
          class="flex md:flex-col lg:flex-row gap-2"
          v-if="isFilterMenuActive"
        >
          <v-chip
            @click="showOnlyAvailable = !showOnlyAvailable"
            :color="showOnlyAvailable ? 'secondary' : 'white'"
            class="rounded-xl"
            prepend-icon="mdi-car-hatchback"
          >
            Sadece boş park yerlerini göster
          </v-chip>
          <v-chip
            @click="showOnlyFreeTime = !showOnlyFreeTime"
            :color="showOnlyFreeTime ? 'secondary' : 'white'"
            class="rounded-xl"
            prepend-icon="mdi-cash"
          >
            Sadece ücretsiz park yerlerini göster
          </v-chip>

          <v-btn rounded @click="applyFilter" variant="outlined">
            Uygula
          </v-btn>
        </div>
      </transition>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { defineProps, ref } from "vue";

const props = defineProps({
  isFilterMenuActive: Boolean,
  onFilterChange: Function,
  toggleFilterMenu: Function,
  getCurrentPosition: Function,
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
::v-deep(.fade-slide-enter-active),
::v-deep(.fade-slide-leave-active) {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

::v-deep(.fade-slide-enter-from) {
  opacity: 0;
  transform: translateX(-20px);
}

::v-deep(.fade-slide-leave-to) {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
