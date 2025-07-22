export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const api = $fetch.create({
    baseURL: "https://api.themoviedb.org/3",
    onRequest({ request, options, error }) {
      if (config.public.apiToken) {
        // note that this relies on ofetch >= 1.4.0 - you may need to refresh your lockfile
        options.headers.set(
          "Authorization",
          `Bearer ${config.public.apiToken}`
        );
      }
    },
    async onResponseError({ response }) {
      console.error("Erro API:", response._data);
    },
  });

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api,
    },
  };
});
