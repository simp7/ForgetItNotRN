export default {
	env: {
		es6: true,
		node: true,
		jest: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
	],
	'overrides': [
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
    project: './tsconfig.json',
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: [
		'react',
    'react-hooks',
		'@typescript-eslint'
	],
	rules: {
		'indent': ['error', 'tab'],
		'linebreak-style': ['error','unix'],
		'quotes': [ 'error', 'single'],
		'semi': ['error', 'always'],
    'react-native/no-raw-text': ['error'],
	},
  settings: {
    react: {
      version: 'detect',
    },
  },
};
