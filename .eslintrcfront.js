module.exports = {
    'env': {
        'browser': true,
    },
    'extends': 'airbnb',
    'plugins': [
        'react'
    ],
	'parserOptions':{
		'ecmaFeatures': {
			'experimentalObjectRestSpread': true
		}
	},
    'rules': {
        'react/jsx-indent': [1, 4],
        'react/jsx-indent-props': [1, 4],
        'indent': [
            'error',
            4,
            { 'SwitchCase': 1 }
        ],
    },
    'globals': {
        'heap': false
    },
};
