<template>
  <div class="carousel-wrapper">
    <button
      class="nav-arrow left"
      @click="scrollTo('left')"
      aria-label="Scroll para esquerda"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
      </svg>
    </button>

    <div class="horizontal-scroll-container" ref="scrollContainer">
      <div class="scroll-content" ref="scrollContent">
        <div v-for="(item, index) in items" :key="index">
          <CardFilme :filme="item"></CardFilme>
        </div>
      </div>
    </div>

    <button
      class="nav-arrow right"
      @click="scrollTo('right')"
      aria-label="Scroll para direita"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
      </svg>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import type IMovie from "~/interfaces/movieInterface";

const props = defineProps<{ items: IMovie[]; scrollAmount: Number }>();

const scrollContainer = ref();
const scrollContent = ref();

const scrollTo = (direction: any) => {
  if (!scrollContainer.value) return;

  const container = scrollContainer.value;
  const currentScroll = container.scrollLeft;
  const maxScroll = container.scrollWidth - container.clientWidth;
  const cardWidth = props.scrollAmount;

  if (direction === "left") {
    if (currentScroll <= 0) {
      // Se estiver no início, vai para o final
      container.scrollTo({ left: maxScroll, behavior: "smooth" });
    } else {
      container.scrollBy({ left: -cardWidth, behavior: "smooth" });
    }
  } else {
    if (currentScroll >= maxScroll - 10) {
      // 10px de margem para arredondamentos
      // Se estiver no final, vai para o início
      container.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      container.scrollBy({ left: cardWidth, behavior: "smooth" });
    }
  }
};

onMounted(() => {
  // Configura scroll suave
  if (scrollContainer.value) {
    scrollContainer.value.style.scrollBehavior = "smooth";
  }
});
</script>

<style scoped>
.carousel-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
}

.horizontal-scroll-container {
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  height: 320px;
}

.horizontal-scroll-container::-webkit-scrollbar {
  display: none;
}

.scroll-content {
  display: flex;
  gap: 10px;
}

.nav-arrow {
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
  z-index: 1;
}

.nav-arrow:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: scale(1.1);
}

.nav-arrow svg {
  width: 24px;
  height: 24px;
}

.nav-arrow.left {
  margin-right: -20px;
}

.nav-arrow.right {
  margin-left: -20px;
}

@media (max-width: 768px) {
  .horizontal-scroll-container {
    height: 220px;
  }

  .nav-arrow {
    width: 32px;
    height: 32px;
  }

  .nav-arrow svg {
    width: 20px;
    height: 20px;
  }
}
</style>
