
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  router: {
    middleware: [
      'clearValidationErrors',
    ],
  },
  /*
  ** Global CSS
  */
  css: [
    'ant-design-vue/dist/antd.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/antd-ui',
    '@/plugins/mixins/validation',
    './plugins/mixins/user',
    '@/plugins/axios',
    {src: '~/plugins/full-calendar', ssr: false}
  ],
  
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    // baseURL : 'http://127.0.0.1:5000/api',
    baseURL : 'http://192.168.1.102:5000/api',
    // proxyHeaders: false,
    // credentials: false
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {url: '/auth/login', method: 'post', propertyName:'token'},
          logout: {url: '/auth/user_logout', method: 'get', },
          user: {url: '/user_me', method: 'get', propertyName: 'data'},
        },
      },
    },
    redirect: {
        login: '/auth/login',
        // logout: '/auth/login',
        home: '/',
        // callback: '/'
    },
    plugins : [
      './plugins/auth'
    ]
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    },
  }
}
