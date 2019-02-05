# embedded-form-flue javascript library

The **embedded-form-flue** helps you to integrate a payment form into your favorite
framekwork easily using npm or any similar tools.

## Context

Any creditcard payment form should comply with PCI-DSS requirements. A classical integration
displays the payment form on the bank page using a redirection. In this case, 
PCI-DSS requirements are done by your bank.

If you want to integrate a payment form on your web-page, and get it easier with PCI-DSS, you
should use IFrames. 

Lyra Payment form javascript library helps you to integrate a payment form using standard
HTML components on your web-site. It will transform automatically each sensitive field 
(Pan, security form) into an IFrame. Merchant page can't access the data into the IFrame
loaded on a different domain name.

The payment form component is based on a REST API provided by Lyra. Full documentation can
be found here: [TODO]

The Lyra payment form javascript component has to be loaded from Lyra server. It's
not possible to add it easily into your package.json file like any other javascript library.

To make your life easier, we have created a glue library that help you to include it into
your build: the **embedded-form-flue**.

The **embedded-form-flue** glue library helps you to deal with:

- async loading of the payment form javascript component 
- help to manage configuration if the component is not yet loaded
- preload payment form element to display it quickly for slow network
- helpers to add, display and remove the payment form

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

    KRGlue.loadLibrary().then( function(KR) {
        /* do your stuff here */
    });

for more details, see [TODO]