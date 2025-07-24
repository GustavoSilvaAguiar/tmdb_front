// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport:
        "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
      title: "Cine Explorer | Filmes e Séries em Destaque",
      meta: [
        {
          name: "description",
          content:
            "Descubra os filmes e séries mais populares, melhor avaliados e em alta. Veja avaliações, sinopses, elenco e trailers dos lançamentos do cinema e TV.",
        },
        {
          name: "keywords",
          content:
            "filmes, séries, cinema, TMDB, avaliações, críticas, lançamentos, populares, melhor avaliados, elenco, sinopse, trailers",
        },
        // Open Graph / Facebook
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://tmdb-front.vercel.app/" },
        {
          property: "og:title",
          content: "Cine Explorer | Filmes e Séries em Destaque",
        },
        {
          property: "og:description",
          content:
            "Descubra os filmes e séries mais populares e melhor avaliados do momento",
        },
        {
          property: "og:image",
          content: "https://tmdb-front.vercel.app/",
        },

        // Apple/Safari
        { name: "apple-mobile-web-app-title", content: "Cine Explorer" },
        { name: "application-name", content: "Cine Explorer" },
        { name: "theme-color", content: "#0f172a" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
      ],
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Cine Explorer",
            url: "https://tmdb-front.vercel.app/",
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://tmdb-front.vercel.app/detail?id={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        },
      ],
    },
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["usebootstrap", "@pinia/nuxt", "@nuxt/test-utils/module"],
  runtimeConfig: {
    public: {
      apiToken: process.env.TMDB_API_TOKEN || "",
    },
  },
  image: {},
  css: ["~/assets/css/main.css"],
});
