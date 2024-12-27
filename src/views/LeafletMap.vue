<template>
  <div class="grid grid-cols-1 justify-items-center gap-4 p-4">
    <IsparkHeader />
    <div class="col-span-1 mt-24 mb-16">
      <p class="text-center">
        İspark Otopark Harita uygulamasını kullanarak İstanbul’daki İspark
        otoparklarının doluluk oranlarını kolayca öğrenebilirsiniz.
      </p>
    </div>
    <div class="col-span-1 h-[80vh] w-[90vw] rounded-2xl" id="map"></div>

    <v-sheet
      class="pa-4 text-center mx-auto"
      elevation="12"
      max-width="600"
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
      <p class="mb-4 text-justify text-medium-emphasis text-body-2">
        Uygulama üzerinden otoparkları harita üzerinde görüntüleyin.
      </p>
      <p class="mb-4 text-justify text-medium-emphasis text-body-2">
        Konumunuzu belirleyin veya en yakın otoparkı arayın.
      </p>
      <p class="mb-4 text-justify text-medium-emphasis text-body-2">
        Otoparkın doluluk durumu, çalışma saatleri ve ücretlendirme bilgilerini
        kontrol edin.
      </p>
    </v-sheet>
  </div>
</template>

<script setup>
import IsparkHeader from "@/components/IsparkHeader.vue";
import { ref, onMounted } from "vue";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";

const initialMap = ref(null);

onMounted(() => {
  const mapElement = document.getElementById("map");
  if (!mapElement) {
    console.error("Map element not found!");
    return;
  }

  initialMap.value = L.map(mapElement).setView([41.024, 29.015], 19);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    minZoom: 15,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  })
    .addTo(initialMap.value)
    .on("tileerror", (event) => {
      console.error("Tile load error:", event);
    });

  const markerIcon = new L.Icon({
    iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url)
      .href,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
  });

  L.marker([41.024, 29.015], { icon: markerIcon })
    .addTo(initialMap.value)
    .bindPopup("Üsküdar, Istanbul")
    .openPopup();
});
</script>

<style scoped>
/* #map {
  height: 80vh;
  width: 80vw;
  border-radius: 2rem;
} */
</style>
