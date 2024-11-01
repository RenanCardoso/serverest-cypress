module.exports = {
    branches: ["master"],
    plugins: [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        "@semantic-release/changelog",
        "@semantic-release/github",
        [
            "@semantic-release/git",
            {
                assets: ["CHANGELOG.md", "package.json", "package-lock.json"],
                message: "docs: ${nextRelease.version}",
            },
        ],
    ],
    prepareCmd: "npm version ${nextRelease.version} -m 'docs: %s'",
    verifyConditions: ["@semantic-release/github"],
    publish: ["@semantic-release/github"],
    repositoryUrl: "https://github.com/RenanCardoso/serverest-cypress",
    githubToken: "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",
};