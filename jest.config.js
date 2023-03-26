module.exports = {
  testMatch: ['**/tests/**/*.[jt]s?(x)'],
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  // eslint-disable-next-line max-len
  transformIgnorePatterns: ['/node_modules/(?!@ionic/vue|@ionic/vue-router|@ionic/core|@stencil/core|ionicons|axios|swiper|swiper/vue)'],
  moduleNameMapper: {
    // configuring the alias for the test folder, so Jest can resolve the paths
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,ts,vue}', '!<rootDir>/node_modules/'],
  coverageThreshold: {
    global: {
      branches: 55,
      functions: 55,
      lines: 65,
      statements: 65,
    },
  },
};
