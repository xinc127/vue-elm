const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  publicPath: '/',
  productionSourceMap: false,
  configureWebpack: {
    devtool: 'source-map'
  },
  chainWebpack: config => {
    // 添加新的svg-sprite-loader处理svgIcon
    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include
      .add(resolve('src/icons')) //处理svg目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

    // 原有的svg图像处理loader添加exclude 
    config.module
      .rule('svg')
      .exclude
      .add(resolve('src/icons'))
      .end()
    // 这里是对环境的配置，不同环境对应不同的BASE_URL,以便axios的请求地址不同
    config.plugin('define').tap(args => {
      args[0]['process.env'].BASE_URL = JSON.stringify(process.env.BASE_URL)
      return args
    })
    // 也可以后端配置
    if (process.env.NODE_ENV === 'production') {
      // 启用GZip压缩
      config
        .plugin('compression')
        .use(CompressionPlugin, {
          asset: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8,
          cache: true,
        })
        .tap(args => {})
    }
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    config.plugins.delete('preload')
  },
  css: {
    extract: false,
    // css预处理配置
    loaderOptions: {
      sass: {
        data: `@import '@/style/index.scss';`
      }
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: 8000,
    proxy: 'http://cangdu.org:8001'
  }
}