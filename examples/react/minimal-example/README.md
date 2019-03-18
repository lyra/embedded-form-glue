# Payment form from scratch with react-cli

This page explains how-to create a dynamic payment form from scratch using
React and react-cli and embedded-form-glue library.

## Requirements

You need to install [node.js LTS version](https://nodejs.org/en/).

## Create the project

First, create the vue-cli HelloWorld project:

```sh
npx create-react-app minimal-example
```

Enter on the project

```sh
cd minimal-example
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

see the result on http://localhost:3000/

For more  details, see https://cli.vuejs.org/guide/creating-a-project.html

## add the payment form

First you have to add 2 theme files:

| File                  | Description
| --------------------- | ---------------------
| classic-reset.css     | default style applied before the [Lyra Javascript Library][JS Link] is loaded
| classic.js            | theme logic, like waiting annimation on submit button, ...

Add them in public/index.html in the the HEAD section:

```javascript
<!-- theme and plugins. should be loaded in the HEAD section -->º
<link rel="stylesheet"
href="https://api.payzen.eu/static/js/krypton-client/dev/ext/classic-reset.css">
<script
    src="https://api.payzen.eu/static/js/krypton-client/dev/ext/classic.js">
</script>
```

For more information about theming, take a look to [Lyra theming documentation][JS Themes]

Update the src/App.js template on the render method of the class to:

```jsx
class App extends Component {
    render() {
        return (
          <div className="form">
            <h1>Payment form</h1>
              <div className="container">
                <div id="myPaymentForm"></div>
              </div>
          </div>
        )
    }
}
````

Your payment form will be added to #myPaymentForm element.

Update the src/App.css styles to:

```html
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

Add the next to the import section on the src/App.js:

```js
import KRGlue from "@lyracom/embedded-form-glue";
```

We need to create the payment form with KRGlue the next data:

- **Endpoint**: Payment endpoint to use
- **Public key**: Public key of your account
- **Form token**: Form token created for the payment

With this data, we can use the next code to create a new payment form
inside the DOM element #myPaymentForm:


Import the component and create the payment form adding the following in
the componentDidMount method inside the App class:

```javascript
class App extends Component {
    // ...
    componentDidMount() {
        const publicKey = '69876357:testpublickey_DEMOPUBLICKEY95me92597fd28tGD4r5';
        const formToken = 'DEMO-TOKEN-TO-BE-REPLACED';

        KRGlue.loadLibrary("https://api.payzen.eu", publicKey).then(KR => {
            return KR.setFormConfig({formToken});
        }).then(KR => {
            return KR.onSubmit((response:any) => {
                // The payment response is here
                let paymentResponse = response;
            });
            return KR.addForm("#myPaymentForm");
        }).then(KR => {
            return KR.showForm(KR.result.formId);
        }).catch(err => {
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
