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
      branches: 50,
      functions: 8,
      lines: 18,
      statements: 18,
    },
  },
};
