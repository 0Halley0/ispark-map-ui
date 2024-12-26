<template>
  <div>
    <div class="">
      <v-img
        :width="300"
        aspect-ratio="16/9"
        cover
        :src="require('@/assets/ispark-tansparent.png')"
      />
    </div>
    <div class="m-8" id="map"></div>
  </div>
</template>

<script setup>
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
#map {
  height: 80vh;
  width: 80vw;
  border-radius: 2rem;
}
</style>
