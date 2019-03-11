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

Lyra provides a [Javacript library][JS Link] that helps you to integrate a
payment form using standard HTML components on your website. The library will transform
automatically each sensitive field (Pan, security form) into an IFrame loaded from
Lyra servers. Merchant page will not be able to access the data into the IFrame
loaded on a different domain name.

To allow IFrame loading from Lyra servers, The [Javascript library][JS Link] **must** be loaded from
them. For this reason, it's not possible to add it easily into your package.json file like any
other javascript library.

To make your life easier, we have created a glue library that helps you to
include it into your build: the **embedded-form-glue** library.

The **embedded-form-glue** glue library helps you to deal with:

- async loading of the Lyra [Javascript library][JS Link]
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

First, you need to import the library:

    import KRGlue from "@lyracom/embedded-form-glue";

and Load the lyra Javascript library:

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

## New methods

- KR.addForm([CSS class or id]) : Add a form into a div (insert HTML elements): return a promise with a formId
- KR.showForm(formId): display an hidden form
- KR.hideForm(formId): hide a visible form
- KR.removeForms(): Remove all existing forms and events
- KR.attachForm([CLASS OR ID]): Scan a DOM and attach the library to an existing DOM, return a formId

See Lyra [Javascript library reference][JS Reference] for more details

[JS Link]: https://payzen.io/fr-FR/rest/V4.0/javascript/
[JS Reference]: https://payzen.io/fr-FR/rest/V4.0/javascript/features/reference.html