const path = require('path')
const getLogPlugin = require('./getLogPlugin')

module.exports = {
    mode: 'development',
    entry: {
        main: './test.js'
    },
    plugins: [
        new getLogPlugin()
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    }
}
