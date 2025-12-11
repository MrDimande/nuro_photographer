/**
 * Editorial Gallery Data
 * 
 * Visual narrative structure - not a grid, but a story.
 * Each item has its own rhythm and breathing space.
 * 
 * Images organized in:
 * - /src/assets/images/hero/
 * - /src/assets/images/portraits/
 * - /src/assets/images/lifestyle/
 * - /src/assets/images/events/
 * - /src/assets/images/projects/
 */

// Import images from assets for bundling optimization
// Using public folder paths for now (Vite serves public as root)

export const editorialGallery = [
  // ═══════════════════════════════════════════════════════════════
  // CHAPTER 1: OPENING - Grande impacto visual
  // ═══════════════════════════════════════════════════════════════
  {
    id: 1,
    type: "image",
    size: "hero",
    src: "/560443130_18404954137184208_1879493367801025117_n.jpg",
    alt: "Visual Poetry - Opening",
    speed: 0.08,
    position: "center",
  },
  {
    id: 2,
    type: "text",
    text: "Fotografia como linguagem silenciosa.",
    align: "center",
    lightSweep: true,
  },

  // ═══════════════════════════════════════════════════════════════
  // CHAPTER 2: PORTRAITS - Rostos de luz
  // ═══════════════════════════════════════════════════════════════
  {
    id: 3,
    type: "image",
    size: "large",
    src: "/560914308_18404954155184208_4058324071045245347_n.jpg",
    alt: "Portrait - Natural Light",
    speed: 0.12,
    position: "left",
  },
  {
    id: 4,
    type: "text",
    text: "Entre a luz e a sombra, nasce a verdade.",
    align: "right",
  },
  {
    id: 5,
    type: "image",
    size: "medium",
    src: "/561130094_18404954173184208_1604440133301537245_n.jpg",
    alt: "Portrait - Dramatic Shadows",
    speed: 0.18,
    position: "right",
  },
  {
    id: 6,
    type: "image",
    size: "small",
    src: "/561167630_18404954146184208_2809576874514623855_n.jpg",
    alt: "Portrait - Editorial",
    speed: 0.25,
    position: "left",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHAPTER 3: FULL IMMERSION
  // ═══════════════════════════════════════════════════════════════
  {
    id: 7,
    type: "image",
    size: "fullscreen",
    src: "/561181985_18404954164184208_5407017860984878282_n.jpg",
    alt: "Full Immersion",
    speed: 0.06,
    caption: "Onde a visão encontra a realidade",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHAPTER 4: DUALITY - Duas perspectivas
  // ═══════════════════════════════════════════════════════════════
  {
    id: 8,
    type: "diptych",
    images: [
      {
        src: "/561643629_18404954182184208_2493885912661405593_n.jpg",
        alt: "Duality - Left",
      },
      {
        src: "/562506426_18405201763184208_4373451680143518619_n.jpg",
        alt: "Duality - Right",
      },
    ],
    speed: 0.15,
  },
  {
    id: 9,
    type: "text",
    text: "Dois lados da mesma história.",
    align: "center",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHAPTER 5: THE CRAFT - A Arte
  // ═══════════════════════════════════════════════════════════════
  {
    id: 10,
    type: "image",
    size: "large",
    src: "/562561202_18405201679184208_8445742481536646510_n.jpg",
    alt: "The Craft",
    speed: 0.1,
    position: "right",
  },
  {
    id: 11,
    type: "text",
    text: "A arte de ver o invisível.",
    align: "left",
    lightSweep: true,
  },
  {
    id: 12,
    type: "image",
    size: "medium",
    src: "/562788130_18405201727184208_6988509653949574672_n.jpg",
    alt: "Visual Narrative",
    speed: 0.2,
    position: "left",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHAPTER 6: QUIET MOMENTS - Momentos silenciosos
  // ═══════════════════════════════════════════════════════════════
  {
    id: 13,
    type: "image",
    size: "small",
    src: "/527444076_18396844189184208_6840884165713361988_n.jpg",
    alt: "Quiet Moment",
    speed: 0.3,
    position: "right",
  },
  {
    id: 14,
    type: "image",
    size: "fullscreen",
    src: "/527510445_18396844174184208_2859515816573133558_n.jpg",
    alt: "Full Immersion - Lifestyle",
    speed: 0.05,
    caption: "No silêncio, as histórias respiram",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHAPTER 7: HERITAGE - Herança
  // ═══════════════════════════════════════════════════════════════
  {
    id: 15,
    type: "text",
    text: "Cada frame guarda séculos de histórias sussurradas.",
    align: "center",
    lightSweep: true,
  },
  {
    id: 16,
    type: "image",
    size: "large",
    src: "/550942850_18402487996184208_2384939623492755185_n.jpg",
    alt: "Heritage",
    speed: 0.12,
    position: "center",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHAPTER 8: EVENTS - Eventos
  // ═══════════════════════════════════════════════════════════════
  {
    id: 17,
    type: "diptych",
    images: [
      {
        src: "/490543632_18382917580184208_9214427187958563830_n.jpg",
        alt: "Event - Moment 1",
      },
      {
        src: "/491443505_18382917598184208_8324092881977330642_n.jpg",
        alt: "Event - Moment 2",
      },
    ],
    speed: 0.18,
  },

  // ═══════════════════════════════════════════════════════════════
  // CHAPTER 9: PROJECTS - Projectos artísticos
  // ═══════════════════════════════════════════════════════════════
  {
    id: 18,
    type: "image",
    size: "medium",
    src: "/536981337_18398961817184208_757924853193279845_n.jpg",
    alt: "Project - Artistic 1",
    speed: 0.15,
    position: "left",
  },
  {
    id: 19,
    type: "image",
    size: "small",
    src: "/537421951_18398961856184208_4790026944126573178_n.jpg",
    alt: "Project - Artistic 2",
    speed: 0.22,
    position: "right",
  },

  // ═══════════════════════════════════════════════════════════════
  // FINALE - Conclusão
  // ═══════════════════════════════════════════════════════════════
  {
    id: 20,
    type: "diptych",
    images: [
      {
        src: "/551070863_18402488014184208_7028793901860694415_n.jpg",
        alt: "Finale - Left",
      },
      {
        src: "/551092397_18402488044184208_7363554522633830121_n.jpg",
        alt: "Finale - Right",
      },
    ],
    speed: 0.18,
  },
  {
    id: 21,
    type: "text",
    text: "Disponível mundialmente. Baseado em Lisboa.",
    align: "center",
    lightSweep: true,
  },
]

export default editorialGallery
