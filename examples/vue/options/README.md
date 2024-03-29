# Payment form + Vue options API

This page explains how to create a dynamic payment form from scratch using
vue.js, vue-cli and the embedded-form-glue library.

## Requirements

You need to install [node.js LTS version](https://nodejs.org/en/).

## Create the project

Start a new vue project with:

```bash
npm create vue@3
```

More information on [vue-create repository](https://github.com/vuejs/create-vue).

```bash
cd project-name
npm install
# Add the dependency to the project
npm install --save @lyracom/embedded-form-glue
# Run the project
npm run dev
```

## Add the payment form

First you have to add 2 theme files:

| File           | Description                                                                   |
| -------------- | ----------------------------------------------------------------------------- |
| neon-reset.css | default style applied before the [Lyra Javascript Library][js link] is loaded |
| neon.js        | theme logic, like waiting animation on submit button, ...                     |

Add them in public/index.html in the the HEAD section:

```javascript
<!-- theme and plugins. should be loaded in the HEAD section -->
<link rel="stylesheet"
href="https://~~CHANGE_ME_ENDPOINT~~/static/js/krypton-client/V4.0/ext/neon-reset.css">
<script
    src="https://~~CHANGE_ME_ENDPOINT~~/static/js/krypton-client/V4.0/ext/neon.js">
</script>
```

> **NOTE:**
>
> Replace **[CHANGE_ME]** with your credentials and endpoints.

For more information about theming, take a look to [Lyra theming documentation][js themes]

Update the src/App.vue template to:

```html
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>
```

Update the src/components/HelloWorld.vue template to:

```html
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="container">
      <div id="myPaymentForm">
        <!-- if you want only cards, replace kr-smart-form by kr-embedded -->
        <div class="kr-smart-form" kr-card-form-expanded></div>
      </div>
    </div>
  </div>
</template>
```

Your payment form will be added to #myPaymentForm element.

Update the src/components/HelloWorld.vue styles to:

```html
<style scoped>
  .container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
</style>
```

Import the embedded-form-vue component and create the payment form adding
the following in src/components/HelloWorld.vue on the mounted property of the application:

```js
/* import embedded-form-glue library */
import KRGlue from "@lyracom/embedded-form-glue";

export default {
    (...),
    async mounted() {
      /* Use your endpoint and personal public key */
      const endpoint = '~~CHANGE_ME_ENDPOINT_WITH_HTTPS~~'
      const publicKey = '~~CHANGE_ME_PUBLIC_KEY~~'
      const formToken = 'DEMO-TOKEN-TO-BE-REPLACED'

      const { KR } = await KRGlue.loadLibrary(endpoint, publicKey) /* Load the remote library */
      await KR.setFormConfig({       /* set the minimal configuration */
        formToken: formToken,
        'kr-language': 'en-US',                       /* to update initialization parameter */
      })
      await KR.renderElements('#myPaymentForm') /* create a payment form */
    }
    (...)
}
```

## The first transaction

To make the first transaction, please see the [first transaction guide](../../../README.md).

## Payment hash verification

To learn how to verify the payment hash, please see the [payment hash verification information](../../server/README.md).

## Run this example

You can try the current example from the current repository by cloning the repository and executing the following commands:

```bash
cd examples/vue/options
npm i
npm run serve
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
