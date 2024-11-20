module.exports = {
    collectCoverage: true,
    coverageDirectory: "coverage",
    collectCoverageFrom: [
        "**/beverageController.js",  // Include specific controller
        "**/memberController.js",    // Include specific controller
        "**/promotionController.js", // Include specific controller
        "!**/node_modules/**",       // Exclude files in node_modules
        "!**/tests/**",              // Exclude files in the tests directory
    ],
};
