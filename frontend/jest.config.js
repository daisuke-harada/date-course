module.exports = {
  'preset': 'ts-jest/presets/js-with-ts-esm',
  'globals': {
    'ts-jest': {
      useESM: true,
      tsconfig: 'tsconfig.test.json'
    }
  },
  'moduleDirectories': ['node_modules', 'src'], // importする際にsrcからの絶対パスでしていできるようにする。
  'testEnvironment': 'jsdom',
  'transform': {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  "transformIgnorePatterns": [
    "/node_modules/(?!(xxxx.*?\\.js$))"
  ],
  "testRegex": "(/test/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  "testPathIgnorePatterns": [
    "/node_modules/"
  ],
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "json"
  ],
  "moduleNameMapper": {
    "@(components|helper|redux|config|modules|style)?/(.*)": "<rootDir>/src/$1/$2",
    "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules"
  },
}