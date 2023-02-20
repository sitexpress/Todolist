// module.exports = {
//     preset: 'jest-puppeteer',
//     testMatch : ['./**/*.test.js'],
//     setupFilesAfterEnv: ['./integration/setupTests.js'],
//     testTimeout: 7000,
// };

module.exports = {
    preset: 'jest-puppeteer',
    testRegex: './*\\.test\\.js$',
    setupFilesAfterEnv: ['./setupTests.js']
};
