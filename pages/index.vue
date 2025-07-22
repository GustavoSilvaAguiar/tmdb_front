<template>
  <div>
    <title>teste</title>
    <h1 class="mb-3">Filmes Populares</h1>
    <Carrossel :items="movies?.results ?? []" :scrollAmount="150" />

    <h1 class="mb-3">Filmes em alta</h1>
    <Carrossel :items="trendingMovies?.results ?? []" :scrollAmount="150" />

    <h1 class="mb-3">Filmes mais bem avaliados</h1>
    <Carrossel :items="topRatedMovies?.results ?? []" :scrollAmount="150" />
  </div>
</template>

<script setup lang="ts">
import moviesService from "@/services/Movies/moviesService";
import type IMovieResponse from "~/interfaces/movieResponse";

const movies = (await moviesService.getMovieList()) ?? { results: [] } as unknown as IMovieResponse;
const trendingMovies = (await moviesService.getTrendingMovies()) ?? { results: [] } as unknown as IMovieResponse;
const topRatedMovies = (await moviesService.getTopRatedMovies()) ?? { results: [] } as unknown as IMovieResponse;
</script>
