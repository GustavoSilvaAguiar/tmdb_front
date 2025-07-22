export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const api = $fetch.create({
    baseURL: "https://api.themoviedb.org/3",
    onRequest({ request, options, error }) {
      if (config.public.apiToken) {
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

  return {
    provide: {
      api,
    },
  };
});
