<template>
  <div>
    <h1 class="mb-3">Página Inicial</h1>
    <p>Este é um exemplo com layout global e Bootstrap.</p>
    {{ movies?.results[0] }} filmes encontrados.
  </div>
</template>
<script setup lang="ts">
import moviesService from "@/services/Movies/moviesService";

const movies = await moviesService.getMovieList();
</script>