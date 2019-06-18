# Payment form from scratch with nextjs

This page explains how-to create a dynamic payment form from scratch using
next.js with react and embedded-form-glue library.

## Requirements

You need to install [node.js LTS version](https://nodejs.org/en/).

## Create the project

```bash
mkdir next-minimal
cd next-minimal
```

and add **package.json** file with:

```javascript
{
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
  }
}
```

Install deps:

```bash
npm install --save next react react-dom @babel/core @lyracom/embedded-form-glue
```

and add **./pages/index.js**:

```javascript
function Home() {
  return <div>Welcome to Next.js!</div>;
}

export default Home;
```

and then just run **npm run dev** and go to http://localhost:3000.
For more details on [next.js web-site](https://nextjs.org/docs).

## add the payment form

First you have to add 2 theme files:

| File                  | Description
| --------------------- | ---------------------
| classic-reset.css     | default style applied before the [Lyra Javascript Library][JS Link] is loaded
| classic.js            | theme logic, like waiting annimation on submit button, ...

Update **./pages/index.js**: to:

```javascript
import Head from 'next/head';
import React from 'react';
import dynamic from 'next/dynamic';

class IndexPage extends React.Component {

  componentDidMount() {
    import('@lyracom/embedded-form-glue').then((glue) => {
    const publicKey = '69876357:testpublickey_DEMOPUBLICKEY95me92597fd28tGD4r5';
    const formToken = 'DEMO-TOKEN-TO-BE-REPLACED';
    const KRGlue = glue.default;

    KRGlue.loadLibrary('https://api.lyra.com', publicKey) /* Load the remote library */
          .then(({KR}) => KR.setFormConfig({              /* set the minimal configuration */
            formToken: formToken,
            'kr-language': 'en-US',                       /* to update initialization parameter */
          }))
          .then(({KR}) => KR.addForm('#myPaymentForm'))        /* add a payment form  to myPaymentForm div*/
          .then(({KR, result}) => KR.showForm(result.formId)); /* show the payment form */
        });
  }

  render() {
    return (
          <div>
            <Head>
              <title>My page title</title>
              <meta name="viewport" content="initial-scale=1.0, width=device-width" />
              <link rel="stylesheet"
                href="https://api.lyra.com/static/js/krypton-client/V4.0/ext/classic-reset.css"/>
              <script
                  src="https://api.lyra.com/static/js/krypton-client/V4.0/ext/classic.js">
              </script>  
            </Head>
            <div id="myPaymentForm"></div>
          </div>
    )
  }
}

export default IndexPage;
```

For more information about theming, take a look to [Lyra theming documentation][JS Themes]
Your payment form will be added to #myPaymentForm element.

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
npm run serve
```

[JS Link]: https://lyra.com/fr/doc/rest/V4.0/javascript
[JS Themes]: https://lyra.com/fr/doc/rest/V4.0/javascript/features/themes.html
[JS quick start]: https://lyra.com/fr/doc/rest/V4.0/javascript/quick_start_js.html
[JS integration guide]: https://lyra.com/fr/doc/rest/V4.0/javascript/guide/start.html
[REST API]: https://lyra.com/fr/doc/rest/V4.0/api/reference.html
