<template>
  <transition class="sm:hidden" name="fade-slide">
    <v-sheet
      v-if="isGraphActive"
      class="p-4 col-span-1 text-cardText text-center mx-auto"
      elevation="12"
      rounded="lg"
      width="100%"
    >
      <h2 class="text-h5">Genel Bakış</h2>
      <v-carousel
        v-model="activePage"
        color="primary"
        hide-delimiter-background
        :show-arrows="false"
      >
        <v-carousel-item>
          <div class="flex my-2 mt-8">
            <p class="font-light text-xl">
              <v-icon class="mx-2">mdi-rectangle</v-icon>Toplam Park Alanı:
              {{ formatNumber(total) }}
            </p>
          </div>
          <div class="flex my-2">
            <p class="font-light text-xl">
              <v-icon class="mx-2 text-[#f4ca0a]">mdi-rectangle</v-icon>Boş Park
              Alanı: {{ formatNumber(emptyTotal) }}
            </p>
          </div>
          <v-divider class="border-opacity-100 my-2"></v-divider>
          <div class="flex my-2">
            <p class="font-light text-xl">
              <v-icon class="mx-2 text-[#7d8da5]">mdi-rectangle</v-icon>İlçeler:
              {{ formatNumber(districtsCount) }}
            </p>
          </div>
          <div class="flex my-2">
            <p class="font-light text-xl">
              <v-icon class="mx-2 text-[#1b438c]">mdi-rectangle</v-icon>Tüm
              Otoparklar: {{ formatNumber(parkingLotTotal) }}
            </p>
          </div>
          <v-divider class="border-opacity-100 my-2"></v-divider>
        </v-carousel-item>
        <v-carousel-item>
          <div class="my-2">
            <v-progress-circular
              v-if="isLoading"
              indeterminate
              color="primary"
            />
            <p v-if="error" class="text-red-500">{{ error }}</p>
            <p class="font-medium text-lg">
              Toplam park alanı ile boş park alanının dağılımı.
            </p>
            <Doughnut
              class="mt-8"
              v-if="!isLoading && !error"
              :data="capacityData"
            />
          </div>
        </v-carousel-item>
        <v-carousel-item>
          <div class="my-2">
            <v-progress-circular
              v-if="isLoading"
              indeterminate
              color="primary"
            />
            <p v-if="error" class="text-red-500">{{ error }}</p>
            <p class="font-medium text-lg">
              Kayıtlı ilçeler arasındaki boş park alanlarının en yüksekten en
              düşüğe doğru sıralanması.
            </p>
            <PolarArea v-if="!isLoading && !error" :data="polarChartData" />
          </div>
        </v-carousel-item>
        <v-carousel-item>
          <div class="my-2">
            <v-progress-circular
              v-if="isLoading"
              indeterminate
              color="primary"
            />
            <p v-if="error" class="text-red-500">{{ error }}</p>
            <p class="font-medium text-lg">Mahalle bazlı otopark dağılımı.</p>
            <Bubble
              class="mt-8"
              v-if="!isLoading && !error && bubbleChartData"
              :data="bubbleChartData"
              :options="{
                responsive: true,
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: (context) =>
                        `${context.raw.x}: ${(context.raw.r)*10} otopark`,
                    },
                  },
                },
                scales: {
                  x: {
                    type: 'category',
                    title: {
                      display: true,
                      text: 'Mahalle Adı',
                    },
                    ticks: {
                      autoSkip: false,
                      maxRotation: 90,
                      minRotation: 45,
                    },
                  },
                  y: {
                    type: 'linear',
                    display: true,
                    title: {
                      display: true,
                      text: 'Otopark Sayısı',
                    },
                    min: 0,
                  },
                },
              }"
            />
          </div>
        </v-carousel-item>
      </v-carousel>
    </v-sheet>
  </transition>
</template>
<script setup>
import { defineProps, onMounted, computed, ref } from "vue";
import { useIsparkStore } from "@/stores/isparkStore";
import { Doughnut, PolarArea, Bubble } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BubbleController,
  RadialLinearScale,
  PointElement,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BubbleController,
  RadialLinearScale,
  PointElement
);

defineProps({
  isGraphActive: Boolean,
});
const isparkStore = useIsparkStore();
onMounted(() => {
  isparkStore.fetchParkingStatistics();
});
const isLoading = computed(() => isparkStore.isLoading);
const error = computed(() => isparkStore.error);
const activePage = ref(0);
const total = computed(() => parkingStatistics.value.totalCapacity);
const emptyTotal = computed(() => parkingStatistics.value.totalEmptyCapacity);
const districtsCount = computed(
  () => Object.keys(parkingStatistics.value.districts).length
);
const parkingLotTotal = computed(
  () => parkingStatistics.value.totalParkingLots
);
const formatNumber = (num) => {
  return new Intl.NumberFormat().format(num);
};
const parkingStatistics = computed(() => isparkStore.parkingStatistics);
const capacityData = computed(() => {
  if (!parkingStatistics.value || !parkingStatistics.value.totalCapacity) {
    return null;
  }

  return {
    labels: ["Toplam Park Alanı", "Boş Park Alanı"],
    datasets: [
      {
        label: "Park Alanı",
        data: [
          parkingStatistics.value.totalCapacity || 0,
          parkingStatistics.value.totalEmptyCapacity || 0,
        ],
        backgroundColor: ["#040404", "#f4ca0a"],
        hoverOffset: 4,
      },
    ],
  };
});
const polarChartData = computed(() => {
  const districts = Object.entries(parkingStatistics.value.districts)
    .map(([name, data]) => ({
      name,
      emptyCapacity: data.emptyCapacity,
    }))
    .sort((a, b) => b.emptyCapacity - a.emptyCapacity)
    .slice(0, 8);

  const labels = districts.map((district) => district.name);
  const data = districts.map((district) => district.emptyCapacity);

  return {
    labels,
    datasets: [
      {
        label: "Boş Kapasite",
        data,
        backgroundColor: labels.map(
          () => `hsl(${Math.random() * 360}, 70%, 70%, 0.8)`
        ),
        hoverOffset: 4,
      },
    ],
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
      },
      scales: {
        r: {
          ticks: {
            display: true,
            beginAtZero: true,
          },
        },
      },
    },
  };
});
const bubbleChartData = computed(() => {
  const districts = Object.entries(parkingStatistics.value.districts)
    .map(([name, data]) => ({
      name,
      parkingLots: data.parkingLots,
    }))
    .sort((a, b) => b.parkingLots - a.parkingLots)
    .slice(0, 10);

  return {
    datasets: [
      {
        label: "En Fazla Otopark İçeren 10 Mahalle",
        data: districts.map((district) => ({
          x: district.name,
          y: district.parkingLots,
          r: Math.min(district.parkingLots /10, 50),
        })),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };
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
