# Embedded Form Glue JavaScript library

[![Build Status](https://circleci.com/gh/lyra/embedded-form-glue.svg?style=shield)](https://circleci.com/gh/lyra/embedded-form-glue)
[![npm version](https://img.shields.io/npm/v/@lyracom/embedded-form-glue.svg)](https://www.npmjs.com/package/@lyracom/embedded-form-glue)

The **embedded-form-glue** Javascript library helps you to integrate a payment
form into your favorite framework easily using npm or any similar tools.

A simple payment form will look like:

![payment form](/assets/payment_form.png)

## Context

Any credit card payment form should comply with PCI-DSS requirements. A
classical integration displays the payment form on the bank page using a
redirection. In this case, PCI-DSS requirements are done by your bank.

If you want to integrate a payment form on your web-page and get it easier with
PCI-DSS, you can use IFrames loaded from a PCI-DSS certified server.

Lyra provides a [Javacript library][JS Link] that helps you to integrate a
payment form using standard HTML components on your website. The library will transform
automatically each sensitive field (pan, security code, ...) into an IFrame loaded from
Lyra servers.

For this reason, the [Lyra Javascript library][JS Link] **must** be loaded from the Lyra PCI-DSS
certified servers. Consequently, it's not possible to add it in your package.json file like any
other Javascript library.

To make your life easier, we have created a glue library that helps you to
include it into your build: the **embedded-form-glue** library.

The **embedded-form-glue** glue library helps you to deal with:

- async loading of the [Lyra Javascript library][JS Link]
- helps you to manage configuration even if the library is not yet loaded
- preload payment form elements and display them quickly on slow network
- various helpers to add, display or remove the payment form

## Installation

Add the following package to your library:

```bash
npm install --save @lyracom/embedded-form-glue
# OR
yarn global add @lyracom/embedded-form-glue
```

## Basic usage

First you need to load the theme files in your HEAD section:

```javascript
<!-- theme and plugins. should be loaded in the HEAD section -->
<link rel="stylesheet"
href="https://[CHANGE_ME: JAVASCRIPT ENDPOINT]/static/js/krypton-client/V4.0/ext/classic-reset.css">
<script
    src="https://[CHANGE_ME: JAVASCRIPT ENDPOINT]/static/js/krypton-client/V4.0/ext/classic.js">
</script>
```
**note**: Replace **[CHANGE_ME]** with your credentials and end-points.

For more information about theming, take a look to [Lyra theming documentation][JS Themes]

Import the component:

    import KRGlue from "@lyracom/embedded-form-glue";

and Load the [Lyra Javascript library][JS Link]:

```javascript
const publicKey = 'CHANGE_ME: YOUR PUBLIC KEY';
const endPoint = 'CHANGE_ME: JAVASCRIPT ENDPOINT'; /* should include https:// */

/* WARNING: You should always use promises chaining with KR method calls */
KRGlue.loadLibrary(endPoint, publicKey) /* Load the remote library */
      .then(({KR}) => KR.setFormConfig({              /* set the minimal configuration */
        formToken: 'DEMO-TOKEN-TO-BE-REPLACED',
        'kr-language': 'en-US',                       /* to update initialization parameter */
      }))
      .then(({KR}) => KR.addForm('#myPaymentForm'))   /* create a payment form */
      .then(({KR, result}) => KR.showForm(result.formId)); /* show the payment form */
```

**note**: Replace **[CHANGE_ME]** with your credentials and end-points.
**warning:** You should always use promises chaining with KR method calls

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

## Lyra Javascript methods

The following methods helps you to deal with the [Lyra Javascript Library][JS Link] loading steps:

- KR.addForm([CSS class or id]) : Add a form into a div (insert HTML elements): return a promise with a formId
- KR.showForm(formId): display an hidden form
- KR.hideForm(formId): hide a visible form
- KR.removeForms(): Remove all existing forms and events
- KR.attachForm([CLASS OR ID]): Scan a DOM and attach the library to an existing DOM, return a formId

See Lyra [Javascript library reference][JS Reference] for all complete reference guide.

## Using embedded-form-glue with javascript frameworks

Using embedded-form-glue Javascript library is quite easy. Take a look to the
following examples to see how to deal with:

| Framework | Description                                                                |
| --------- | -------------------------------------------------------------------------- |
| vue.js    | [vue example using vue-cli](examples/vuejs/minimal-example)                |
| react.js  | [react example using create-react-app](examples/react/minimal-example)     |
| next.js   | [react + nextjs example](examples/react/next-minimal)                      |
| angular   | [angular example using Angular CLI](examples/angular/minimal-example)      |

## Cutomize your form

**KR.addForm()** adds a default form. If you want to customize your payment form with:

- different field order
- add an additional field
- update the HTML structure to your need

You can add your own HTML and attach it with **KR.attachForm()**. see framework examples for more details.

## Compilation

To compile the library just run the next command to install the needed vendors for compilation:

```
# With npm
npm install
# With yarn
yarn install
```

Install the webpack library following the official documentation [Webpack Library](https://webpack.js.org/)

And then run the compilation command with webpack:

```
npm run build
```

## Testing

To run the e2e tests (testcafe), first initialize the static server and execute the tests after that.

```
npm run e2e-server
npm run test
```

[JS Link]: https://lyra.com/fr/doc/rest/V4.0/javascript/
[JS Reference]: https://lyra.com/fr/doc/rest/V4.0/javascript/features/reference.html
[JS Themes]: https://lyra.com/fr/doc/rest/V4.0/javascript/features/themes.html
[JS quick start]: https://lyra.com/fr/doc/rest/V4.0/javascript/quick_start_js.html
[JS integration guide]: https://lyra.com/fr/doc/rest/V4.0/javascript/guide/start.html
[REST API]: https://lyra.com/fr/doc/rest/V4.0/api/reference.html
