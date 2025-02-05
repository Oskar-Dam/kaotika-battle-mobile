/* eslint-disable*/

module.exports = {
  transform: {
    '^.+\\.tsx?$': 'babel-jest',   // Transpile TypeScript files with Babel
    '^.+\\.jsx?$': 'babel-jest',   // For JavaScript/React files
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  testEnvironment: 'jsdom',   // Use jsdom for browser-like environment
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',  // Adjust Vite-style aliases if used
  },
  transformIgnorePatterns: [
    '/node_modules/(?!some-esm-package).+\\.js$',  // Allow ESM packages to be transformed
  ],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',  // Use this specific tsconfig for Jest
    }
  }
};
