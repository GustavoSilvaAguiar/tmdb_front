<template>
  <div class="login-containerr">
    <b-button
      icon="bi:arrow-left-circle-fill"
      icon-start
      class="btn btn-primary button_class"
      @click="navigateTo('/')"
    >
      Tela Inicial
    </b-button>
    <span class="login_card">
      <h1>Login</h1>
      <b-form-label for="email">Email</b-form-label>
      <b-form-input
        type="email"
        id="email"
        placeholder="Email"
        v-model="loginPayload.email"
      />
      <b-form-label for="password">Senha</b-form-label>
      <b-form-input
        type="password"
        id="password"
        placeholder="Senha"
        v-model="loginPayload.password"
      />
      <b-button
        class="login_btn"
        @click="login"
        icon="bi:box-arrow-in-right"
        icon-end
        color="primary"
        >Entrar</b-button
      >
      <b-button class="login_btn" icon="bi:person-plus" icon-end color="warning"
        >Criar Conta</b-button
      >
    </span>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useAuthStore } from "~/stores/authStore";
definePageMeta({
  layout: "blank",
});

const authStore = useAuthStore();

const loginPayload = ref<{ email: string; password: string }>({
  email: "",
  password: "",
});

function login() {
  authStore.setUser(loginPayload.value);
  navigateTo("/");
}
</script>
<style scoped>
.login-containerr {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login_card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.button_class {
  position: absolute;
  top: 3%;
  left: 3%;
}

.login_btn {
  margin-top: 10px;
  width: 100%;
}

@media (min-width: 768px) {
  .login_card {
    width: 400px;
  }
}

@media (min-width: 992px) {
  .login_card {
    width: 500px;
  }
}
</style>
