/** @format */

// .eslintrc.js
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['standard', 'plugin:vue/strongly-recommended', '@vue/prettier'],
  plugins: ['vue'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        bracketSpacing: true,
        jsxBracketSameLine: true,
        parser: 'flow',
        insertPragma: true,
        requirePragma: true,
      },
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // 元素>单行显示
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'never',
      },
    ],
    // 单元素关闭
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always', // 空元素(不包含内容)
          normal: 'never',
          component: 'any', // 自定义组件 any 不强制自我关闭
        },
      },
    ],
    // 最多单行属性
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 20,
        multiline: {
          max: 20,
          allowFirstLine: false,
        },
      },
    ],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
}
