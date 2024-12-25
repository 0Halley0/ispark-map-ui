<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";

const initialMap = ref(null);

onMounted(() => {
  initialMap.value = L.map("map").setView([41.024, 29.015], 19);

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
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
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
  height: 100vh;
}
</style>
