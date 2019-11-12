module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: ['<rootDir>/lib/**/*.ts', '!**/node_modules/**'],
  testMatch: ['<rootDir>/test/**/*.test.ts'],
};
