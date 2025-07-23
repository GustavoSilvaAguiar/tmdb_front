<template>
  <div>
    <Navbar expand="lg" background-color="body-tertiary">
      <Container type="fluid">
        <NavbarBrand>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIlRZQfdIMa1D8Wy-cqT3GKpvFdgxDrAq9Eg&s"
            alt="Logo"
            width="30"
            height="30"
        /></NavbarBrand>
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
