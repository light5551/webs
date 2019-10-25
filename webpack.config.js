var path = require('path');

module.exports = {
    entry: ['./public/javascripts/slider.js',
        './public/javascripts/auction_log.js',
    './public/javascripts/goto.js',
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};