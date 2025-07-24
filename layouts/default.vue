<template>
  <div>
    <Navbar expand="lg" background-color="body-tertiary">
      <Container type="fluid">
        <NavbarBrand>
          <NuxtImg
            src="../public/cinema-sobre-fundo.png"
            alt="Logo"
            quality="80"
            loading="lazy"
            width="50"
            height="50"
            placeholder="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iNDUwIiB2aWV3Qm94PSIwIDAgMzAwIDQ1MCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2VlZWVlZSIgLz48L3N2Zz4="
          />
        </NavbarBrand>
        <NavbarToggler />
        <NavbarCollapse>
          <NavbarNavList margin="e-auto b-2 b-lg-0" scroll>
            <NavItem>
              <NavLink active to="/"> Home </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/favoritos">Favoritos</NavLink>
            </NavItem>
            <NavItem v-if="!authStore.isAuthenticated">
              <NavLink to="/login">Login</NavLink>
            </NavItem>
            <NavItem v-else>
              <NavLink @click="logout">Logout</NavLink>
            </NavItem>
          </NavbarNavList>
        </NavbarCollapse>
      </Container>
    </Navbar>

    <main>
      <div>
        <NuxtPage />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const logout = () => {
  authStore.logout();
  navigateTo("/");
};
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
}
</style>
