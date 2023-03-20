# Payment form + Ionic

This page explains how to create a dynamic payment form from scratch using
ionic and the embedded-form-glue library.

## Requirements

You need to install [node.js LTS version](https://nodejs.org/en/).

## Create the project

Start a new ionic project with:

```bash
npm install -g @ionic/cli
ionic start
```

More information on [ionic getting started](https://ionicframework.com/docs/intro/cli).

```bash
cd project-name
npm install
# Add the dependency to the project
npm install --save @lyracom/embedded-form-glue
# Run the project
ionic serve
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

Create the src/app/mycomponent/mycomponent.html with:

```html
(...)
<ion-content>
  <div class="form-container">
    <h1>KR.attachForm</h1>
    <div id="myPaymentForm">
      <div class="kr-smart-form" kr-card-form-expanded></div>
    </div>
    <div data-test="payment-message">{{message}}</div>
  </div>
</ion-content>
```

Then, create the src/app/mycomponent/mycomponent.ts with:

```javascript
import { HttpClient } from '@angular/common/http'
import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core'
import KRGlue from '@lyracom/embedded-form-glue'

@Component({
  selector: 'app-payment',
  templateUrl: 'payment.page.html',
  styleUrls: ['./payment.page.scss']
})
export class PaymentPage implements AfterViewInit {
  message = ''

  constructor(private http: HttpClient, private chRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
    const endpoint = '~~CHANGE_ME_ENDPOINT~~'
    const publicKey = '~~CHANGE_ME_PUBLIC_KEY~~'
    let formToken = 'DEMO-TOKEN-TO-BE-REPLACED'

    const observable = this.http.post(
      'http://localhost:3000/createPayment',
      { paymentConf: { amount: 10000, currency: 'USD' } },
      { responseType: 'text' }
    )

    observable
      .toPromise()
      .then((resp: any) => {
        formToken = resp
        return KRGlue.loadLibrary(
          endpoint,
          publicKey
        ) /* Load the remote library */
      })
      .then(({ KR }) =>
        KR.setFormConfig({
          /* set the minimal configuration */
          formToken: formToken,
          'kr-language': 'en-US' /* to update initialization parameter */
        })
      )
      .then(({ KR }) =>
        KR.attachForm('#myPaymentForm')
      ) /* Attach a payment form  to myPaymentForm div*/
      .then(({ KR, result }) =>
        KR.showForm(result.formId)
      ) /* show the payment form */
      .catch(error => {
        this.message = error.message + ' (see console for more details)'
      })
  }
}
```

## The first transaction

To make the first transaction, please see the [first transaction guide](../../README.md).
## Payment hash verification

To learn how to verify the payment hash, please see the [payment hash verification information](../server/README.md).

## Run it from github

You can try the current example from the current github repository doing:

```sh
cd examples/ionic
npm install
npm run start
```

[js quick start]: https://lyra.com/fr/doc/rest/V4.0/javascript/quick_start_js.html
[js integration guide]: https://lyra.com/fr/doc/rest/V4.0/javascript/guide/start.html
[rest api]: https://lyra.com/fr/doc/rest/V4.0/api/reference.html
