# Payment form from scratch with angular-cli

This page explains how-to create a dynamic payment form from scratch using
Angular and angular-cli and embedded-form-glue library.

## Requirements

You need to install [node.js LTS version](https://nodejs.org/en/).

Next ,install vue-cli:

```bash
npm install -g @angular/cli
# OR
yarn global add @angular/cli
```

More details on [angular-cli web-site](https://angular.io/guide/quickstart).

## Create the project

First, create the angular-cli minimal-example project:

```sh
ng new minimal-example
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
ng serve --open
```

see the result on http://localhost:4200/

## add the payment form

First you have to add 2 theme files:

| File                  | Description
| --------------------- | ---------------------
| classic-reset.css     | default style applied before the [Lyra Javascript Library][JS Link] is loaded
| classic.js            | theme logic, like waiting annimation on submit button, ...

Add them in src/index.html in the the HEAD section:

```javascript
<!-- theme and plugins. should be loaded in the HEAD section -->
<link rel="stylesheet"
href="https://api.lyra.com/static/js/krypton-client/V4.0/ext/classic-reset.css">
<script
    src="https://api.lyra.com/static/js/krypton-client/V4.0/ext/classic.js">
</script>
```

For more information about theming, take a look to [Lyra theming documentation][JS Themes]

Change the src/app/app.component.html template to:

```html
<div class="form">
<h1>{{ title }}</h1>
  <div class="container">
    <div id="myPaymentForm"></div>
  </div>
</div>
````

Your payment form will be added to #myPaymentForm element.

Update the src/app/app.component.css styles to:

```css
h1 {
  margin: 40px 0 20px 0;
  width: 100%;
  text-align: center;
}

.container {
  display: flex;
  justify-content: center;
}
```

## The Form on the component

We need to create the payment form with KRGlue the next data:

- **Endpoint**: Payment endpoint to use
- **Public key**: Public key of your account
- **Form token**: Form token created for the payment

With this data, we can use the next code to create a new payment form
inside the DOM element #myPaymentForm:

Implement the **AfterViewChecked** on your component to be able to
create the form after the DOM has been rendered and load the KRGlue
component.

Add the next to the import section on the src/app/app.component.ts:

```js
import { AfterViewChecked } from '@angular/core';
import KRGlue from "@lyracom/embedded-form-glue";
```


And add the interface to your component. Update the AppComponent class to
extend from it:

```js
export class AppComponent implements AfterViewChecked {
    // ...
}
```

Add the next block to create the block on the **ngAfterViewChecked** of
your component class:

```js
interface Response {
    KR: any
    result: any
}

export class AppComponent implements AfterViewChecked {
    // ...
    ngAfterViewChecked() {
        const publicKey = '69876357:testpublickey_DEMOPUBLICKEY95me92597fd28tGD4r5';
        const formToken = 'DEMO-TOKEN-TO-BE-REPLACED';

        KRGlue.loadLibrary("https://api.lyra.com", publicKey).then((response):Response => {
            return response.KR.setFormConfig({formToken});
        }).then((response):Response => {
            return response.KR.onSubmit((response:any) => {
                // The payment response is here
                let paymentResponse = response;
            });
        }).then((response):Response => {
            return response.KR.addForm("#myPaymentForm");
        }).then((response):Response => {
            return response.KR.showForm(response.result.formId);
        }).catch((err):any => {
            // Any error will be thrown here
        });
    }
    // ...
}
```

**Parts of the call**

### Loading the library

The promise **KRGlue.loadLibrary(endpoint, publicKey)** will load the
library and resolve the promise with KR as response when the Krypton library
is loaded and available on the view.

### Configuring the library

We call **KR.setFormConfig** with a configuration object to set the different
options of the Krypton library. On the first boot, at least "formToke"
should be configured.

### Capturing response

Before creating the form, the callback after the payment is created at this
step with **KR.onSubmit**, after a successfull payment the payment response
will be used as argument on the callback sent to KR.onSubmit function.

### Adding a form to the view

With **KR.addForm** we add a new form to the target container, on the
example #myPaymentForm element. After this form is added, by default is not
visible but present on the DOM.

To be able to see the form we need to call the method **KR.showForm** adding
with the form id returned on the KR.addForm call (KR.result.formId);

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
