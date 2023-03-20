# Payment form + Ember.js

This page explains how to create a dynamic payment form from scratch using
ember.js and the embedded-form-glue library.

## Requirements

You need to install [node.js LTS version](https://nodejs.org/en/).

## Create the project

Start a new vue project with:

```bash
npm install -g ember-cli
ember new project-name
```

More information on [ember.js docs](https://guides.emberjs.com/release/getting-started/quick-start/).

```bash
cd project-name
npm install
# Add the dependency to the project
npm install --save @lyracom/embedded-form-glue
# Run the project
npm run start
```

## Add the payment form

First you have to add 2 theme files:

| File              | Description                                                                   |
| ----------------- | ----------------------------------------------------------------------------- |
| neon-reset.css    | default style applied before the [Lyra Javascript Library][js link] is loaded |
| neon.js           | theme logic, like waiting annimation on submit button, ...                    |

Add them in public/index.html in the the HEAD section:

```javascript
<!-- theme and plugins. should be loaded in the HEAD section -->
<link rel="stylesheet"
href="https://~~CHANGE_ME_ENDPOINT~~/static/js/krypton-client/V4.0/ext/neon-reset.css">
<script
    src="https://~~CHANGE_ME_ENDPOINT~~/static/js/krypton-client/V4.0/ext/neon.js">
</script>
```

> **Note**
> 
> Replace **[CHANGE_ME]** with your credentials and end-points.

For more information about theming, take a look to [Lyra theming documentation][js themes]

Update the app/components/attach-form.hbs template to:

```html
<div class='container'>
  <h1>Ember + KR.attachForm</h1>
  <div id='myPaymentForm'>
    <div class='kr-smart-form'></div>
  </div>
  <p data-test='payment-message'>{{this.message}}</p>
</div>

<style>
  .container{ display: flex; flex-direction: column; justify-content: center;
  align-items: center; }
</style>
```

Update the app/components/attach-form.js component to:

```javascript
import KRGlue from '@lyracom/embedded-form-glue';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class AttachFormComponent extends Component {
  @tracked message = '';

  constructor(...args) {
    super(...args);
    const endpoint = '~~CHANGE_ME_ENDPOINT~~';
    const publicKey = '~~CHANGE_ME_PUBLIC_KEY~~';
    let formToken = 'DEMO-TOKEN-TO-BE-REPLACED';

    // Generate the form token
    fetch('http://localhost:3000/createPayment', {
      method: "POST",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        paymentConf: { amount: 10000, currency: 'USD' }
      })
    })
    .then(res => res.text())
    .then((resp) => {
      formToken = resp;
      return KRGlue.loadLibrary(endpoint, publicKey);
    })
    .then(({ KR }) =>
      KR.setFormConfig({
        /* set the minimal configuration */
        formToken: formToken,
        'kr-language': 'en-US' /* to update initialization parameter */,
      })
    )
    .then(({ KR }) =>
      KR.attachForm('#myPaymentForm')
    ) /* create a payment form */
    .then(({ KR, result }) => {
      KR.showForm(result.formId);
    }) /* show the payment form */
    .catch((error) => {
      this.message = error + ' (see console for more details)';
    });
  }
}
```

## Your first transaction

The payment form is up and ready, you can try to make a transaction using
a test card with the debug toolbar (at the bottom of the page).

If you try to pay, you will have the following error: **CLIENT_998: Demo form, see the documentation**.
It's because the **formToken** you have defined using **KR.setFormConfig** is set to **DEMO-TOKEN-TO-BE-REPLACED**.

you have to create a **formToken** before displaying the payment form using Charge/CreatePayment web-service.
For more information, please see:

- [Embedded form quick start][js quick start]
- [embedded form integration guide][js integration guide]
- [Payment REST API reference][rest api]


## Payment hash verification

To learn how to verify the payment hash, please see the [payment hash verification information](../server/README.md).

## Run this example

You can try the current example from the current repository by cloning the repository and executing the following commands:

```bash
cd examples/ember
npm run start
```

To run the example Node.js server, execute the following commands:

```bash
cd examples/server
npm i
npm run start
```

> Remember to replace the **[CHANGE_ME]** values with your credentials and endpoints before executing the project.

[js link]: https://lyra.com/fr/doc/rest/V4.0/javascript
[js themes]: https://lyra.com/fr/doc/rest/V4.0/javascript/features/themes.html
[js quick start]: https://lyra.com/fr/doc/rest/V4.0/javascript/quick_start_js.html
[js integration guide]: https://lyra.com/fr/doc/rest/V4.0/javascript/guide/start.html
[rest api]: https://lyra.com/fr/doc/rest/V4.0/api/reference.html
