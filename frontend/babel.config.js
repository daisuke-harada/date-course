module.exports = {
  "presets": [
    ["env", {
      "test": { // <-- NODE_ENV=testの場合のみpluginが有効になる
        "plugins": [
            "transform-es2015-modules-commonjs"
        ]
      }
    }]
  ]
}