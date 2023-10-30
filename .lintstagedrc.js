const path = require('path')

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`

module.exports = {
  '**/*.+(json|js|jsx|ts|tsx)': [
    'prettier --check "**/*.{js,ts,tsx}"',
    buildEslintCommand,
  ],
  '**/*.+(scss)': ['yarn run format-scss'],
}
