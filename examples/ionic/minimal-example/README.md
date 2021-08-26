# Payment form with ionic

You will find here a basic payment form integration with ionics

## your first transaction

The payment form is up and ready, you can try to make a transaction using
a test card with the debug toolbar (at the bottom of the page).

If you try to pay, you will have the following error: **CLIENT_998: Demo form, see the documentation**.
It's because the **formToken** you have defined using **payment.page.ts** is set to **DEMO-TOKEN-TO-BE-REPLACED**.

you have to create a **formToken** before displaying the payment form using Charge/CreatePayment web-service.
For more information, please take a look to:

- [Embedded form quick start][js quick start]
- [embedded form integration guide][js integration guide]
- [Payment REST API reference][rest api]

## Run it from github

You can try the current example from the current github repository doing:

```sh
cd examples/ionic/minimal-example
npm install
npm run start
```

[js quick start]: https://lyra.com/fr/doc/rest/V4.0/javascript/quick_start_js.html
[js integration guide]: https://lyra.com/fr/doc/rest/V4.0/javascript/guide/start.html
[rest api]: https://lyra.com/fr/doc/rest/V4.0/api/reference.html
