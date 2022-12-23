export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['app/**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/../src/$1',
    '^@app/(.*)$': '<rootDir>/../src/app/$1',
    '^@infra/(.*)$': '<rootDir>/../src/infra/$1',
    '^@utils/(.*)$': '<rootDir>/../src/utils/$1',
    '^@test/(.*)$': '<rootDir>/../test/$1',
  },
};
