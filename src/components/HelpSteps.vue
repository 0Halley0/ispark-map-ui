<template>
  <div class="mt-16 grid grid-cols-5 bg-cardBackground w-screen">
    <div class="flex my-32 mx-16 col-span-3 gap-4 slide-up">
      <v-icon
        color="primary"
        size="80"
        icon="mdi-numeric-1-circle-outline"
      ></v-icon>
      <span class="text-left text-4xl font-light">
        Harita üzerindeki
        <v-icon color="primary" icon="mdi-car-brake-parking" size="40"></v-icon>
        ikonlarına tıklayarak otopark detaylarını görüntüleyin.
      </span>
    </div>

    <div class="flex my-32 mx-16 col-span-3 col-start-3 gap-4 justify-end slide-up">
      <span class="text-right text-4xl font-light">
        Harita üzerindeki numara (<v-icon
          color="primary"
          icon="mdi-numeric-4-circle"
          size="30"
        ></v-icon
        >) ikonlarına tıklayarak civardaki otoparkları görüntüleyin.
      </span>
      <v-icon
        color="primary"
        size="80"
        icon="mdi-numeric-2-circle-outline"
      ></v-icon>
    </div>

    <div class="flex my-32 mx-16 col-span-3 gap-4 slide-up">
      <v-icon
        color="primary"
        size="80"
        icon="mdi-numeric-3-circle-outline"
      ></v-icon>
      <span class="text-left text-4xl font-light">
        Filtre (<v-icon
          color="primary"
          icon="mdi-filter-outline"
          size="30"
        ></v-icon
        >) tuşuna tıklayarak otoparkları doluluk durumuna, çalışma saatlerine ve
        ücretlendirme bilgilerinie göre filtreleyin.
      </span>
    </div>

    <div class="flex my-32 mx-16 col-span-3 col-start-3 gap-4 justify-end slide-up">
      <span class="text-right text-4xl font-light">
        Konum (<v-icon
          color="primary"
          icon="mdi-crosshairs-gps"
          size="30"
        ></v-icon
        >) tuşuna tıklayarak mevcut konumunuzu bulun ve en yakın otoparkları
        arayın.
      </span>
      <v-icon
        color="primary"
        size="80"
        icon="mdi-numeric-4-circle-outline"
      ></v-icon>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  const slideElements = document.querySelectorAll('.slide-up');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('slide-up-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5,
  });

  slideElements.forEach((element) => {
    observer.observe(element);
  });
});
</script>


<style scoped>
.slide-up {
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.slide-up-visible {
  opacity: 1;
  transform: translateY(0);
}

</style>
