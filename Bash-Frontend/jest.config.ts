// /**
//  * For a detailed explanation regarding each configuration property, visit:
//  * https://jestjs.io/docs/configuration
//  */

import type { Config } from '@jest/types';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig: Config.InitialOptions = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['json', 'json-summary', 'lcov', 'text', 'clover'], // Reporters for coverage output
};

// Export as a function
export default async () => createJestConfig(customJestConfig);
