module.exports = {
  plugins: [
    require('postcss-import'), // 解决@import引入路径问题
    require('postcss-url'), // 该插件用来处理图片、字体等文件引入路径问题
    require('postcss-aspect-ratio-mini'), // 宽高比
    require('postcss-write-svg')({ utf8: false }), // 移动端1px问题
    require('postcss-preset-env'), // CSS的新特性 (其中包含autoprefixer)
    require('postcss-px-to-viewport')({
      // px转vw工具
      viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
      viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
      unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: ['.ignore', '.hairlines'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: false // 允许在媒体查询中转换`px`
    }),
    require('cssnano')({
      // 用来压缩和清理CSS代码
      preset: 'advanced',
      autoprefixer: false,
      'postcss-zindex': false
    })
  ]
}
