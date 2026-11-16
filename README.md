<!-- BACK TO TOP LINK -->

<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
<div align="center">

[![Build][build-shield]][build-url]
[![NPM][npm-shield]][npm-url]
[![Contributors][contributors-shield]][contributors-url]
[![Quality][quality-shield]][quality-url]
[![Downloads][downloads-shield]][downloads-url]
[![MIT License][license-shield]][license-url]

</div>

<!-- PROJECT LOGO -->
<br />
<div align="center" style="margin-bottom:30px;">
  <a href="https://github.com/lyra/embedded-form-glue">
    <img style="margin-bottom:15px;box-shadow:rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;" src="assets/lyra.svg" alt="Logo">
  </a>

  <h3 align="center">Embedded Form Glue - JavaScript Library</h3>

  <p align="center">
    Integrate Lyra payment form into any web application.
    <br />
    <a href="https://docs.lyra.com/en/rest/V4.0/javascript/"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/lyra/embedded-form-glue#getting-started">Quick Start</a>
    ·
    <a href="https://github.com/lyra/embedded-form-glue/issues">Report Bug</a>
    ·
    <a href="https://github.com/lyra/embedded-form-glue/issues">Request Feature</a>
  </p>
</div>

![SmartForm](./assets/smartform.png)

## About the project

Payment forms must meet PCI-DSS requirements. With a traditional redirect-based integration, customers are sent to a payment page hosted by their bank, where they enter their payment details.

This package lets you embed Lyra's payment form using standard HTML elements. It loads Lyra's [JavaScript library][doc-home] and renders sensitive fields, such as the card number and security code, in iframes.

The **embedded-form-glue** library provides a set of utilities to easily integrate the Payment
form into any web application built with JavaScript frameworks like React, Vue, Angular, Svelte,
Ionic, etc.

## Getting Started

### Prerequisites

