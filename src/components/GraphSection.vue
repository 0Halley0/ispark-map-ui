<template>
  <h2 class="text-center text-7xl font-light mt-96 mb-32">Genel Bakış</h2>
  <v-sheet
    class="p-4 text-cardText text-center mx-auto border-primary border-double border-4 rounded-xl"
    elevation="12"
    rounded="lg"
    width="80%"
  >
    <div class="flex justify-center">
      <p class="font-light text-xl mr-12">
        <v-icon class="mx-2">mdi-rectangle</v-icon>Toplam Park Alanı:
        {{ formatNumber(total) }}
      </p>
      <p class="font-light text-xl mr-12">
        <v-icon class="mx-2 text-[#f4ca0a]">mdi-rectangle</v-icon>Boş Park
        Alanı: {{ formatNumber(emptyTotal) }}
      </p>
      <p class="font-light text-xl mr-12">
        <v-icon class="mx-2 text-[#7d8da5]">mdi-rectangle</v-icon>İlçeler:
        {{ formatNumber(districtsCount) }}
      </p>
      <p class="font-light text-xl mr-12">
        <v-icon class="mx-2 text-[#1b438c]">mdi-rectangle</v-icon>Tüm
        Otoparklar: {{ formatNumber(parkingLotTotal) }}
      </p>
    </div>
  </v-sheet>
  <div class="flex my-16 justify-center gap-28">
    <v-sheet
      class="p-4 text-cardText text-center border-primary border-double border-4 rounded-xl"
      elevation="12"
      rounded="lg"
      width="36%"
    >
      <div class="my-2">
        <v-progress-circular v-if="isLoading" indeterminate color="primary" />
        <p v-if="error" class="text-red-500">{{ error }}</p>
        <p class="font-medium my-12 text-lg">
          Toplam park alanı ile boş park alanının dağılımı.
        </p>
        <Doughnut
          class="mt-8"
          v-if="!isLoading && !error"
          :data="capacityData"
        /></div
    ></v-sheet>
    <v-sheet
      class="p-4 text-cardText text-center border-primary border-double border-4 rounded-xl"
      elevation="12"
      rounded="lg"
      width="36%"
    >
      <div class="my-2">
        <v-progress-circular v-if="isLoading" indeterminate color="primary" />
        <p v-if="error" class="text-red-500">{{ error }}</p>
        <p class="font-medium my-12 text-lg">
          Kayıtlı ilçeler arasındaki boş park alanlarının en yüksekten en düşüğe
          doğru sıralanması.
        </p>
        <PolarArea v-if="!isLoading && !error" :data="polarChartData" /></div
    ></v-sheet>
  </div>

  <v-sheet
    class="p-4 text-cardText text-center mx-auto border-primary border-double border-4 rounded-xl"
    elevation="12"
    rounded="lg"
    width="80%"
  >
    <div class="my-2">
      <v-progress-circular v-if="isLoading" indeterminate color="primary" />
      <p v-if="error" class="text-red-500">{{ error }}</p>
      <p class="font-medium my-12 text-lg">Mahalle bazlı otopark dağılımı.</p>
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
                  `${context.raw.x}: ${context.raw.r * 2} otopark`,
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
  </v-sheet>
</template>

<script setup>
import { onMounted, computed } from "vue";
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

const isparkStore = useIsparkStore();
onMounted(async () => {
  await isparkStore.fetchParkingStatistics();
});

const isLoading = computed(() => isparkStore.isLoading);
const error = computed(() => isparkStore.error);
const total = computed(() => parkingStatistics.value?.totalCapacity ?? 0);
const emptyTotal = computed(
  () => parkingStatistics.value?.totalEmptyCapacity ?? 0
);
const districtsCount = computed(() => {
  return parkingStatistics.value && parkingStatistics.value.districts
    ? Object.keys(parkingStatistics.value.districts).length
    : 0;
});

const parkingLotTotal = computed(
  () => parkingStatistics.value?.totalParkingLots ?? 0
);

const formatNumber = (num) => {
  return new Intl.NumberFormat().format(num);
};
const parkingStatistics = computed(() => isparkStore.parkingStatistics);
const capacityData = computed(() => {
  if (
    !parkingStatistics.value ||
    !parkingStatistics.value.totalCapacity ||
    !parkingStatistics.value.totalEmptyCapacity
  ) {
    return { labels: [], datasets: [] };
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
  if (!parkingStatistics.value || !parkingStatistics.value.districts) {
    return { labels: [], datasets: [] };
  }

  const districts = Object.entries(parkingStatistics.value.districts)
    .map(([name, data]) => ({
      name,
      emptyCapacity: data.emptyCapacity,
    }))
    .sort((a, b) => b.emptyCapacity - a.emptyCapacity)
    .slice(0, 15);

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
  if (!parkingStatistics.value || !parkingStatistics.value.districts) {
    return { datasets: [] };
  }

  const districts = Object.entries(parkingStatistics.value.districts)
    .map(([name, data]) => ({
      name,
      parkingLots: data.parkingLots,
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, 35);

  return {
    datasets: [
      {
        label: "Otopark İçeren Mahalleler",
        data: districts.map((district) => ({
          x: district.name,
          y: district.parkingLots,
          r: Math.min(district.parkingLots / 2),
        })),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };
});
</script>

