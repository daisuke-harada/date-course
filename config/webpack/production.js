process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const environment = require('./environment')

module.exports = environment.toWebpackConfig()

const { environment } = require('@rails/webpacker');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

environment.plugins.prepend('HardSourceWebpackPlugin', new HardSourceWebpackPlugin());
