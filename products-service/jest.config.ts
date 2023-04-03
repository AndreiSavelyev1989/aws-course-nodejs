export default {
  clearMocks: true,
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.spec.ts"],
  moduleNameMapper: {
    "^@libs/(.*)$": "<rootDir>/src/libs/$1",
    "^@mocks/(.*)$": "<rootDir>/src/mocks/$1",
    "^@services/(.*)$": "<rootDir>/src/services/$1",
    "^@constants/(.*)$": "<rootDir>/src/constants/$1",
  },
};
