// .eslintrc.js
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/strongly-recommended', '@vue/prettier'],
  plugins: ['vue'],
  rules: {
    'prettier/prettier': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // 元素单行显示
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'never',
      },
    ],
    // 元素关闭
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
        },
      },
    ],
    // 最多单行属性
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 3,
      },
    ],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
}