Install the current [node.js LTS version](https://nodejs.org/en/).

### Installation

To start using the package, just install it executing the following command:

```bash
npm install --save @lyracom/embedded-form-glue
```

## Usage

### Theme

> **Note**
>
> Starting with v2.0.0, you no longer need to add the theme files manually.
> The `load` method loads the selected theme assets automatically.

For more information about theming, please see [Lyra theming documentation][doc-themes]

### DOM location

After that, define the location where the payment form will be generated in your HTML page:

```html
<div id="myPaymentForm">
  <div class="kr-smart-form" kr-card-form-expanded kr-grid></div>
</div>
```

> **Note**
>
> Specify the element **kr-smart-form** inside the target location to load the Smart Form (any
> kind of payment method).

### JavaScript

Import the library in your javascript file or component with:

```javascript
import KRGlue from '@lyracom/embedded-form-glue'
```

And finally, you can generate the payment form with the following code:

```javascript
/* Integration public key */
const publicKey = '~~CHANGE_ME_PUBLIC_KEY~~'
/* Endpoint. Base domain with its protocol (e.g. https://domain.name, do not include any path after the domain) */
const domain = '~~CHANGE_ME_ENDPOINT~~'

/* Load the theme and library, then get the KR object */
const { KR } = await KRGlue.load({
  domain,
  publicKey,
  theme: 'neon' // default
})
/* Setting configuration */
await KR.setFormConfig({ 'kr-language': 'en-US' })
/* Render the payment form into a given DOM selector */
await KR.renderElements('#myPaymentForm')
```

> **Note**
>
> Replace **`~~CHANGE_ME_PUBLIC_KEY~~`** with your configuration public key.
>
> Replace **`~~CHANGE_ME_ENDPOINT~~`** with your configuration endpoint.

> **Warning**
>
> KR methods use Promises. You should always use **await** or the **then** method when
> calling them. Please see [JavaScript Promises][js-promises] and [Async Functions][js-async-await]
> for more information.

## First transaction

Once the payment form is set up, you will see the skeleton animation. This is because the form is
using the default demo token. To make a real transaction, you need to get a real **formToken**.

To obtain a test **formToken**, call the Charge/CreatePayment web service from your server. This keeps your credentials off the client. Please see the
[NodeJS server example](examples/server/README.md), or visit the following links for more
information:

- [Embedded form quick start][doc-quick-start]
- [embedded form integration guide][doc-integration-guide]
- [Payment REST API reference][doc-api-reference]

Once you have a **formToken**, pass it during the initial load or set it through the returned
`KR` instance:

```javascript
// Pass the form token during the initial load
const { KR } = await KRGlue.load({
  domain,
  publicKey,
  formToken: '~~CHANGE_ME_FORM_TOKEN~~'
})
```

```javascript
// Or set the form token after loading
const { KR } = await KRGlue.load({ domain, publicKey })
await KR.setFormConfig({ formToken: '~~CHANGE_ME_FORM_TOKEN~~' })
```

> **Note**
>
> Replace **`~~CHANGE_ME_FORM_TOKEN~~`** with your form token.

After setting the real **formToken**, the payment form will be displayed with the available payment
methods.

## Methods

### load

Use `load` to configure the endpoint and public key, load the selected theme, and retrieve the
`KR` object. The theme defaults to `neon`; pass `theme: null` to skip theme assets. A form token can
be passed during the initial SDK load.

```javascript
const { KR } = await KRGlue.load({
  domain: 'https://domain.name',
  publicKey: '12345678:publickey_abcdefghi...',
  formToken: 'FORM-TOKEN',
  theme: 'neon'
})
```

To set a form token after loading, use the returned `KR` instance:

```javascript
const { KR } = await KRGlue.load({ domain, publicKey })
await KR.setFormConfig({ formToken: 'FORM-TOKEN' })
```

#### Parameters

| Parameter   | Type                          | Required | Default                                                                               |
| ----------- | ----------------------------- | -------- | ------------------------------------------------------------------------------------- |
| `domain`    | `string`                      | Yes      | None                                                                                  |
| `publicKey` | `string`                      | Yes      | None                                                                                  |
| `formToken` | `string`                      | No       | `undefined` (retains the configured token; on first load, the SDK demo token is used) |
| `theme`     | `'classic' \| 'neon' \| null` | No       | `'neon'` (`null` skips automatic theme loading)                                       |

## KR object

The **KR** object is the main object of the library. It is used to manipulate the payment form.

The available methods and callbacks are described in the following sections.

- [KR methods](./docs/kr_methods.md)
- [KR callbacks](./docs/kr_callbacks.md)

> **Note**
>
> See Lyra [JavaScript library reference][doc-reference] for the complete reference guide.

## JavaScript frameworks integration

Find integration examples for some of the main javascript frameworks in the following links:

| **Framework** | **Description**                                         |
| ------------- | ------------------------------------------------------- |
| vue.js        | [Vue options API example](examples/vue/options)         |
| react.js      | [React example](examples/react)                         |
| angular       | [Angular example](examples/angular)                     |
| svelte        | [Svelte example](examples/svelte)                       |
| next.js       | [Next.js example](examples/next)                        |
| ionic         | [Ionic example](examples/ionic)                         |
| vue.js        | [Vue composition API example](examples/vue/composition) |
| ember.js      | [Ember.js example](examples/ember)                      |

## Customization

The payment form can be customized in many ways. Examples of these customizations include:

- [Use a custom field order](./docs/customization.md#use-a-custom-field-order)
- [Add additional fields](./docs/customization.md#add-additional-fields)
- [Use a different HTML structure](./docs/customization.md#use-a-different-html-structure)

Any of these customizations can be done using the same method **KR.renderElements()**.

> **Note**
>
> Please see the [Field Customization][doc-customization] section of the documentation for more
> information.

<!-- CONTRIBUTING -->

## Contributing

Contributions are welcome and pull requests will be reviewed and taken into account.

### Installation

To compile the library please run the following commands:

```bash
npm install
npm run build
```

### Prepare a tarball and update the examples

1. Create the tarball with:

```bash
npm pack
```

A tarball is created with the version defined in package.json.
Use the `-rc` suffix because the release has not yet been approved.

> For example with `2.0.0-rc`, a file `lyracom-embedded-form-glue-2.0.0-rc.tgz` is generated

2. Move the tarball to the `dist/npm/` folder.

3. For each example in the `examples` folder, update package.json to reference the generated tarball using a relative path.

```json
"@lyracom/embedded-form-glue": "file:../../dist/npm/lyracom-embedded-form-glue-2.0.0-rc.tgz"
```

### Testing

To run the e2e tests, first build the examples with:

```bash
npm run examples:build
npm run examples:prepare
```

In a separate instance, initialize the servers with:

```bash
npm run examples:serve
```

Execute the tests with the command:

```bash
npm run test:e2e
```

<!-- LICENSE -->

## License

Distributed under the MIT License. See the [LICENSE file](./LICENCE.txt) for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[build-shield]: https://img.shields.io/circleci/build/github/lyra/embedded-form-glue?style=for-the-badge&logo=github
[build-url]: https://circleci.com/gh/lyra/embedded-form-glue
[npm-shield]: https://img.shields.io/npm/v/@lyracom/embedded-form-glue?style=for-the-badge&logo=npm
[npm-url]: https://www.npmjs.com/package/@lyracom/embedded-form-glue
[contributors-shield]: https://img.shields.io/github/contributors/lyra/embedded-form-glue.svg?style=for-the-badge&logo=github
[contributors-url]: https://github.com/othneildrew/lyra/embedded-form-glue/graphs/contributors
[quality-shield]: https://img.shields.io/npms-io/quality-score/@lyracom/embedded-form-glue?style=for-the-badge&logo=npm
[quality-url]: https://npms.io/search?q=%40lyracom%2Fembedded-form-glue
[downloads-shield]: https://img.shields.io/npm/dm/@lyracom/embedded-form-glue?style=for-the-badge&logo=npm
[downloads-url]: https://www.npmjs.com/package/@lyracom/embedded-form-glue
[license-shield]: https://img.shields.io/github/license/lyra/embedded-form-glue.svg?style=for-the-badge&logo=github
[license-url]: https://github.com/lyra/embedded-form-glue/blob/master/LICENSE.txt

<!-- DOC LINKS -->

[doc-home]: https://docs.lyra.com/en/rest/V4.0/javascript/
[doc-quick-start]: https://docs.lyra.com/en/rest/V4.0/javascript/quick_start_js.html
[doc-reference]: https://docs.lyra.com/en/rest/V4.0/javascript/features/reference.html
[doc-themes]: https://docs.lyra.com/en/rest/V4.0/javascript/features/themes.html
[doc-integration-guide]: https://docs.lyra.com/en/rest/V4.0/javascript/guide/start.html
[doc-api-reference]: https://docs.lyra.com/en/rest/V4.0/api/reference.html
[doc-customization]: https://docs.lyra.com/en/rest/V4.0/javascript/features/custom_fields.html
[js-promises]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
[js-async-await]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
