const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']

// const PrerenderSPAPlugin = require('prerender-spa-plugin')
// const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
module.exports = {
  lintOnSave: false,
  outputDir: __dirname + '/../server/web',
  // publicPath: process.env.NODE_ENV === 'production' ? '/web' : '/'
  productionSourceMap: false,
  chainWebpack: config => {
    //最小化代码
    config.optimization.minimize(true)
    //分割代码
    config.optimization.splitChunks({
      chunks: 'all'
    })
    // 压缩图片
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        bypassOnDebug: true
      })
      .end()

    const cdn = {
      css: ['https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.0/theme-chalk/index.min.css'],
      js: [
        'https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.min.js',
        'https://cdn.bootcdn.net/ajax/libs/vue-router/3.2.0/vue-router.min.js',
        'https://cdn.bootcdn.net/ajax/libs/vuex/3.2.0/vuex.min.js',
        'https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.min.js',
        // 'https://cdn.bootcdn.net/ajax/libs/highlight.js/9.18.4/highlight.min.js',
        // 'https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js',
        'https://cdn.bootcdn.net/ajax/libs/marked/1.2.7/marked.min.js',
        'https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.0/index.min.js'
      ]
    }
    // html中添加cdn
    config.plugin('html').tap(args => {
      args[0].cdn = cdn
      return args
    })
  },
  configureWebpack: config => {
    // cdn外部引入依赖
    config.externals = {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      axios: 'axios',
      // 'highlight.js': 'highlight.js',
      // jquery: 'jquery',
      marked: 'marked',
      'element-ui': 'ELEMENT'
    }

    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      return {
        // 生产环境去掉浏览器控制台console.log的痕迹
        optimization: {
          minimizer: [
            new TerserPlugin({
              sourceMap: true, // Must be set to true if using source-maps in production
              terserOptions: {
                compress: {
                  drop_console: true
                }
              }
            })
          ]
        },
        plugins: [
          // new PrerenderSPAPlugin({
          //   staticDir: path.join(__dirname, '/../serve/web'),
          //   routes: ['/', '/blogs'],
          //   // renderer: new Renderer({
          //   //   inject: {
          //   //     foo: 'bar'
          //   //   },
          //   //   headless: true,
          //   //   renderAfterDocumentEvent: 'render-event'
          //   // })
          // }),
          new CompressionWebpackPlugin({
            algorithm: 'gzip',
            test: new RegExp(`\\.(${productionGzipExtensions.join('|')})$`),
            threshold: 1024,
            minRatio: 0.8
          })
        ]
      }
    } else {
      // 为开发环境修改配置...
    }
  }
}
