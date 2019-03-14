# Payment form from scratch with vue-cli

This page explains how-to create a dynamic payment form from scratch using
vue.js and vue-cli and embedded-form-glue library.

## First, create the project

First, create the vue-cli HelloWorld project:

```sh
vue create mininal-example
```

Add the dependency with yarn:

```bash
yarn add @lyracom/embedded-form-glue
```

Or with npm:

```bash
npm install --save @lyracom/embedded-form-glue
```

Run and test it:

```sh
cd mininal-example
npm run serve
```

see the result on http://localhost:8080/

For more  details, see https://cli.vuejs.org/guide/creating-a-project.html

## add the payment form

First you have to add 2 theme files:

| File                  | Description
| --------------------- | ---------------------
| classic-reset.css     | default style applied before the [Lyra Javascript Library][JS Link] is loaded
| classic.js            | theme logic, like waiting annimation on submit button, ...

Add them in examples/vuejs/minimal-example/public/index.html in the the HEAD section:

```javascript
<!-- theme and plugins. should be loaded in the HEAD section -->
<link rel="stylesheet"
href="https://api.payzen.eu/static/js/krypton-client/dev/ext/classic-reset.css">
<script
    src="https://api.payzen.eu/static/js/krypton-client/dev/ext/classic.js">
</script>
```

For more information about theming, take a look to [Lyra theming documentation][JS Themes]

Update the src/components/HelloWorld.vue template to:

```html
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
      <div class="container">
        <div id="myPaymentForm"></div>
      </div>
  </div>
</template>
````

Your payment form will be added to #myPaymentForm element.

Update the src/components/HelloWorld.vue styles to:

```html
<style scoped>
h3 {
  margin: 40px 0 0;
}

.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
```

Import the component and create the payment form adding the following in
src/components/HelloWorld.vue after the <script> element:

```javascript
/* import embedded-form-glue library */
import KRGlue from "@lyracom/embedded-form-glue";

/* define the public key, you should use your personal key */
const publicKey = '69876357:testpublickey_DEMOPUBLICKEY95me92597fd28tGD4r5';

KRGlue.loadLibrary('https://api.payzen.eu', publicKey) /* Load the remote library */
      .then((KR) => KR.setFormConfig({                          /* set the minimal configuration */
        formToken: 'DEMO-TOKEN-TO-BE-REPLACED',
      }))
      .then((KR) => KR.addForm('#myPaymentForm'))               /* create a payment form */
      .then((KR) => KR.showForm(KR.result.formId));             /* show the payment form */
```

## your first transaction

The payment form is up and ready, you can try to make a transaction using
a test card with the debug toolbar (at the bottom of the page).

If you try to pay, you will have the following error: **CLIENT_998: Demo form, see the documentation**.
It's because the **formToken** you have defined using **KR.setFormConfig** is set to **DEMO-TOKEN-TO-BE-REPLACED**.

you have to create a **formToken** before displaying the payment form using Charge/CreatePayment web-service.
For more information, please take a look to:

* [Embedded form quick start][JS quick start]
* [embedded form integration guide][JS integration guide]
* [Payment REST API reference][REST API]

## Run it from github

You can try the current example from the current github repository doing:

```sh
cd examples/vuejs/minimal-example
npm install
npm run server
```

[JS Link]: https://lyra.com/fr/doc/rest/V4.0/javascript
[JS Themes]: https://lyra.com/fr/doc/rest/V4.0/javascript/features/themes.html
[JS quick start]: https://lyra.com/fr/doc/rest/V4.0/javascript/quick_start_js.html
[JS integration guide]: https://lyra.com/fr/doc/rest/V4.0/javascript/guide/start.html
[REST API]: https://lyra.com/fr/doc/rest/V4.0/api/reference.html
