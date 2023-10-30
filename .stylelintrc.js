module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss', // https://stylelint.io/user-guide/get-started/#linting-everything-else
    'stylelint-config-property-sort-order-smacss',
  ],
  rules: {
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['overflow-scrolling', 'text-fill-color'],
      },
    ],
    'selector-class-pattern': '^[A-Z][a-zA-Z0-9]+$', // https://stylelint.io/user-guide/rules/regex/#enforce-a-case
    // 'selector-nested-pattern':
    //   '(^&([-_:][-_:][a-z-_0-9, \n&:]+)$)|(^> .+$)|(^&:.*$)|(^.[a-zA-Z]*$)|(^\\+ .*$)|(^&\\[.*$)|(^& \\+.*$)',
    'selector-class-pattern': null,
    'custom-property-pattern': null,
    'keyframes-name-pattern': null,
    'scss/at-mixin-pattern': null,
    'scss/percent-placeholder-pattern': null,
    'declaration-block-no-duplicate-properties': true,
    'font-family-no-missing-generic-family-keyword': null,
    'no-descending-specificity': null,
  },
}
