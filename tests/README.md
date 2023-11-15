# Embedded Form Glue JavaScript library tests

In this folder are stored utilities to test this library. There are specs for the library itself and for the provided framework examples.

The library tests work directly without any setup, but the examples need to be installed and built.

## Glue library tests

As mentioned above these tests run directly on the .html files found on the "views" folder.

having a http server at port 8080 on the project root will allow this views to be tested.

specs file: /tests/e2e/specs/tests.spec.js

### Unit tests

For the glue library itself we have also unit tests (tests/e2e/)

To launch the tests just run the following npm script:

```bash
npm run test:unit
```

## Usage examples tests

To test the examples you will need to npm install the dependencies of each of the /examples projects using

```bash
npm install
```

Having all the required dependencies you can build the examples and replace the placeholder for working keys and endpoints using the build.sh script available on the project root

```bash
sh build.sh
```

this will create the examples_build folder.

Having the folder created you will need to start the server and the desired frontend framework using any http server.

Using the following command you will setup all the servers with the different frameworks in different ports (from 9000 ... 9007)

```bash
npm run e2e-servers
```

This is used to run the e2e tests on each framework.
You may start the tests the following way from the project root.

```bash
npm run test:e2e
```

This will start every example (and the server) on different ports and start testcafe.

specs file: /tests/e2e/specs/examples-tests.spec.js

# Changes on the development environment

If some example needs to be modified you can use the following gulp task to use a default key and endpoint to make the form work.

```bash
gulp devReplaceKeys
```

After this you may start the server and any of the frameworks in "development mode" and make the changes.

Remember to restore the original strings before committing any change

```bash
gulp devReplaceKeys --restore
```
