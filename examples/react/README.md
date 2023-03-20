# Payment form + React

This page explains how to create a dynamic payment form from scratch using
react, react-cli and the embedded-form-glue library.

## Requirements

You need to install [node.js LTS version](https://nodejs.org/en/).

## Create the project

Start a new svelte project with:

```bash
npx create-react-app project-name
```

More information on [react getting started](https://create-react-app.dev/docs/getting-started).

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
| neon-reset.css | default style applied before the [Lyra Javascript Library][js link] is loaded |
| neon.js        | theme logic, like waiting annimation on submit button, ...                    |

Add them in public/index.html in the the HEAD section:

```javascript
<!-- theme and plugins. should be loaded in the HEAD section -->
<link rel="stylesheet"
href="~~CHANGE_ME_ENDPOINT~~/static/js/krypton-client/V4.0/ext/classic-reset.css">
<script
    src="~~CHANGE_ME_ENDPOINT~~/static/js/krypton-client/V4.0/ext/classic.js">
</script>
```

**note**: Replace **[CHANGE_ME]** with your credentials and end-points.

For more information about theming, take a look to [Lyra theming documentation][js themes]

Replace the src/App.css styles to:

```html
h1 { margin: 40px 0 20px 0; width: 100%; text-align: center; } .container {
display: flex; justify-content: center; }
```

Next, update **src/App.js** to:

```js
import { useState, useEffect } from 'react'
import KRGlue from '@lyracom/embedded-form-glue'

export default function MyComponent() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function setupPaymentForm() {
      const endpoint = '~~CHANGE_ME_ENDPOINT~~'
      const publicKey = '~~CHANGE_ME_PUBLIC_KEY~~'
      let formToken = 'DEMO-TOKEN-TO-BE-REPLACED'

      try {
        const res = await fetch('http://localhost:3000/createPayment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paymentConf: { amount: 10000, currency: 'USD' }
          })
        })
        formToken = await res.text()

        const { KR } = await KRGlue.loadLibrary(
          endpoint,
          publicKey
        ) /* Load the remote library */

        await KR.setFormConfig({ /* set the minimal configuration */
          formToken: formToken,
          'kr-language': 'en-US' /* to update initialization parameter */
        })

        const { result } = await KR.attachForm(
          '#myPaymentForm'
        ) /* Attach a payment form  to myPaymentForm div*/

        await KR.showForm(result.formId) /* show the payment form */
      } catch (error) {
        setMessage(error + ' (see console for more details)')
      }
    }

    setupPaymentForm()
  }, [])

  return (
    <div className="form">
      <h1>React + KR.attachForm</h1>
      <div className="container">
        <div id="myPaymentForm">
          <div className="kr-smart-form" kr-card-form-expanded></div>
        </div>
        <div data-test="payment-message">{message}</div>
      </div>
    </div>
  )
}
```

Your payment form will be added to #myPaymentForm element.

## The first transaction

To make the first transaction, please see the [first transaction guide](../../README.md).

## Payment hash verification

To learn how to verify the payment hash, please see the [payment hash verification information](../server/README.md).

## Run it from github

You can try the current example from the current github repository doing:

```sh
cd examples/react
npm install
npm run start
```

You can run the example node.js server by running:

```sh
cd examples/server
npm i
npm run start
```

[js link]: https://lyra.com/fr/doc/rest/V4.0/javascript
[js themes]: https://lyra.com/fr/doc/rest/V4.0/javascript/features/themes.html
[js quick start]: https://lyra.com/fr/doc/rest/V4.0/javascript/quick_start_js.html
[js integration guide]: https://lyra.com/fr/doc/rest/V4.0/javascript/guide/start.html
[rest api]: https://lyra.com/fr/doc/rest/V4.0/api/reference.html
