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
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    /**
     * off 或 0：表示不验证规则。
     * warn 或 1：表示验证规则，当不满足时，给警告
     * error 或 2 ：表示验证规则，不满足时报错
     */
    // 关闭冲突规则
    'prettier/prettier': 'off',
    'object-shorthand': 'off',
    'no-console': 'off',
    'no-undef': 'off',
    eqeqeq: 'off',
    'no-unused-vars': 'off',
    'no-extra-boolean-cast': 'off',
    'no-useless-escape': 'off',
    'unicorn/prefer-text-content': 'off',
    // nuxt 相关规则
    'nuxt/no-cjs-in-config': 'off',
    // vue 相关规则
    'vue/attributes-order': [
      'off',
      {
        order: ['OTHER_ATTR']
      }
    ],
    'vue/order-in-components': [
      'off',
      {
        order: ['data', 'computed']
      }
    ],
    'import/order': ['off']
  }
};
