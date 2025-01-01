<template>
  <div class="grid grid-cols-1 justify-items-center gap-4 p-4">
    <div class="col-span-1">
      <IsparkHeader />
    </div>

    <div class="col-span-1 my-4">
      <p class="text-center">
        İspark Otopark Harita uygulamasını kullanarak İstanbul’daki İspark
        otoparklarının doluluk oranlarını kolayca öğrenebilirsiniz.
      </p>
    </div>

    <div class="col-span-1 md:hidden w-full grid grid-cols-2 gap-4">
      <v-btn
        @click="activeTab = 'map'"
        class="col-span-1"
        prepend-icon="mdi-map-search"
        stacked
        variant="tonal"
      >
        Harita
      </v-btn>
      <v-btn
        @click="activeTab = 'list'"
        class="col-span-1"
        prepend-icon="mdi-format-list-bulleted"
        stacked
        variant="tonal"
      >
        Liste
      </v-btn>
    </div>

    <ActionButtons
      :isHelpActive="isHelpActive"
      :isFilterActive="isFilterActive"
      :isGraphActive="isGraphActive"
      :toggleHelp="toggleHelp"
      :toggleFilter="toggleFilter"
      :toggleGraph="toggleGraph"
      :getCurrentPosition="getCurrentPosition"
    />

    <HelpSheet :isHelpActive="isHelpActive" />

    <FilterSheet
      :isFilterActive="isFilterActive"
      :onFilterChange="handleFilterChange"
    />
    <GraphSheet :isGraphActive="isGraphActive" />

    <v-tabs-window v-model="activeTab">
      <v-window-item
        class="flex mx-8 border-double border-4 rounded-xl p-3"
        value="map"
      >
        <div
          class="col-span-1 h-[80vh] w-[90vw] md:w-[65vw] rounded-2xl"
          id="map"
        ></div>

        <v-container
          class="hidden md:block md:w-[35%] h-[80vh] overflow-auto mx-auto"
        >
          <div v-if="isparkStore.isLoadingState">
            <v-skeleton-loader
              v-for="n in 6"
              :key="n"
              class="my-4 -mt-4 w-[90%] mx-auto"
              elevation="12"
              type="article"
              width="100%"
              max-width="600"
            ></v-skeleton-loader>
          </div>

          <div v-else-if="isparkStore.getError">
            <v-sheet
              class="p-6 col-span-1 text-cardText text-center mx-auto"
              elevation="12"
              max-width="600"
              rounded="lg"
              width="100%"
            >
              <v-icon color="red" size="80" class="mb-5"
                >mdi-alert-circle</v-icon
              >
              <p class="text-red-500 font-bold">
                Veriler alınamadı. Lütfen daha sonra tekrar deneyiniz.
              </p>
            </v-sheet>
          </div>

          <v-virtual-scroll
            :items="isparkData"
            item-height="200"
            class="justify-center hide-scroll -mt-4"
            width="100%"
            max-width="600"
          >
            <template #default="{ item }">
              <ParkingLotCard :item="item" />
            </template>
          </v-virtual-scroll>
        </v-container>
      </v-window-item>
      <div class="hidden md:inline">
        <h2 class="text-center text-7xl font-light mt-40 mb-32 col-span-5">
          Nasıl Kullanılır?
        </h2>
        <HelpSteps />
      </div>
      <v-window-item class="border-double border-4 rounded-xl p-3" value="list">
        <div class="col-span-1">
          <h3 class="text-h6 text-center mb-4">İspark Otopark Listesi</h3>
          <v-container
            class="w-full md:w-[80vw] h-[70vh] overflow-auto mx-auto"
          >
            <div v-if="isparkStore.isLoadingState">
              <v-skeleton-loader
                v-for="n in 6"
                :key="n"
                class="my-4 w-[90%] mx-auto"
                elevation="12"
                type="article"
                width="100%"
                max-width="600"
              ></v-skeleton-loader>
            </div>

            <div v-else-if="isparkStore.getError">
              <v-sheet
                class="p-6 col-span-1 text-cardText text-center mx-auto"
                elevation="12"
                max-width="600"
                rounded="lg"
                width="100%"
              >
                <v-icon color="red" size="80" class="mb-5"
                  >mdi-alert-circle</v-icon
                >
                <p class="text-red-500 font-bold">
                  Veriler alınamadı. Lütfen daha sonra tekrar deneyiniz.
                </p>
              </v-sheet>
            </div>

            <v-virtual-scroll
              :items="isparkData"
              item-height="200"
              class="justify-center"
              width="100%"
              max-width="600"
            >
              <template #default="{ item }">
                <ParkingLotCard :item="item" />
              </template>
            </v-virtual-scroll>
          </v-container>
        </div>
      </v-window-item>
    </v-tabs-window>
  </div>
</template>

<script setup>
import IsparkHeader from "@/components/IsparkHeader.vue";
import ActionButtons from "@/components/ActionButtons.vue";
import ParkingLotCard from "@/components/ParkingLotCard.vue";
import HelpSheet from "@/components/HelpSheet.vue";
import HelpSteps from "@/components/HelpSteps.vue";
import FilterSheet from "@/components/FilterSheet.vue";
import GraphSheet from "@/components/GraphSheet.vue";
import { ref, onMounted, computed, watch } from "vue";
import { useIsparkStore } from "@/stores/isparkStore";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import parkMarker from "@/assets/park-logo.png";
import carMarker from "@/assets/car-pin.png";

