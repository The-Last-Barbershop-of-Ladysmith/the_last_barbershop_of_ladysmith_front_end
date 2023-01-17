module.exports = {
    preset: "jest-puppeteer",
    testTimeout: 35000000,
    testMatch: [
      '<rootDir>/e2e/*.test.js',
  ],
  "verbose": true,
  };