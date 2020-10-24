// eslint-disable-next-line nuxt/no-cjs-in-config
module.exports = {
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: 'Lediga lokaler - Popup Agency',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Popup Agency är en nytänkande uthyrningskonsult som på ett roligt och otraditionellt arbetssätt möter framtidens krav inom handeln med korttidsavtal och popup butiker. Vi är matchmakern som hjälper dig från idé till popup.'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favo.png' },
      { href: 'https://fonts.googleapis.com/css2?family=Abel&display=swap', rel: 'stylesheet' },
      { href: '/css/animate.css', rel: 'stylesheet' }
    ],
    script: [
      { src: '/js/fontawesome.js' }
    ]
  },
  /*
   ** Global CSS
   */
  css: [
    '@/assets/css/main.css'
  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    { src: '~/plugins/vue2-editor', mode: 'client' },
    { src: '~/plugins/gmaps', mode: 'client', ssr: true }
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  telemetry: false,
  loading: '~/components/loading.vue',
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    ['nuxt-i18n', {
      locales: [
        {
          code: 'en',
          file: 'en.js'
        },
        {
          code: 'sv',
          file: 'sv.js'
        }
      ],
      lazy: true,
      langDir: 'lang/',
      defaultLocale: 'sv'
    }],
    '@nuxtjs/dotenv'
  ],
  auth: {
    // Options
    cookie: {
      domain: 'popup.dk',
      secure: 'true'
    },
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/lediga-lokaler',
      home: '/admin'
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: '/users/auth', method: 'post', propertyName: 'token' },
          logout: { url: '/users/logout', method: 'post' },
          user: { url: '/users/me', method: 'get', propertyName: 'data' }
        },
        tokenName: 'x-auth-token',
        tokenType: ''
      }
    }
  },
  env: {
    VUE_APP_GOOGLE_MAPS_API_KEY: process.env.VUE_APP_GOOGLE_MAPS_API_KEY
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: '/api'
    // baseURL: 'https://popup.dk.se/api'
  },
  router: {
    linkActiveClass: 'active'
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    transpile: [/^vue2-google-maps($|\/)/]
  }
}
