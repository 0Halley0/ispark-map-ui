<template>
  <v-card class="mx-auto mb-4" elevation="12">
    <v-card-item>
      <v-card-title>{{ item.parkName }}</v-card-title>
      <v-card-subtitle class="text-wrap">
        {{ item.district }}
      </v-card-subtitle>
      <v-divider class="border-opacity-100"></v-divider>
    </v-card-item>
    <v-card-text>
      <p>
        <span class="font-semibold">{{ item.parkType }}</span>
        <span class="text-lightText"> . Mevcut Park Alanı: </span>
        <span class="font-semibold">{{ item.emptyCapacity }}</span>
      </p>
      <p>
        <span
          class="font-semibold"
          :class="item.isOpen ? 'text-success' : 'text-error'"
        >
          {{ item.isOpen ? "Açık" : "Kapalı" }}
        </span>
        <span class="text-lightText"> . Çalışma Saatleri: </span>
        <span class="font-semibold">{{ item.workHours }}</span>
      </p>
      <p>
        <span class="text-lightText">Ücretsiz Zaman: </span>
        <span class="font-semibold">{{ item.freeTime }} dakika</span>
      </p>
      <v-divider
        v-if="item.driveDistance"
        class="border-opacity-100"
      ></v-divider>

      <div v-if="item.driveDistance" class="grid grid-cols-3 mt-4">
        <div class="col-span-2">
          <p class="text-lightText">
            Mesafe: {{ parseFloat(item.driveDistance).toFixed(1) }} km
          </p>
          <p class="text-lightText">
            Tahmini Varış Süresi: {{ parseInt(item.driveTime, 10) }} dk
          </p>
        </div>
        <div class="col-span-1 flex justify-end align-center">
          <v-btn icon color="primary" class="flex justify-center align-center">
            <v-icon size="2rem">mdi-car-arrow-right</v-icon>
          </v-btn>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { defineProps } from "vue";
defineProps({
  item: Object,
});
</script>
