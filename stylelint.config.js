module.exports = {
  extends: ['stylelint-config-recommended'],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['apply', 'layer', 'responsive', 'screen', 'tailwind', 'variants']
      }
    ],
    'declaration-block-trailing-semicolon': null,
    'no-descending-specificity': null
  }
};
