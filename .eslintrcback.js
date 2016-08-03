module.exports = {
    'env': {
        'node': true,
        'es6': true
    },
    'extends': 'airbnb',
    'rules': {
        'indent': [
            'error',
            4,
            { 'SwitchCase': 1 }
        ],
        'no-undef': 0,
    },
};
