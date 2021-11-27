const { environment } = require('@rails/webpacker')

// SplitChunksPlugin 共通で使用するpackageのJavaScriptファイルを纏める機能
environment.splitChunks()

module.exports = environment

