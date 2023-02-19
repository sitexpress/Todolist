module.exports = {
    preset: 'jest-puppeteer',
    testMatch : ['./**/*.test.js'],
    setupFilesAfterEnv: ['./integration/setupTests.js'],
    testTimeout: 7000,
};
