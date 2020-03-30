# Compile and publishing how-to

To compile the library:

    npm install
    npm run build

To bump to the new version (for example 0.2.8)

- edit the package.json
- update the CHANGELOG.md

to publish it on npm, do:

    npm publish --access public

if everything's fine, commit and tag:

    git commit -am"Bump to 0.2.8"
    git tag 0.2.8
    git push origin master --tag

When it's done, do not forget to update examples package.json files
to the last version.
