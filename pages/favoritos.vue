<template>
  <div class="movie-container">
    <TitleComponent>Favoritos</TitleComponent>
    <Container>
      <Row>
        <Col v-for="(filme, index) in filmesFavoritos" :key="index">
          <CardFilme :filme="filme" class="mb-4"
        /></Col>
      </Row>
    </Container>
  </div>
</template>

<script setup lang="ts">
import CardFilme from "~/components/cardFilme.vue";

definePageMeta({
  middleware: "auth",
});
const favoritosStore = useFavoritosStore();
const filmesFavoritos = favoritosStore.filmesFavoritos;
</script>

<style scoped>
.movie-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}
</style>
