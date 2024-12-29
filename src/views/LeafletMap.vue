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
      <v-btn
        @click="isHelpActive = !isHelpActive"
        class="col-span-1"
        prepend-icon="mdi-help"
        stacked
        variant="tonal"
      >
        Yardım
      </v-btn>
    </div>

    <v-sheet
      v-if="isHelpActive"
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

    <v-tabs-window v-model="activeTab">
      <v-window-item value="map">
        <div class="col-span-1 h-[80vh] w-[90vw] rounded-2xl" id="map"></div>
      </v-window-item>

      <v-window-item value="list">
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

            <v-row class="justify-center">
              <v-col
                v-for="(park, index) in isparkData"
                :key="index"
                cols="12"
                sm="6"
              >
                <v-card class="mx-auto" elevation="12" max-width="350">
                  <v-card-item>
                    <v-card-title>{{ park.parkName }}</v-card-title>
                    <v-card-subtitle class="text-wrap"
                      >really really really really really really long open
                      address / {{ park.district }}</v-card-subtitle
                    >
                    <v-divider class="border-opacity-100"></v-divider>
                  </v-card-item>
                  <v-card-text>
                    <p>
                      <span class="font-semibold">{{ park.parkType }}</span>
                      <span class="text-lightText"> . Mevcut Park Alanı: </span>
                      <span class="font-semibold">
                        {{ park.emptyCapacity }}</span
                      >
                    </p>
                    <p>
                      <span
                        :class="park.isOpen ? 'text-success' : 'text-error'"
                        >{{ park.isOpen ? "Açık" : "Kapalı" }}</span
                      >
                      <span class="text-lightText"> . Çalışma Saatleri: </span>
                      <span class="font-semibold">{{ park.workHours }}</span>
                    </p>
                    <p>
                      <span class="text-lightText">Ücretsiz Zaman: </span>
                      <span class="font-semibold"
                        >{{ park.freeTime }} dakika</span
                      >
                    </p>
                    <v-divider v-if="park.driveDistance" class="border-opacity-100"></v-divider>

                    <div v-if="park.driveDistance" class="grid grid-cols-3 mt-4">
                      <div class="col-span-2">
                        <p class="text-lightText">
                          Mesafe: {{ park.driveDistance }}
                        </p>
                        <p class="text-lightText">
                          Tahmini Varış Süresi: {{ park.driveTime }}
                        </p>
                      </div>
                      <div class="col-span-1 flex justify-end align-center">
                        <v-btn
                          icon
                          color="primary"
                          class="flex justify-center align-center"
                        >
                          <v-icon size="2rem">mdi-car-arrow-right</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-window-item>
    </v-tabs-window>
  </div>
</template>

<script setup>
import IsparkHeader from "@/components/IsparkHeader.vue";
import { ref, onMounted, computed } from "vue";
import { useIsparkStore } from "@/stores/isparkStore";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";

const isparkStore = useIsparkStore();
const isHelpActive = ref(false);
const activeTab = ref("map");

const isparkData = computed(() => isparkStore.isparkData?.data || []);

onMounted(() => {
  isparkStore.fetchIsparkData();
  if (activeTab.value === "map") {
    const mapElement = document.getElementById("map");
    if (mapElement) {
      const map = L.map(mapElement).setView([41.024, 29.015], 19);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        minZoom: 15,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      const markerIcon = new L.Icon({
        iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url)
          .href,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
      });

      L.marker([41.024, 29.015], { icon: markerIcon })
        .addTo(map)
        .bindPopup("Üsküdar, Istanbul")
        .openPopup();
    }
  }
});
</script>

<style scoped>
/* #map {
  height: 80vh;
  width: 80vw;
  border-radius: 2rem;
} */
</style>
