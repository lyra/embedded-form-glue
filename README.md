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
PCI-DSS, you can use IFrames.

The [Payment form remote javascript library][JS Link] helps you to integrate a
payment form using standard HTML components on your website. It will transform
automatically each sensitive field (Pan, security form) into an IFrame. Merchant
page can't access the data into the IFrame loaded on a different domain name.

The [Payment form remote javascript library][JS Link] is based on
a [Payment REST API][REST Link].

The [Payment form remote javascript library][JS Link] has to be loaded from Lyra
servers. It's not possible to add it easily into your package.json file like any
other javascript library.

To make your life easier, we have created a glue library that helps you to
include it into your build: the **embedded-form-glue** library.

The **embedded-form-glue** glue library helps you to deal with:

- async loading of the [Payment form remote javascript library][JS Link]
- helps you to manage configuration if the [Payment form remote javascript library][JS Link] is not yet loaded
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

First, you need to import the library:

    [TODO]

Load the remote payment form javascript library:

    const defaultConfig = {
        'kr-public-key': '69876357:testpublickey_DEMOPUBLICKEY95me92597fd28tGD4r5'
        'formToken': 'DEMO-TOKEN-TO-BE-REPLACED',
        };

    KRGlue.loadLibrary('https://api.payzen.eu', defaultConfig.publicKey)          /* Load the remote library */
          .then((KR) => KR.setFormConfig({
            formToken: defaultConfig.formToken,
          })) /* set the minimal configuration */
          .then((KR) => KR.addForm('#myPaymentForm'))    /* create a payment form */
          .then((KR) => KR.showForm(KR.result.formId));    /* show the payment form */

## New methods (work in progress)

- KR.addForm(/*CSS class or id*/) : Add a form into a div (insert HTML elements): return a promise with a formId
- KR.showForm(formId): display an hidden form
- KR.hideForm(formId): hide a visible form
- KR.removeForms(): Remove all existing forms and events
- KR.attachForm([CLASS OR ID]): Scan a DOM and attach the library to an existing DOM, return a formId

[REST Link]: #
[JS Link]: #

