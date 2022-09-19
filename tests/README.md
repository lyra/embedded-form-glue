# Embedded Form Glue JavaScript library tests

In this folder are stored utilities to test this library. There are specs for the library itself and for the provided framework examples.

The library tests work directly without any setup, but the examples need to be installed and built.

## Glue library tests

As mentioned above these tests run directly on the .html files found on the "views" folder.

having a http server at port 8080 on the project root will allow this views to be tested.

specs file: /tests/e2e/specs/tests.spec.js

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

Having the folder created you will need to start the server and the desired frontend framework using any http server. Alternatively you may start the tests the following way from the project root.

```bash
npm run test:new
```

This will start every example (and the server) on different ports and start testcafe.

specs file: /tests/e2e/specs/examples-tests.spec.js