module.exports = {
    'env': {
        'node': true,
        'es6': true
    },
    'extends': 'eslint:recommended',
    'rules': {
        'indent': [
            'error',
            4,
            {'SwitchCase': 1}
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single',
            {
                'avoidEscape': true,
                'allowTemplateLiterals': true
            }
        ],
        'semi': [
            'error',
            'always'
        ],
        'no-undef': 0,
        'no-console': 0
    }
};
