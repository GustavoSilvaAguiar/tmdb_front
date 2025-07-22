import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAuthStore = defineStore("authStore", () => {
  // Cookie para persistir o usuário (funciona SSR + Client)
  const userCookie = useCookie<{ email: string; password: string } | null>("ymdb_user");
  const user = ref<{ email: string; password: string } | null>(userCookie.value || null);

  // Getter para verificar se está autenticado
  const isAuthenticated = computed(() => !!user.value);

  function setUser(userData: { email: string; password: string }) {
    user.value = userData;
    userCookie.value = userData; // salva no cookie
  }

  function logout() {
    user.value = null;
    userCookie.value = null; // remove cookie
  }

  return { user, isAuthenticated, setUser, logout };
});
