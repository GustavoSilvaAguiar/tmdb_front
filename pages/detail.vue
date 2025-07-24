<template>
  <div class="movie-detail-container">
    <div class="movie-content-wrapper">
      <NuxtImg
        :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
        :alt="`Poster do filme ${movie.title}`"
        class="poster-image"
        format="webp"
        quality="80"
        loading="lazy"
        placeholder="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iNDUwIiB2aWV3Qm94PSIwIDAgMzAwIDQ1MCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2VlZWVlZSIgLz48L3N2Zz4="
        provider="ipx"
      />

      <div class="movie-text-content">
        <h1 class="movie-title">{{ movie.title }}</h1>
        <div class="genres-container">
          <span
            v-for="(genre, index) in movie.genres"
            :key="genre.id"
            class="genre-tag"
          >
            {{ genre.name
            }}
          </span>
        </div>

        <h3 class="section-title">Sinopse</h3>
        <p class="movie-overview">{{ movie.overview }}</p>

        <h3 class="section-title">Data de Lançamento</h3>
        <p>{{ formatDate(movie.release_date) }}</p>

        <h3 class="section-title">Nota</h3>
        <div>{{ movie.vote_average }}</div>
      </div>
      
    </div>
    <h3 class="section-title mb-3">Similares</h3>
      <Carrossel :items="similarMovie.results" :scrollAmount="150" />
  </div>
</template>

<script lang="js" setup>
import moviesService from "~/services/Movies/moviesService";

const route = useRoute();
const id = ref(route.query.id);

if (!id.value) {
  showError({ statusCode: 400, message: "ID do filme não fornecido" });
}

const movie = await moviesService.getMovieDetails(id.value);
const similarMovie = await moviesService.getSimilarMovies(id.value);

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('pt-BR')
}
</script>

<style scoped>
.movie-detail-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.movie-content-wrapper {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.poster-image {
  width: 300px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  flex-shrink: 0;
}

.movie-text-content {
  flex: 1;
}

.movie-title {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 2rem;
  color: #f5c518;
}

.section-title {
  margin: 1.5rem 0 0.5rem;
  font-size: 1.3rem;
  color: #f5c518;
}

.movie-overview {
  line-height: 1.6;
  margin-bottom: 1rem;
}

.genres-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.genre-tag {
  background: rgba(245, 197, 24, 0.2);
  color: #f5c518;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .movie-content-wrapper {
    flex-direction: column;
    gap: 1.5rem;
  }

  .poster-image {
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }
}
</style>