const isparkStore = useIsparkStore();
const isHelpActive = ref(false);
const isFilterActive = ref(false);
const isGraphActive = ref(false);
const toggleHelp = () => {
  isHelpActive.value = !isHelpActive.value;
  isFilterActive.value = false;
  isGraphActive.value = false;
};
const toggleFilter = () => {
  isFilterActive.value = !isFilterActive.value;
  isHelpActive.value = false;
  isGraphActive.value = false;
};
const toggleGraph = () => {
  isGraphActive.value = !isGraphActive.value;
  isHelpActive.value = false;
  isFilterActive.value = false;
};
const activeTab = ref("map");
const isparkData = computed(() => isparkStore.isparkData?.data || []);
let userMarker;
let map;

watch(activeTab, (newTab) => {
  if (newTab === "map" && map) {
    setTimeout(() => {
      map.invalidateSize();
    }, 200);
  }
});
const handleFilterChange = (filters) => {
  const { emptyCapacity, freeTime, parkType } = filters;
  isparkStore.fetchFilteredParking(emptyCapacity, freeTime, parkType);
};
onMounted(() => {
  isparkStore.fetchIsparkData();
  if (activeTab.value === "map") {
    const mapElement = document.getElementById("map");
    if (mapElement) {
      map = L.map(mapElement).setView([41.024, 29.015], 15);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        minZoom: 13,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      const markerIcon = new L.Icon({
        iconUrl: parkMarker,
        iconSize: [30, 30],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
      });

      const markerClusterGroup = L.markerClusterGroup();
      map.addLayer(markerClusterGroup);

      watch(isparkData, (newData) => {
        markerClusterGroup.clearLayers();

        newData.forEach((park) => {
          const popupContent = `
            <div style="max-width: 250px;">
              <div style="font-size: 1rem; font-weight: bold;">${
                park.parkName
              }</div>
              <div style="font-size: 0.9rem; color: gray;">${
                park.district
              }</div>
              <div style="font-size: 0.85rem; color: #333;">
                <div><strong>${
                  park.parkType
                }</strong> - Mevcut Park Alanı: <strong>${
            park.emptyCapacity
          }</strong></div>
                <div><strong class="${
                  park.isOpen ? "text-success" : "text-error"
                }">${
            park.isOpen ? "Açık" : "Kapalı"
          }</strong> - Çalışma Saatleri: <strong>${
            park.workHours
          }</strong></div>
                <div>Ücretsiz Zaman: <strong>${
                  park.freeTime
                }</strong> dakika</div>
              </div>
            </div>
          `;

          const marker = L.marker(
            [parseFloat(park.lat), parseFloat(park.lng)],
            {
              icon: markerIcon,
            }
          ).bindPopup(popupContent);

          markerClusterGroup.addLayer(marker);
        });
      });
    }
  }
});

const getCurrentPosition = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        if (!map) return;

        if (userMarker) {
          map.removeLayer(userMarker);
        }

        const userIcon = new L.Icon({
          iconUrl: carMarker,
          iconSize: [40, 40],
          iconAnchor: [20, 40],
          popupAnchor: [0, -40],
        });

        userMarker = L.marker([latitude, longitude], { icon: userIcon }).addTo(
          map
        );

        map.setView([latitude, longitude], 19);

        try {
          await isparkStore.fetchNearbyParking(latitude, longitude);
          const nearbyParkingLots = isparkStore.getNearbyParkingLots || [];
          if (nearbyParkingLots.length > 0) {
            const markerIcon = new L.Icon({
              iconUrl: parkMarker,
              iconSize: [30, 30],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              tooltipAnchor: [16, -28],
            });

            const markerClusterGroup = L.markerClusterGroup();
            nearbyParkingLots.forEach((lot) => {
              const popupContent = `
                <div style="max-width: 250px;">
                  <div style="font-size: 1rem; font-weight: bold;">${
                    lot.parkName
                  }</div>
                  <div style="font-size: 0.9rem; color: gray;">${
                    lot.district
                  }</div>
                  <div style="font-size: 0.85rem; color: #333;">
                    <div><strong>${
                      lot.parkType
                    }</strong> - Mevcut Park Alanı: <strong>${
                lot.emptyCapacity
              }</strong></div>
                    <div><strong class="${
                      lot.isOpen ? "text-success" : "text-error"
                    }">${
                lot.isOpen ? "Açık" : "Kapalı"
              }</strong> - Çalışma Saatleri: <strong>${
                lot.workHours
              }</strong></div>
                    <div>Ücretsiz Zaman: <strong>${
                      lot.freeTime
                    }</strong> dakika</div>
                  </div>
                </div>
              `;

              const marker = L.marker([lot.lat, lot.lng], {
                icon: markerIcon,
              }).bindPopup(popupContent);

              markerClusterGroup.addLayer(marker);
            });

            map.addLayer(markerClusterGroup);
          } else {
            console.warn("No nearby parking lots found.");
          }
        } catch (error) {
          console.error("Failed to fetch nearby parking lots:", error);
        }
      },
      (error) => {
        console.error("Geolocation error:", error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
};
</script>

<style scoped></style>
