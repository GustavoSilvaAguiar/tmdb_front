import { ref, watch } from "vue";
import { defineStore } from "pinia";
import type IMovie from "~/interfaces/movieInterface";

export const useFavoritosStore = defineStore("favoritoStore", () => {
  const auth = useAuthStore();
  const filmesFavoritos = ref<IMovie[]>([]);

  function loadFavoritos(email?: string) {
    if (!email) {
      filmesFavoritos.value = [];
      return;
    }
    const data = localStorage.getItem(`favoritos_${email}`);
    filmesFavoritos.value = data ? JSON.parse(data) : [];
  }

  function saveFavoritos() {
    const email = auth.user?.email;
    if (email) {
      localStorage.setItem(
        `favoritos_${email}`,
        JSON.stringify(filmesFavoritos.value)
      );
    }
  }

  watch(
    () => auth.user?.email,
    (email) => loadFavoritos(email),
    { immediate: true }
  );

  function addFilmeFavorito(data: IMovie) {
    if (!findFilmeFavorito(data)) {
      filmesFavoritos.value.push(data);
      saveFavoritos();
    }
  }

  function removeFilmeFavorito(data: IMovie) {
    filmesFavoritos.value = filmesFavoritos.value.filter(
      (filme) => filme.id !== data.id
    );
    saveFavoritos();
  }

  function clearFilmeFavorito() {
    filmesFavoritos.value = [];
    saveFavoritos();
  }

  function findFilmeFavorito(data: IMovie): boolean {
    return filmesFavoritos.value.some((filme) => filme.id === data.id);
  }

  return {
    filmesFavoritos,
    addFilmeFavorito,
    removeFilmeFavorito,
    findFilmeFavorito,
    clearFilmeFavorito,
  };
});
