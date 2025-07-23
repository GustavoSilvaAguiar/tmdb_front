// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["usebootstrap", "@pinia/nuxt"],
  runtimeConfig: {
    public: {
      apiToken: process.env.TMDB_API_TOKEN || "",
    },
  },
  image: {},
});
