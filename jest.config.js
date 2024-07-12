module.exports = {
  testEnvironment: "node",
  transform: {},
  moduleNameMapper: {
    "node:crypto": require.resolve("crypto-browserify"),
    "node:net": require.resolve("net-browserify"), // Add this line
  },
  setupFilesAfterEnv: ["./jest.setup.js"],
};
