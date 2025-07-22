<template>
  <div
    class="movie-card"
    :class="{ 'is-favorite': isFavorite }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="poster-container">
      <img
        :src="`https://image.tmdb.org/t/p/w200${filme.poster_path}`"
        :alt="filme.title"
        class="poster-image"
        loading="lazy"
      />

      <button
        class="favorite-button"
        @click.stop="toggleFavorite"
        aria-label="Marcar como favorito"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            v-if="isFavorite"
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
          <path
            v-else
            d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"
          />
        </svg>
      </button>

      <div class="movie-info" :class="{ visible: isMobile || isHovered }">
        <div class="info-backdrop"></div>
        <div class="info-content">
          <h3 class="movie-title">{{ filme.title }}</h3>
          <div class="movie-genres">
            <span v-for="(genero, index) in filme.genre_ids" :key="index">
              {{ genero
              }}<span v-if="index < filme.genre_ids.length - 1">, </span>
            </span>
          </div>
          <div class="movie-rating">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              />
            </svg>
            <span>{{ filme.vote_average }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import type IMovie from "~/interfaces/movieInterface";

const props = defineProps<{ filme: IMovie; initialFavorite: boolean }>();

const emit = defineEmits(["toggle-favorite"]);

const isHovered = ref(false);
const isFavorite = ref(props.initialFavorite);
const isMobile = ref(false);

const checkIfMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

const toggleFavorite = (event: any) => {
  event.preventDefault();
  isFavorite.value = !isFavorite.value;
  emit("toggle-favorite", { id: props.filme.id, favorite: isFavorite.value });
};

onMounted(() => {
  checkIfMobile();
  window.addEventListener("resize", checkIfMobile);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkIfMobile);
});
</script>

<style scoped>
.movie-card {
  --card-width: 150px;
  --card-height: calc(var(--card-width) * 1.5);
  --hover-elevation: 10px;
  --transition-speed: 0.3s;
  --blur-intensity: 8px;
  --favorite-color: #ff4081;

  width: var(--card-width);
  height: var(--card-height);
  perspective: 1000px;
  position: relative;
  margin: 0 auto;
  cursor: pointer;
}

.poster-container {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform var(--transition-speed) ease;
}

.movie-card:hover .poster-container {
  transform: translateZ(var(--hover-elevation)) rotateX(5deg);
}

.poster-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  transition: all var(--transition-speed) ease;
}

.movie-card:hover .poster-image {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
}

.favorite-button {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.7);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  transition: all var(--transition-speed) ease;
}

.favorite-button svg {
  width: 18px;
  height: 18px;
  fill: white;
  transition: all var(--transition-speed) ease;
}

.favorite-button:hover {
  background: rgba(0, 0, 0, 0.9);
  transform: scale(1.1);
}

.is-favorite .favorite-button svg {
  fill: var(--favorite-color);
}

.movie-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px;
  border-radius: 0 0 8px 8px;
  overflow: hidden;
  transition: all var(--transition-speed) ease;
  opacity: 0;
  transform: translateY(10px);
}

.movie-info.visible {
  opacity: 1;
  transform: translateY(0);
}

.info-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(var(--blur-intensity));
  z-index: 1;
}

.info-content {
  position: relative;
  z-index: 2;
  color: white;
}

.movie-title {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.movie-genres {
  font-size: 12px;
  opacity: 0.9;
  margin-bottom: 4px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.movie-rating {
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
}

.movie-rating svg {
  width: 14px;
  height: 14px;
  fill: #ffd700;
  margin-right: 4px;
}

/* Estilos para mobile */
@media (max-width: 768px) {
  .movie-card {
    --card-width: 120px;
  }

  .movie-info {
    opacity: 1;
    transform: translateY(0);
  }

  .movie-title {
    font-size: 12px;
  }

  .movie-genres {
    font-size: 10px;
  }
}

/* Estilos para desktop */
@media (min-width: 769px) {
  .movie-card {
    --card-width: 180px;
  }
}
</style>
