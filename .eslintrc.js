// .eslintrc.js
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['standard', 'plugin:vue/strongly-recommended', '@vue/prettier'],
  plugins: ['vue'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'none',
        bracketSpacing: true,
        jsxBracketSameLine: true,
        parser: 'flow'
      }
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // 元素>单行显示
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'never'
      }
    ],
    // 单元素关闭
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never'
        }
      }
    ],
    // 最多单行属性
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 10,
        multiline: {
          max: 10,
          allowFirstLine: false
        }
      }
    ]
  },
  parserOptions: {
    parser: 'babel-eslint'
    // ecmaVersion: 8,
    // sourceType: 'module',
    // ecmaFeatures: {
    //   jsx: true,
    //   modules: true,
    //   experimentalObjectRestSpread: true,
    // },
  }
}
