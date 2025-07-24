<template>
  <div class="movie-container">
    <TitleComponent>Filmes Populares</TitleComponent>
    <Carrossel :items="movieList.results" :scrollAmount="150" />

    <TitleComponent>Filmes em alta</TitleComponent>
    <Carrossel :items="trendingMovies.results" :scrollAmount="150" />

    <TitleComponent>Filmes mais bem avaliados</TitleComponent>
    <Carrossel :items="topRatedMovies.results" :scrollAmount="150" />

    <TitleComponent>Explore novos Filmes</TitleComponent>
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
        :maxVisible="3"
        :modelValue="discoverMovies.page"
        @page-changed="getDiscoverMovie"
      />
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type IMovieResponse from "~/interfaces/movieResponse";
import moviesService from "~/services/Movies/moviesService";
import { useHead } from "#imports";

useHead({
  title: "Lista de Filmes | TMDB",
  meta: [
    {
      name: "description",
      content: "Descubra os filmes mais populares do momento no TMDB",
    },
    { name: "keywords", content: "filmes populares, TMDB, sinopses, filmes" },
  ],
});

const defaultMovieResponse: IMovieResponse = {
  page: 1,
  results: [],
  total_pages: 1,
  total_results: 0,
};

const movieList = ref<IMovieResponse>({ ...defaultMovieResponse });
const trendingMovies = ref<IMovieResponse>({ ...defaultMovieResponse });
const topRatedMovies = ref<IMovieResponse>({ ...defaultMovieResponse });
const discoverMovies = ref<IMovieResponse>({ ...defaultMovieResponse });

const loadMovies = async () => {
  try {
    const [popular, trending, topRated, discover] = await Promise.all([
      moviesService.getMovieList(),
      moviesService.getTrendingMovies(),
      moviesService.getTopRatedMovies(),
      moviesService.getDiscoverMovie({ page: 1 }),
    ]);

    if (popular) movieList.value = popular;
    if (trending) trendingMovies.value = trending;
    if (topRated) topRatedMovies.value = topRated;
    if (discover) discoverMovies.value = discover;
  } catch (error) {
    console.error("Error loading movies:", error);
  }
};

loadMovies();

const getDiscoverMovie = async (page: number) => {
  const result = await moviesService.getDiscoverMovie({ page });
  if (result) {
    discoverMovies.value = result;
  }
};

watch(
  discoverMovies,
  (newVal) => {
    if (newVal.results.length > 0) {
      const itemListElement = newVal.results
        .map((filme, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `https://seusite.com/filme/${filme.id}`,
          name: filme.title || filme.original_title || "Filme sem título",
          image: filme.poster_path
            ? `https://image.tmdb.org/t/p/w500${filme.poster_path}`
            : undefined,
        }))
        .filter((item) => item.image);

      useHead({
        script: [
          {
            type: "application/ld+json",
            innerHTML: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              itemListElement,
            }),
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/naming-convention
            hid: "ld-json",
          },
        ],
        // Muito importante para scripts com innerHTML:
        __dangerouslyDisableSanitizersByTagID: {
          "ld-json": ["innerHTML"],
        },
      });
    }
  },
  { immediate: true }
);
</script>
<style scoped>
.movie-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}
</style>
