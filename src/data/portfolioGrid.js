/**
 * Portfolio Data - Complete Media Organization
 * 
 * All photos from public folder organized by category
 */

export const portfolioCategories = [
  { id: 'all', label: 'Todos', count: 0 },
  { id: 'retratos', label: 'Retratos', count: 0 },
  { id: 'formaturas', label: 'Formaturas', count: 0 },
  { id: 'casamentos', label: 'Casamentos', count: 0 },
  { id: 'eventos', label: 'Eventos', count: 0 },
  { id: 'lifestyle', label: 'Lifestyle', count: 0 },
  { id: 'corporativo', label: 'Corporativo', count: 0 },
  { id: 'projectos', label: 'Projectos', count: 0 },
]

export const portfolioItems = [
  // ═══════════════════════════════════════════════════════════════
  // RETRATOS - Portrait Photography
  // ═══════════════════════════════════════════════════════════════
  {
    id: 1,
    category: 'retratos',
    src: '/560914308_18404954155184208_4058324071045245347_n.jpg',
    alt: 'Retrato - Luz Natural',
    title: 'Luz Natural',
    size: 'large',
  },
  {
    id: 2,
    category: 'retratos',
    src: '/561130094_18404954173184208_1604440133301537245_n.jpg',
    alt: 'Retrato - Sombras Dramáticas',
    title: 'Sombras Dramáticas',
    size: 'medium',
  },
  {
    id: 3,
    category: 'retratos',
    src: '/561167630_18404954146184208_2809576874514623855_n.jpg',
    alt: 'Retrato - Editorial',
    title: 'Editorial',
    size: 'small',
  },
  {
    id: 4,
    category: 'retratos',
    src: '/561181985_18404954164184208_5407017860984878282_n.jpg',
    alt: 'Retrato - Artístico',
    title: 'Artístico',
    size: 'large',
  },
  {
    id: 5,
    category: 'retratos',
    src: '/560443130_18404954137184208_1879493367801025117_n.jpg',
    alt: 'Retrato - Autêntico',
    title: 'Autêntico',
    size: 'medium',
  },
  {
    id: 6,
    category: 'retratos',
    src: '/149145348_439575437247212_4051384531580662449_n.jpg',
    alt: 'Retrato - Clássico',
    title: 'Clássico',
    size: 'small',
  },
  {
    id: 7,
    category: 'retratos',
    src: '/440253958_797173665691660_2400022788887315739_n.jpg',
    alt: 'Retrato - Expressivo',
    title: 'Expressivo',
    size: 'medium',
  },
  {
    id: 8,
    category: 'retratos',
    src: '/445589100_463030996215234_2811852269498075057_n.jpg',
    alt: 'Retrato - Intimista',
    title: 'Intimista',
    size: 'small',
  },
  {
    id: 9,
    category: 'retratos',
    src: '/446071962_1170012734027039_4952564141497514043_n.jpg',
    alt: 'Retrato - Contemporâneo',
    title: 'Contemporâneo',
    size: 'medium',
  },

  // ═══════════════════════════════════════════════════════════════
  // FORMATURAS - Graduation Photography
  // ═══════════════════════════════════════════════════════════════
  {
    id: 10,
    category: 'formaturas',
    src: '/formatura_1.jpg',
    alt: 'Formatura - Graduanda',
    title: 'Momento de Conquista',
    size: 'large',
  },
  {
    id: 11,
    category: 'formaturas',
    src: '/formatura_2.jpg',
    alt: 'Formatura - Celebração',
    title: 'Celebração Dupla',
    size: 'medium',
  },
  {
    id: 12,
    category: 'formaturas',
    src: '/formatura_3.jpg',
    alt: 'Formatura - Alegria',
    title: 'Alegria Contagiante',
    size: 'medium',
  },
  {
    id: 13,
    category: 'formaturas',
    src: '/formatura_4.jpg',
    alt: 'Formatura - Elegância',
    title: 'Elegância Masculina',
    size: 'small',
  },
  {
    id: 14,
    category: 'formaturas',
    src: '/formatura_5.jpg',
    alt: 'Formatura - Graduando',
    title: 'Orgulho Académico',
    size: 'large',
  },

  // ═══════════════════════════════════════════════════════════════
  // CASAMENTOS - Wedding Photography
  // ═══════════════════════════════════════════════════════════════
  {
    id: 15,
    category: 'casamentos',
    src: '/550942850_18402487996184208_2384939623492755185_n.jpg',
    alt: 'Casamento - Momento Eterno',
    title: 'Momento Eterno',
    size: 'large',
  },
  {
    id: 16,
    category: 'casamentos',
    src: '/551070863_18402488014184208_7028793901860694415_n.jpg',
    alt: 'Casamento - União',
    title: 'União',
    size: 'medium',
  },
  {
    id: 17,
    category: 'casamentos',
    src: '/551092397_18402488044184208_7363554522633830121_n.jpg',
    alt: 'Casamento - Celebração',
    title: 'Celebração do Amor',
    size: 'medium',
  },
  {
    id: 18,
    category: 'casamentos',
    src: '/551435087_18402488023184208_4407599325956695706_n.jpg',
    alt: 'Casamento - Detalhes',
    title: 'Detalhes Preciosos',
    size: 'small',
  },
  {
    id: 19,
    category: 'casamentos',
    src: '/551631207_18402488035184208_4121927634788311330_n.jpg',
    alt: 'Casamento - Romance',
    title: 'Romance',
    size: 'large',
  },

  // ═══════════════════════════════════════════════════════════════
  // EVENTOS - Event Photography
  // ═══════════════════════════════════════════════════════════════
  {
    id: 20,
    category: 'eventos',
    src: '/490543632_18382917580184208_9214427187958563830_n.jpg',
    alt: 'Evento - Celebração',
    title: 'Celebração',
    size: 'medium',
  },
  {
    id: 21,
    category: 'eventos',
    src: '/491443505_18382917598184208_8324092881977330642_n.jpg',
    alt: 'Evento - Momento Especial',
    title: 'Momento Especial',
    size: 'medium',
  },
  {
    id: 22,
    category: 'eventos',
    src: '/491446877_18382917607184208_1979558714313750128_n.jpg',
    alt: 'Evento - Encontro',
    title: 'Encontro',
    size: 'small',
  },
  {
    id: 23,
    category: 'eventos',
    src: '/491464231_18384147193184208_8936363420951185987_n.jpg',
    alt: 'Evento - Festa',
    title: 'Festa',
    size: 'small',
  },

  // ═══════════════════════════════════════════════════════════════
  // LIFESTYLE - Lifestyle Photography
  // ═══════════════════════════════════════════════════════════════
  {
    id: 24,
    category: 'lifestyle',
    src: '/527444076_18396844189184208_6840884165713361988_n.jpg',
    alt: 'Lifestyle - Momento Quieto',
    title: 'Momento Quieto',
    size: 'small',
  },
  {
    id: 25,
    category: 'lifestyle',
    src: '/527510445_18396844174184208_2859515816573133558_n.jpg',
    alt: 'Lifestyle - Dia a Dia',
    title: 'Dia a Dia',
    size: 'large',
  },
  {
    id: 26,
    category: 'lifestyle',
    src: '/527572562_18396844027184208_5715278412567915684_n.jpg',
    alt: 'Lifestyle - Natural',
    title: 'Natural',
    size: 'medium',
  },
  {
    id: 27,
    category: 'lifestyle',
    src: '/527607718_18396843871184208_7990826086434991469_n.jpg',
    alt: 'Lifestyle - Espontâneo',
    title: 'Espontâneo',
    size: 'small',
  },
  {
    id: 28,
    category: 'lifestyle',
    src: '/529569444_18396843880184208_7838198929099696518_n.jpg',
    alt: 'Lifestyle - Casual',
    title: 'Casual',
    size: 'medium',
  },
  {
    id: 29,
    category: 'lifestyle',
    src: '/531178232_18397725610184208_296506146674679625_n.jpg',
    alt: 'Lifestyle - Urbano',
    title: 'Urbano',
    size: 'small',
  },
  {
    id: 30,
    category: 'lifestyle',
    src: '/531238193_18397725622184208_118180439329447802_n.jpg',
    alt: 'Lifestyle - Moderno',
    title: 'Moderno',
    size: 'medium',
  },

  // ═══════════════════════════════════════════════════════════════
  // CORPORATIVO - Corporate/Commercial Photography
  // ═══════════════════════════════════════════════════════════════
  {
    id: 31,
    category: 'corporativo',
    src: '/2025_11_07_11_09_IMG_2706.JPG',
    alt: 'Corporativo - Profissional',
    title: 'Profissional',
    size: 'large',
  },
  {
    id: 32,
    category: 'corporativo',
    src: '/2025_11_07_12_47_IMG_2704.JPG',
    alt: 'Corporativo - Executivo',
    title: 'Executivo',
    size: 'medium',
  },
  {
    id: 33,
    category: 'corporativo',
    src: '/2025_11_07_13_02_IMG_2703.JPG',
    alt: 'Corporativo - Business',
    title: 'Business Portrait',
    size: 'medium',
  },
  {
    id: 34,
    category: 'corporativo',
    src: '/2025_11_07_14_04_IMG_2710.JPG',
    alt: 'Corporativo - Empresarial',
    title: 'Empresarial',
    size: 'large',
  },
  {
    id: 35,
    category: 'corporativo',
    src: '/2025_11_07_14_06_IMG_2708.JPG',
    alt: 'Corporativo - Institucional',
    title: 'Institucional',
    size: 'small',
  },
  {
    id: 36,
    category: 'corporativo',
    src: '/2025_11_07_14_36_IMG_2686.JPG',
    alt: 'Corporativo - Equipa',
    title: 'Equipa',
    size: 'medium',
  },
  {
    id: 37,
    category: 'corporativo',
    src: '/2025_11_07_20_02_IMG_2677.JPG',
    alt: 'Corporativo - Evento Corporate',
    title: 'Evento Corporate',
    size: 'small',
  },
  {
    id: 38,
    category: 'corporativo',
    src: '/2025_11_07_20_02_IMG_2679.JPG',
    alt: 'Corporativo - Conferência',
    title: 'Conferência',
    size: 'medium',
  },
  {
    id: 39,
    category: 'corporativo',
    src: '/2025_11_07_20_05_IMG_2644.JPG',
    alt: 'Corporativo - Networking',
    title: 'Networking',
    size: 'large',
  },

  // ═══════════════════════════════════════════════════════════════
  // PROJECTOS - Art Projects
  // ═══════════════════════════════════════════════════════════════
  {
    id: 40,
    category: 'projectos',
    src: '/536981337_18398961817184208_757924853193279845_n.jpg',
    alt: 'Projecto - Série Artística',
    title: 'Série Artística',
    size: 'medium',
  },
  {
    id: 41,
    category: 'projectos',
    src: '/537421951_18398961856184208_4790026944126573178_n.jpg',
    alt: 'Projecto - Visão Criativa',
    title: 'Visão Criativa',
    size: 'large',
  },
  {
    id: 42,
    category: 'projectos',
    src: '/538139890_18398961865184208_8415849218265134269_n.jpg',
    alt: 'Projecto - Experimentação',
    title: 'Experimentação',
    size: 'small',
  },
  {
    id: 43,
    category: 'projectos',
    src: '/561643629_18404954182184208_2493885912661405593_n.jpg',
    alt: 'Projecto - Dualidade',
    title: 'Dualidade',
    size: 'medium',
  },
  {
    id: 44,
    category: 'projectos',
    src: '/562506426_18405201763184208_4373451680143518619_n.jpg',
    alt: 'Projecto - Perspectiva',
    title: 'Perspectiva',
    size: 'medium',
  },
  {
    id: 45,
    category: 'projectos',
    src: '/562561202_18405201679184208_8445742481536646510_n.jpg',
    alt: 'Projecto - A Arte',
    title: 'A Arte',
    size: 'large',
  },
  {
    id: 46,
    category: 'projectos',
    src: '/562788130_18405201727184208_6988509653949574672_n.jpg',
    alt: 'Projecto - Narrativa Visual',
    title: 'Narrativa Visual',
    size: 'small',
  },
  {
    id: 47,
    category: 'projectos',
    src: '/244596570_554234652338614_8378498264354942727_n.webp',
    alt: 'Projecto - Conceptual',
    title: 'Conceptual',
    size: 'medium',
  },
]

// Update category counts automatically
portfolioCategories.forEach(cat => {
  if (cat.id === 'all') {
    cat.count = portfolioItems.length
  } else {
    cat.count = portfolioItems.filter(item => item.category === cat.id).length
  }
})

export default portfolioItems
