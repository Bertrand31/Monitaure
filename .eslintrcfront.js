module.exports = {
    'extends': 'airbnb',
    'plugins': [
        'react'
    ],
    'jsx-indent': [1, 4],
    'jsx-indent-props': [1, 4],
	'parserOptions':{
		'ecmaFeatures': {
			'experimentalObjectRestSpread': true
		}
	},
    'rules': {
        'indent': [
            'error',
            4,
            {'SwitchCase': 1}
        ],
    },
    'globals': {
        'heap': false
    },
};
