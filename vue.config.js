module.exports = {
  css: {
    // css预处理配置
    loaderOptions: {
      sass: {
        data: `@import '@/style/index.scss';`,
      },
    },
  },
  devServer: {
    host: '0.0.0.0',
    port: 8000,
    proxy: 'http://cangdu.org:8001',
  },
}
