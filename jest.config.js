module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transformIgnorePatterns: ['/node_modules/(?!@ionic/vue|@ionic/vue-router|@ionic/core|@stencil/core|ionicons|axios)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,ts,vue}', '!<rootDir>/node_modules/'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 40,
      lines: 60,
      statements: 60,
    },
  },
};
