import colors from 'vuetify/es5/util/colors'
// import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  loading: {
    color: '#3da5d3',
    height: '5px',
  },
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate:
      '%s - Akselerasi pendidikan skill abad 21 untuk indonsia maju',
    title: 'theskills.id',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#3da5d3' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Theskills.id - Akselerasi pendidikan skill abad 21 untuk indonsia maju',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/main.css', 'vue-slick-carousel/dist/vue-slick-carousel.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~/plugins/vue-plyr',
      mode: 'client',
    },
    { src: 'plugins/owl.js', ssr: false },
    '@/plugins/vuetify',
    '@/plugins/persisted.client',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  /*  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    ['@nuxtjs/vuetify', { iconfont: 'mdi' }],
  ], */

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/vuetify',
    '@nuxtjs/sitemap',
    '@nuxtjs/google-analytics',
    'vue-sweetalert2/nuxt',
  ],
  googleAnalytics: {
    id: 'G-6KKZ0VMR7V',
    dev: false,
  },
  sitemap: {
    hostname: 'https://the-skills.id',
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // baseUrl: 'https://sapi.the-skills.id/',
    baseUrl: 'http://127.0.0.1:8000/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      light: true,
      themes: {
        light: {
          primary: '#3da5d3',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent2,
          background: '#ffffff',
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vuetify/lib'],
    // plugins: [new VuetifyLoaderPlugin()],
  },
}
