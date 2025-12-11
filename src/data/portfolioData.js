/**
 * Portfolio Data
 * 
 * Photography portfolio items organized by category.
 * Using organized asset paths.
 */

export const categories = [
  { id: 'portraits', label: 'Retratos' },
  { id: 'lifestyle', label: 'Lifestyle' },
  { id: 'events', label: 'Eventos' },
  { id: 'projects', label: 'Projectos' },
]

export const portfolioItems = [
  // ═══════════════════════════════════════════════════════════════
  // PORTRAITS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 1,
    title: 'Luz Dourada',
    category: 'portraits',
    image: '/560443130_18404954137184208_1879493367801025117_n.jpg',
    featured: true,
    description: 'Capturando o calor da hora dourada numa sessão íntima.',
  },
  {
    id: 2,
    title: 'Estudo de Luz Natural',
    category: 'portraits',
    image: '/560914308_18404954155184208_4058324071045245347_n.jpg',
    description: 'Explorando as subtilezas da luz natural pela janela.',
  },
  {
    id: 3,
    title: 'Sombras Dramáticas',
    category: 'portraits',
    image: '/561130094_18404954173184208_1604440133301537245_n.jpg',
    description: 'Jogando com contraste e iluminação dramática.',
  },
  {
    id: 4,
    title: 'Sessão Editorial',
    category: 'portraits',
    image: '/561167630_18404954146184208_2809576874514623855_n.jpg',
    featured: true,
    description: 'Trabalho de retrato editorial de moda.',
  },
  {
    id: 5,
    title: 'Expressão Artística',
    category: 'portraits',
    image: '/561181985_18404954164184208_5407017860984878282_n.jpg',
    description: 'Retrato criativo com direção artística.',
  },
  {
    id: 6,
    title: 'Momentos Naturais',
    category: 'portraits',
    image: '/561643629_18404954182184208_2493885912661405593_n.jpg',
    description: 'Capturando momentos autênticos.',
  },
  {
    id: 7,
    title: 'Fashion Forward',
    category: 'portraits',
    image: '/562506426_18405201763184208_4373451680143518619_n.jpg',
    featured: true,
    description: 'Fotografia contemporânea de moda.',
  },
  {
    id: 8,
    title: 'Narrativa Visual',
    category: 'portraits',
    image: '/562788130_18405201727184208_6988509653949574672_n.jpg',
    description: 'Criação de conteúdo visual narrativo.',
  },

  // ═══════════════════════════════════════════════════════════════
  // LIFESTYLE
  // ═══════════════════════════════════════════════════════════════
  {
    id: 9,
    title: 'Exploração Urbana',
    category: 'lifestyle',
    image: '/527444076_18396844189184208_6840884165713361988_n.jpg',
    description: 'Documentando a vida e cultura urbana.',
  },
  {
    id: 10,
    title: 'Momentos Silenciosos',
    category: 'lifestyle',
    image: '/527510445_18396844174184208_2859515816573133558_n.jpg',
    featured: true,
    description: 'Encontrando beleza na quietude do dia-a-dia.',
  },
  {
    id: 11,
    title: 'Vida Quotidiana',
    category: 'lifestyle',
    image: '/527572562_18396844027184208_5715278412567915684_n.jpg',
    description: 'A poesia dos momentos comuns.',
  },
  {
    id: 12,
    title: 'Ambiente Natural',
    category: 'lifestyle',
    image: '/527607718_18396843871184208_7990826086434991469_n.jpg',
    description: 'Harmonia entre pessoa e espaço.',
  },

  // ═══════════════════════════════════════════════════════════════
  // EVENTS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 13,
    title: 'Celebração',
    category: 'events',
    image: '/490543632_18382917580184208_9214427187958563830_n.jpg',
    description: 'Momentos de alegria e celebração.',
  },
  {
    id: 14,
    title: 'Conexões',
    category: 'events',
    image: '/491443505_18382917598184208_8324092881977330642_n.jpg',
    featured: true,
    description: 'Capturando conexões humanas genuínas.',
  },
  {
    id: 15,
    title: 'Encontros',
    category: 'events',
    image: '/491446877_18382917607184208_1979558714313750128_n.jpg',
    description: 'Documentando encontros especiais.',
  },
  {
    id: 16,
    title: 'Momentos Partilhados',
    category: 'events',
    image: '/529569444_18396843880184208_7838198929099696518_n.jpg',
    description: 'A beleza dos momentos partilhados.',
  },
  {
    id: 17,
    title: 'Rituais',
    category: 'events',
    image: '/531178232_18397725610184208_296506146674679625_n.jpg',
    description: 'Preservando rituais e tradições.',
  },

  // ═══════════════════════════════════════════════════════════════
  // PROJECTS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 18,
    title: 'Luz e Sombra',
    category: 'projects',
    image: '/562561202_18405201679184208_8445742481536646510_n.jpg',
    featured: true,
    description: 'Projecto pessoal explorando dinâmicas de luz.',
  },
  {
    id: 19,
    title: 'Herança',
    category: 'projects',
    image: '/550942850_18402487996184208_2384939623492755185_n.jpg',
    description: 'Documentação de herança cultural.',
  },
  {
    id: 20,
    title: 'Visão e Realidade',
    category: 'projects',
    image: '/551070863_18402488014184208_7028793901860694415_n.jpg',
    description: 'Explorando a fronteira entre visão e realidade.',
  },
  {
    id: 21,
    title: 'Reflexões',
    category: 'projects',
    image: '/551092397_18402488044184208_7363554522633830121_n.jpg',
    description: 'Estudos de espelho e reflexão.',
  },
  {
    id: 22,
    title: 'Estudo de Forma',
    category: 'projects',
    image: '/536981337_18398961817184208_757924853193279845_n.jpg',
    description: 'Explorando forma humana e composição.',
  },
  {
    id: 23,
    title: 'Essência',
    category: 'projects',
    image: '/537421951_18398961856184208_4790026944126573178_n.jpg',
    description: 'Capturando a essência da personalidade.',
  },
]

export default portfolioItems
