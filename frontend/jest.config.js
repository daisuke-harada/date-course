/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  // preset: 'ts-jest',
  // testEnvironment: 'node',
  transform: {
    '^.+\\.js$'  : './node_modules/babel-jest',
    '.*\\.(ts|tsx)$' : './node_modules/ts-jest',    // TypeScriptファイルをテストする場合
  },
  moduleFileExtensions: ['js', 'ts', 'tsx'] // テスト対象の拡張子を列挙する

};