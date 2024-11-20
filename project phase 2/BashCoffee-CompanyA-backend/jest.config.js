module.exports = {
    collectCoverage: true,
    coverageDirectory: "coverage",
    collectCoverageFrom: [
        "**/*Controller.js",        // Includes all files ending with Controller.js in all directories
        "!**/node_modules/**",      // Excludes files in node_modules
        "!**/tests/**",             // Excludes files in tests directory
    ],
  };
  