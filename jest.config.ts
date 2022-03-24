/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  // clearMocks: true,
  // collectCoverage: true,
  testEnvironment: 'node',
  preset: 'ts-jest',
  coverageDirectory: 'coverage',
  // testEnvironment: 'jsdom',
  // testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  // testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  // watchPathIgnorePatterns: ['/node_modules/', '/build/'],
  // https://github.com/zaqqaz/jest-allure#uses-jest-circus-or-jest--v-27-
  // testRunner: 'jest-jasmine2',
  moduleFileExtensions: [
    "ts",
    "js",
    "json",
    "node"
  ],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|js)$",
  collectCoverageFrom: [
    "src/**/*.{ts,js}",
    "!src/**/*.d.ts"
  ]
};
