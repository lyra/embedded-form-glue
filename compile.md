# Compile and publishing how-to

To compile the library:

    npm install
    npm run build
    npm run prepublish

To bump to the new version (for example 0.2.8)

Semantic versioning: https://semver.org/

- edit the package.json
- update the CHANGELOG.md

to publish it on npm, do:

    npm publish --access public

if everything's fine, commit and tag:

    git commit -am"Bump to 1.0.0"
    git tag 1.0.0
    git push origin master --tag

When it's done, do not forget to update examples package.json files
to the last version.
