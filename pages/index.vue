<template>
  <div>
    <title>teste</title>
    <h1 class="mb-3">Filmes Populares</h1>
    <Carrossel :items="movieList.results" :scrollAmount="150" />

    <h1 class="mb-3">Filmes em alta</h1>
    <Carrossel :items="trendingMovies.results" :scrollAmount="150" />

    <h1 class="mb-3">Filmes mais bem avaliados</h1>
    <Carrossel :items="topRatedMovies.results" :scrollAmount="150" />

    <h1>Filmes</h1>
    <Container>
      <Row>
        <Col v-for="(filme, index) in discoverMovies.results" :key="index">
          <CardFilme :filme="filme" class="mb-4" />
        </Col>
      </Row>
    </Container>

    <nav aria-label="Page navigation example">
      <PaginationComponent
        :totalPages="
          discoverMovies.total_pages <= 500 ? discoverMovies.total_pages : 500
        "
        :maxVisible="5"
        :modelValue="discoverMovies.page"
        @page-changed="getDiscoverMovie"
      />
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type IMovieResponse from "~/interfaces/movieResponse";
import moviesService from "~/services/Movies/moviesService";

// Defina um valor padrão para IMovieResponse
const defaultMovieResponse: IMovieResponse = {
  page: 1,
  results: [],
  total_pages: 1,
  total_results: 0,
};

// Inicialize as refs com o valor padrão
const movieList = ref<IMovieResponse>({ ...defaultMovieResponse });
const trendingMovies = ref<IMovieResponse>({ ...defaultMovieResponse });
const topRatedMovies = ref<IMovieResponse>({ ...defaultMovieResponse });
const discoverMovies = ref<IMovieResponse>({ ...defaultMovieResponse });

// Função para carregar os dados de forma segura
const loadMovies = async () => {
  try {
    const [popular, trending, topRated, discover] = await Promise.all([
      moviesService.getMovieList(),
      moviesService.getTrendingMovies(),
      moviesService.getTopRatedMovies(),
      moviesService.getDiscoverMovie({ page: 1 }),
    ]);

    // Atribua os valores apenas se não forem null
    if (popular) movieList.value = popular;
    if (trending) trendingMovies.value = trending;
    if (topRated) topRatedMovies.value = topRated;
    if (discover) discoverMovies.value = discover;
  } catch (error) {
    console.error("Error loading movies:", error);
    // Mantém os valores padrão em caso de erro
  }
};

// Carrega os filmes
loadMovies();

const getDiscoverMovie = async (page: number) => {
  console.log("esta chamando", page);
  const result = await moviesService.getDiscoverMovie({ page });
  if (result) {
    discoverMovies.value = result;
  }
};
</script>
