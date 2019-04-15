/* eslint-disable */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const webpack = require('webpack')
const IS_WEB = process.env.VUE_APP_ENV === 'web'

process.env.BABEL_ENV = 'web'

module.exports = {
  lintOnSave: true,
  // use the full build with in-browser compiler?
  // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  runtimeCompiler: true,
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: (config) => {
    config.module
      .rule('compile')
        .test(/\.js$/)
        .include
          .add('/src/')
          .end()
        .exclude
          .add('/node_modules/')
          .end()
        .use('babel')
          .loader('babel-loader')
    config
      .output
        .filename('renderer.js')
  },
  configureWebpack: () => {
    let config = {
      entry: ['babel-polyfill', './src/main.js'],
      plugins: [
        new webpack.DefinePlugin({
          'process.env.IS_WEB': IS_WEB,
        }),
      ],
      resolve: {
        alias: {
          '@': path.join(__dirname, './src'),
          'vue$': 'vue/dist/vue.esm.js',
        },
        extensions: ['.js', '.vue', '.json', '.css', '.node']
      },
      target: IS_WEB ? 'web' : 'electron-renderer'
    }
    if (IS_WEB) {
      config.plugins.push(
        // web版开启gzip压缩
        new CompressionPlugin({
          test: /\.js$|\.css$|\.html$/,
          threshold: 10240, // 大于10k的文件压缩
          deleteOriginalAssets: false, // 是否删除源文件
        }),
      )
    }
    return config
  },
  publicPath: IS_WEB ? '/' : './',
  outputDir: path.resolve(__dirname, IS_WEB ? 'dist/web' : 'dist/electron'),
  // vue-loader 配置项
  // https://vue-loader.vuejs.org/en/options.html
  // vueLoader: {},
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  runtimeCompiler: true,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    // extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    },
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require('os').cpus().length > 1,
  // 是否启用dll
  // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode

  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    port: 8086,
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  }
}
