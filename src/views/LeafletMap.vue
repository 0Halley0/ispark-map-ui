<template>
  <div class="sm:hidden grid grid-cols-1 justify-items-center gap-4 p-4">
    <div class="col-span-1">
      <IsparkHeader />
    </div>

    <div class="col-span-1 my-4">
      <p class="text-center">
        İspark Otopark Harita uygulamasını kullanarak İstanbul’daki İspark
        otoparklarının doluluk oranlarını kolayca öğrenebilirsiniz.
      </p>
    </div>

    <div class="col-span-1 w-full grid grid-cols-2 gap-4">
      <v-btn
        class="col-span-1"
        prepend-icon="mdi-map-search"
        stacked
        variant="tonal"
      >
        Harita
      </v-btn>
      <v-btn
        class="col-span-1"
        prepend-icon="mdi-format-list-bulleted"
        stacked
        variant="tonal"
      >
        Liste
      </v-btn>
    </div>

    <div class="col-span-1 w-full grid grid-cols-4 gap-4">
      <v-btn
        class="col-span-1"
        prepend-icon="mdi-magnify"
        stacked
        variant="tonal"
      >
        Ara
      </v-btn>
      <v-btn
        class="col-span-1"
        prepend-icon="mdi-filter-outline"
        stacked
        variant="tonal"
      >
        Filtre
      </v-btn>
      <v-btn
        class="col-span-1"
        prepend-icon="mdi-crosshairs-gps"
        stacked
        variant="tonal"
      >
        Konum
      </v-btn>
      <v-btn class="col-span-1" prepend-icon="mdi-help" stacked variant="tonal">
        Yardım
      </v-btn>
    </div>

    <v-sheet
      class="p-4 col-span-1 text-cardText text-center mx-auto"
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
          Uygulama üzerinden otoparkları harita üzerinde görüntüleyin.
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
          Konumunuzu belirleyin veya en yakın otoparkı arayın.
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
          Otoparkın doluluk durumu, çalışma saatleri ve ücretlendirme
          bilgilerini kontrol edin.
        </span>
      </div>
    </v-sheet>

    <div class="col-span-1 h-[80vh] w-[90vw] rounded-2xl" id="map"></div>

    <h3 class="text-h6 text-center mb-4">İspark Otopark Listesi</h3>
    <v-expansion-panels
      class="col-span-1 w-[90vw] h-[70vh] overflow-auto"
      variant="popout"
    >
      <div v-if="isparkStore.isLoadingState">
        <p>Yükleniyor...</p>
      </div>
      <div v-else-if="isparkStore.getError">
        <p class="text-red-500">{{ isparkStore.getError }}</p>
      </div>
      <v-expansion-panel
        v-for="(park, index) in isparkData"
        :key="index"
        :title="park.parkName"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup>
import IsparkHeader from "@/components/IsparkHeader.vue";
import { ref, onMounted, computed } from "vue";
import { useIsparkStore } from "@/stores/isparkStore";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";

const isparkStore = useIsparkStore();
const initialMap = ref(null);

const isparkData = computed(() => isparkStore.isparkData?.data || []);

onMounted(() => {
  isparkStore.fetchIsparkData();
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
