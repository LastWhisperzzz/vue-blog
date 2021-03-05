module.exports = {
  outputDir: __dirname + '/../server/admin',
  publicPath: process.env.NODE_ENV === 'production' ? '/admin/' : '/',

  configureWebpack: config => {
    config.externals = {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      axios: 'axios',
      'element-ui': 'ELEMENT'
    }
  },
  chainWebpack: config => {
    const cdn = {
      css: ['https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.0/theme-chalk/index.min.css'],
      js: [
        'https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.min.js',
        'https://cdn.bootcdn.net/ajax/libs/vue-router/3.2.0/vue-router.min.js',
        'https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.min.js',
        'https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.0/index.min.js'
      ]
    }
    // html中添加cdn
    config.plugin('html').tap(args => {
      args[0].cdn = cdn
      return args
    })
  }
}
