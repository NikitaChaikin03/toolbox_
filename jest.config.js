module.exports = {
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    '@libs/ddd': '<rootDir>/libs/ddd/src',
    '@libs/exceptions': '<rootDir>/libs/exceptions/src',
    '@libs/health': '<rootDir>/libs/health/src',
    '@libs/orm': '<rootDir>/libs/orm/src',
    '@libs/rest': '<rootDir>/libs/rest/src',
    'application/(.*)': '<rootDir>/application',
  },
  preset: 'ts-jest',
  roots: ['<rootDir>/application/', '<rootDir>/libs/'],
  testEnvironment: 'node',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};
