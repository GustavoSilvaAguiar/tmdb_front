<template>
  <h1 class="mb-4 mr-4">Favoritos</h1>
  <Container>
    <Row>
      <Col v-for="(filme, index) in filmesFavoritos" :key="index">
        <CardFilme :filme="filme" class="mb-4"
      /></Col>
    </Row>
  </Container>
  
</template>

<script setup lang="ts">
import CardFilme from "~/components/cardFilme.vue";

definePageMeta({
  middleware: "auth",
});
const favoritosStore = useFavoritosStore();
const filmesFavoritos = favoritosStore.filmesFavoritos;
</script>

<style scoped></style>
