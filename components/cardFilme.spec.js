import { describe, it, expect, beforeEach, vi } from "vitest";
import cardFilme from "./cardFilme.vue";
import { useTestWrapper } from "~/test/useTestWrapper";

describe("CardFilme", () => {
  const { mountComponent } = useTestWrapper();

  let wrapper;

  beforeEach(async () => {
    
    wrapper = await mountComponent(cardFilme, {
      props: {
        filme: {
          adult: false,
          backdrop_path: "/s94NjfKkcSczZ1FembwmQZwsuwY.jpg",
          genre_ids: [878, 12],
          id: 617126,
          original_language: "en",
          original_title: "The Fantastic Four: First Steps",
          overview:
            'Com o vibrante cenário de um mundo retrô-futurista inspirado nos anos 1960, "O Quarteto Fantástico: Primeiros Passos" apresenta a Primeira Família da Marvel - Reed Richards/Senhor Fantástico, Sue Storm/Mulher Invisível, Johnny Storm/Tocha Humana e Ben Grimm/O Coisa enquanto eles enfrentam seu desafio mais assustador até agora. Forçados a equilibrar seus papéis como heróis com a força de seus laços familiares, eles devem defender a Terra de um deus espacial voraz chamado Galactus (Ralph Ineson) e seu enigmático Arauto, Surfista Prateado (Julia Garner). E se o plano de Galactus de devorar o planeta inteiro e todos nele não fosse ruim o suficiente, de repente fica muito pessoal.',
          popularity: 142.134,
          poster_path: "/27ZUQLmhbJMSmfI1gIBWA4z1vQg.jpg",
          release_date: "2025-07-23",
          title: "Quarteto Fantástico: Primeiros Passos",
          video: false,
          vote_average: 6.143,
          vote_count: 28,
        },
      },
    });
  });

  it("should mount the component", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should render de title", () => {
    const title = wrapper.find("[data-testid='filme_title']");
    expect(title.text()).toBe("Quarteto Fantástico: Primeiros Passos");
  });

});
