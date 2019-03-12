# embedded-form-glue javascript library

[WORK IN PROGRESS]

The **embedded-form-glue** javascript library helps you to integrate a payment
form into your favorite framework easily using npm or any similar tools.

A simple payment form will look like:

![payment form](/payment_form.png)

## Context

Any credit card payment form should comply with PCI-DSS requirements. A
classical integration displays the payment form on the bank page using a
redirection. In this case, PCI-DSS requirements are done by your bank.

If you want to integrate a payment form on your web-page and get it easier with
PCI-DSS, you can use IFrames loaded from a PCI-DSS certified server.

Lyra provides a [Lyra Javacript library][JS Link] that helps you to integrate a
payment form using standard HTML components on your website. The library will transform
automatically each sensitive field (Pan, security form) into an IFrame loaded from
Lyra servers.

To allow IFrame loading from Lyra servers, The [Lyra Javascript library][JS Link] **must** be loaded from
them. For this reason, it's not possible to add it in your package.json file like any
other javascript library.

To make your life easier, we have created a glue library that helps you to
include it into your build: the **embedded-form-glue** library.

The **embedded-form-glue** glue library helps you to deal with:

- async loading of the [Lyra Javascript library][JS Link]
- helps you to manage configuration even if the library is not yet loaded
- preload payment form elements and display them quickly on slow network
- various helpers to add, display or remove the payment form

## Installation

Add the following package to your library:

### With Yarn

```bash
yarn add @lyracom/embedded-form-glue
```

### With NPM

```bash
npm install --save @lyracom/embedded-form-glue
```

## Basic usage

First you need to load the theme files in your HEAD section:

```javascript
<!-- theme and plugins. should be loaded after the javascript library -->
<link rel="stylesheet"
href="https://krypton.purebilling.io/static/js/krypton-client/dev/ext/classic-reset.css">
<script
    src="https://krypton.purebilling.io/static/js/krypton-client/dev/ext/classic.js">
</script>
```

Import the component:

    import KRGlue from "@lyracom/embedded-form-glue";

and Load the [Lyra Javascript library][JS Link]:

    const defaultConfig = {
        'kr-public-key': '69876357:testpublickey_DEMOPUBLICKEY95me92597fd28tGD4r5',
        'formToken': 'DEMO-TOKEN-TO-BE-REPLACED',
    };

    KRGlue.loadLibrary('https://api.payzen.eu', defaultConfig.publicKey) /* Load the remote library */
          .then((KR) => KR.setFormConfig({                               /* set the minimal configuration */
            formToken: defaultConfig.formToken,
          }))
          .then((KR) => KR.addForm('#myPaymentForm'))                    /* create a payment form */
          .then((KR) => KR.showForm(KR.result.formId));                  /* show the payment form */

## Lyra Javascript methods

The following methods helps you to deal with the [Lyra Javascript Library][JS Link] loading steps:

- KR.addForm([CSS class or id]) : Add a form into a div (insert HTML elements): return a promise with a formId
- KR.showForm(formId): display an hidden form
- KR.hideForm(formId): hide a visible form
- KR.removeForms(): Remove all existing forms and events
- KR.attachForm([CLASS OR ID]): Scan a DOM and attach the library to an existing DOM, return a formId

See Lyra [Javascript library reference][JS Reference] for all complete reference guide.

## Using embedded-form-glue with javascript frameworks

Using embedded-form-glue javascript library is quite easy. Take a look to the
following examples to see how to deal with:

| Framework | Description                                                                |
| --------- | -------------------------------------------------------------------------- |
| vue.js    | [vue example using vue-cli](examples/vuejs/minimal-example)                |
| react.js  | [react example using create-react-app](#)  (work in progress)              |
| angular   | [angular example using Angular CLI](#)  (work in progress)                 |

[JS Link]: https://lyra.com/fr/doc/rest/V4.0/javascript/
[JS Reference]: https://lyra.com/fr/doc/rest/V4.0/javascript/features/reference.html