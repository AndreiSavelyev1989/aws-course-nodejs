export default {
  clearMocks: true,
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.spec.ts"],
  moduleNameMapper: {
    "^@libs/(.*)$": "<rootDir>/src/libs/$1",
    "^@mocks/(.*)$": "<rootDir>/src/mocks/$1",
    "^@provider/(.*)$": "<rootDir>/src/provider/$1",
    "^@constants/(.*)$": "<rootDir>/src/constants/$1",
  },
};
