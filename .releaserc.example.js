module.exports = {
    branches: ["BRANCH ONDE A PUBLICAÇÃO OCORRERÁ"],
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
    repositoryUrl: "URL DO REPOSITÓRIO NO GITHUB",
    githubToken: "TOKEN DE ACESSO",
};