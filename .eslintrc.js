module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  globals: {
    __static: true
  },
  plugins: [
    'html'
  ],
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "no-warning-comments": 0,
    "space-before-function-paren": 0, // 去掉方法名后面的空格
    "comma-dangle": 0, // 数组的最后允许加逗号
    camelcase: 0, // 允许变量名不使用驼峰式命名
  }
}
