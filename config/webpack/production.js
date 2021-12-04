process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const environment = require('./environment')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
environment.plugins.prepend('HardSourceWebpackPlugin', new HardSourceWebpackPlugin())
// SplitChunksPlugin 共通で使用するpackageのJavaScriptファイルを纏める機能
environment.splitChunks()
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

// environment.plugins.prepend('HardSourceWebpackPlugin', new HardSourceWebpackPlugin());

module.exports = environment.toWebpackConfig()
