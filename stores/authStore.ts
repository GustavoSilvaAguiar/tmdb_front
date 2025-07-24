import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAuthStore = defineStore("authStore", () => {
  const userCookie = useCookie<{ email: string; password: string } | null>(
    "ymdb_user"
  );
  const user = ref<{ email: string; password: string } | null>(
    userCookie.value || null
  );

  const favoritoStore = useFavoritosStore();

  const isAuthenticated = computed(() => !!user.value);

  function setUser(userData: { email: string; password: string }) {
    user.value = userData;
    userCookie.value = userData; 
  }

  function logout() {
    user.value = null;
    userCookie.value = null
    window.location.reload()
  }

  return { user, isAuthenticated, setUser, logout };
});
