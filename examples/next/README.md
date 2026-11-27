# Payment form + Next.js

This page explains how to create a dynamic payment form from scratch using
next.js and the embedded-form-glue library.

## Requirements

You need to install [node.js LTS version](https://nodejs.org/en/).

## Create the project

Start a new next.js project with:

```bash
npx create-next-app@latest
```

More information on [next.js getting started](https://nextjs.org/docs/getting-started).

```bash
cd project-name
npm install
# Add the dependency to the project
npm install --save @lyracom/embedded-form-glue
# Run the project
npm run dev
```

## Add the payment form

The example loads the theme CSS, JavaScript, and payment library with `KRGlue.load`.

> **Note**
>
> Replace **[CHANGE_ME]** with your credentials and end-points.

For more information about theming, take a look to [Lyra theming documentation][js themes]

Next, update **pages/mypage.js** to:

```js
import Head from 'next/head'
import KRGlue from '@lyracom/embedded-form-glue'
import { useState, useEffect } from 'react'

export default function MyPage() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function setupPaymentForm() {
      const endpoint = '~~CHANGE_ME_ENDPOINT~~'
      const publicKey = '~~CHANGE_ME_PUBLIC_KEY~~'
      try {
        const res = await fetch('http://localhost:3000/createPayment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paymentConf: { amount: 10000, currency: 'USD' }
          })
        })
        const formToken = await res.text()

        const { KR } = await KRGlue.load({
          domain: endpoint,
          publicKey,
          formToken,
          theme: 'neon'
        }) /* Load the remote library */

        await KR.setFormConfig({
          /* set the remaining configuration */
          'kr-language': 'en-US' /* to update initialization parameter */
        })

        await KR.renderElements(
          '#myPaymentForm'
        ) /* Render the payment form into myPaymentForm div*/
      } catch (error) {
        setMessage(error + ' (see console for more details)')
      }
    }

    setupPaymentForm()
  }, [])

  return (
    <div>
      <Head>
        <title>NextJS</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container">
        <h1>NextJS Example</h1>
        <div id="myPaymentForm">
          <div
            className="kr-smart-form"
            kr-card-form-expanded="true"
            kr-grid="true"
          />
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
cd examples/next
npm install
npm run dev
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
