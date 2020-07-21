module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'no-v-html': 'off',
    'vue/this-in-template': 'off',
    'no-prototype-builtins': 'off',
    'vue/valid-v-bind': 'off'
  }
}
