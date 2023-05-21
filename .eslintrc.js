module.exports = {
	env: {
		es6: true,
		node: true,
		jest: true,
	},
	extends: [
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:@typescript-eslint/recommended',
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: './tsconfig.json',
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: [
		'react',
		'react-hooks',
		'react-native',
		'@typescript-eslint',
		'simple-import-sort', 
		'import-newlines', 
	],
	settings: {
		react: {
			version: 'detect',
		},
	},
	rules: {
		curly: ['error', 'multi-line'],
		'indent': ['error', 'tab'],
		'jsx-quotes': ['error', 'prefer-double'],
		'object-property-newline': [
		  'error',
		  {
			allowMultiplePropertiesPerLine: true,
		  },
		],
		'react/jsx-first-prop-new-line': [1, 'multiline-multiprop'],
		'react/jsx-curly-brace-presence': [1, { props: 'ignore', children: 'always' }],
		'react/jsx-closing-bracket-location': [1],
		'react/jsx-uses-vars': [2],
		'react/jsx-indent': [2, 'tab'],
		'react/jsx-indent-props': [2, 'tab'],
		'react/jsx-max-props-per-line': [
		  'error',
		  {
			maximum: {
			  single: 3,
			  multi: 1,
			},
		  },
		],
		'react/jsx-newline': ['warn', { prevent: true }],
		'react/jsx-wrap-multilines': [
		  'error',
		  {
			declaration: 'parens-new-line',
			assignment: 'parens-new-line',
			return: 'parens-new-line',
			arrow: 'parens-new-line',
			condition: 'parens-new-line',
			logical: 'parens-new-line',
			prop: 'parens-new-line',
		  },
		],
		'max-len': [
		  'error',
		  {
			code: 120,
			ignorePattern: 'd="([\\s\\S]*?)"',
			ignoreUrls: true,
		  },
		],
		'comma-dangle': ['error', 'always-multiline'],
		semi: [
		  'error',
		  'always',
		  {
			omitLastInOneLineBlock: false,
		  },
		],
		'array-element-newline': [
		  'error',
		  {
			ArrayExpression: 'consistent',
			ArrayPattern: {
			  minItems: 3,
			},
		  },
		],
		'key-spacing': ['warn', { afterColon: true, mode: 'strict' }],
		'no-new-object': 'error',
		'no-array-constructor': 'error',
		'sort-imports': 'off',
		'import/order': 'off',
		'object-curly-spacing': [1, "always"],
		'space-before-function-paren': [
		  'error',
		  {
			anonymous: 'never',
			named: 'never',
			asyncArrow: 'always',
		  },
		],
		'react/prop-types': 0,
		'generator-star-spacing': [
		  'error',
		  {
			before: false,
			after: true,
		  },
		],
		'@typescript-eslint/strict-boolean-expressions': 'off',
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/member-delimiter-style': ['warn', {
		  multiline: {
			delimiter: 'semi',
			requireLast: true,
		  },
		  singleline: {
			delimiter: 'comma',
			requireLast: false,
		  },
		}],
		'no-unneeded-ternary': 'warn',
		// '@typescript-eslint/no-unused-var': 'off',
		'no-mixed-spaces-and-tabs': ['error'],
		'react/display-name': 0,
		'@typescript-eslint/no-empty-function': 0,
		'import-newlines/enforce': 'error',
		'react-hooks/rules-of-hooks': 'error',
	  },
		overrides: [
			{
				files: 'server/**/*.js',
				env: {
					node: true,
				},
				rules: {
					'simple-import-sort/imports': 'off',
					'simple-import-sort/exports': 'off',
					'import/order': [
						'error',
						{
							'newlines-between': 'always',
						},
					],
				},
			},
		],
};
