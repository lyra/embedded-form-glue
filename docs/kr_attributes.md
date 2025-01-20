# KR attributes

## General

These are the current HTML attributes to configure the payment form:

### kr-public-key

Configure shop public key.

```html
<div class="kr-smart-form" kr-public-key="~~CHANGE_ME_ENDPOINT~~"></div>
```

### kr-form-token

Set the form token returned by Charge/CreatePayment API.

```html
<div class="kr-smart-form" kr-form-token="DEMO-TOKEN-TO-BE-REPLACED"></div>
```

### kr-popin

Integrate the form in popin mode.

```html
<div class="kr-smart-form" kr-popin></div>
```

### kr-language

Set the language: an [IETF BCP 47 language tag](https://en.wikipedia.org/wiki/IETF_language_tag) or an [ISO 693-1](https://en.wikipedia.org/wiki/ISO_639) language code is expected.

```html
<div class="kr-smart-form" kr-language="en-EN"></div>
```

### kr-clear-on-error

Disables the removal of CVV in case of rejected transaction.

> Expected value: `true` | `false`
> Default: `false`

```html
<div class="kr-smart-form" kr-clear-on-error="true"></div>
```

### kr-hide-debug-toolbar

Hides the debug sidebar in test mode.

> Expected value: `true` | `false`
> Default: `false`

```html
<div class="kr-smart-form" kr-hide-debug-toolbar="true"></div>
```

### kr-post-url-success

URL to which the form is submitted (POST method) if successful.

```html
<div class="kr-smart-form" kr-post-url-success="https://domain.com/redirect/success"></div>
```

### kr-get-url-success

URL to which the form is submitted (GET method) if successful.

```html
<div class="kr-smart-form" kr-get-url-success="https://domain.com/redirect/success"></div>
```

### kr-post-url-refused

URL called when all attempts have failed (POST method).

```html
<div class="kr-smart-form" kr-post-url-refused="https://domain.com/redirect/failure"></div>
```

### kr-get-url-refused

URL called when all attempts have failed (GET method).

```html
<div class="kr-smart-form" kr-get-url-refused="https://domain.com/redirect/failure"></div>
```

### kr-read-only

Disable card form.

> Expected value: `true` | `false`
> Default: `false`

```html
<div class="kr-smart-form" kr-read-only="true"></div>
```

### kr-spa-mode

If the value is true, the form is not automatically initialized.

> Expected value: `true` | `false`
> Default: `false`

```html
<div class="kr-smart-form" kr-spa-mode="true"></div>
```

### kr-z-index

Set form z-index.

> Expected value: any valid [CSS z-index value](https://developer.mozilla.org/en-US/docs/Web/CSS/z-index)

```html
<div class="kr-smart-form" kr-z-index="10"></div>
<div class="kr-smart-form" kr-z-index="auto"></div>
```

---

## Fields

### kr-placeholder-pan

Placeholder of the kr-pan field (card number).

```html
<div class="kr-smart-form" kr-placeholder-pan="XXXX XXXX XXXX 1234"></div>
```

### kr-placeholder-expiry

Placeholder of the kr-expiry field (expiry date).

```html
<div class="kr-smart-form" kr-placeholder-expiry="ex : 01/25"></div>
```

### kr-placeholder-security-code

Placeholder of the kr-security-code field (CVV).

```html
<div class="kr-smart-form" kr-placeholder-security-code="XXX"></div>
```

### kr-placeholder-identity-document-type

Placeholder of the ID type field, if required.

```html
<div class="kr-smart-form" kr-placeholder-identity-document-type="Document Type"></div>
```

### kr-placeholder-identity-document-number

Placeholder of the ID number field, if required.

```html
<div class="kr-smart-form" kr-placeholder-identity-document-number="Y12345678Z"></div>
```

### kr-placeholder-card-holder-name

Placeholder of the holder name field if required.

```html
<div class="kr-smart-form" kr-placeholder-card-holder-name="John Doe"></div>
```

### kr-placeholder-card-holder-mail

Placeholder of the e-mail field, if required.

```html
<div class="kr-smart-form" kr-placeholder-card-holder-mail="example@email.com"></div>
```

### kr-placeholder-installments-default

Default payment method field placeholder.

```html
<div class="kr-smart-form" kr-placeholder-installments-default="Single payment"></div>
```

### kr-placeholder-installments-single-payment

Placeholder of the field Payment method when there is only one.

```html
<div class="kr-smart-form" kr-placeholder-installments-single-payment="Single payment (debit)"></div>
```

### kr-placeholder-installments-single-payment-credit

Placeholder of the 'Payment method' field when there is only credit.

```html
<div class="kr-smart-form" kr-placeholder-installments-single-payment-credit="Single payment"></div>
```

### kr-placeholder-first-installment-delay

Placeholder for the "Payment delay" field,

```html
<div class="kr-smart-form" kr-placeholder-first-installment-delay="Payment without deferral"></div>
```

## Fields - specific to Material theme

### kr-label-pan

Animated label of the kr-pan field (card number).

```html
<div class="kr-smart-form" kr-label-pan="Card Number"></div>
```

### kr-label-expiry

Animated label of the kr-expiry field (expiry date).

```html
<div class="kr-smart-form" kr-label-expiry="Expiry date"></div>
```

### kr-label-security-code

Animated label of the kr-security-code (CVV) field.

```html
<div class="kr-smart-form" kr-label-security-code="CVV"></div>
```

### kr-label-identity-document-type

Animated label of the ID type field, if required

```html
<div class="kr-smart-form" kr-label-identity-document-type="ID type"></div>
```

### kr-label-identity-document-number

Animated label of the ID type field, if required.

```html
<div class="kr-smart-form" kr-label-identity-document-number="Document Type"></div>
```

### kr-label-card-holder-name

Animated label of the cardholder name field, if required.

```html
<div class="kr-smart-form" kr-label-card-holder-name="Card Holder Name"></div>
```

### kr-label-card-holder-mail

Animated label of the e-mail field, if required.

```html
<div class="kr-smart-form" kr-kr-label-card-holder-mail="Card Holder Name"></div>
```

### kr-label-installments-number

Animated label of the installments number field, if required.

```html
<div class="kr-smart-form" kr-label-installments-number="Payment mode"></div>
```

### kr-label-do-register

Label of the registration checkbox, if required.

```html
<div class="kr-smart-form" kr-label-do-register="Register my card"></div>
```

### kr-installments-label-singular

Animated label of the 'Payment method' field when there is only one.

> Expected value: any string that may contain `[COUNT]`, `[CURRENCY]` & `[AMOUNT]` variables.

```html
<div class="kr-smart-form" kr-installments-label-singular="My Label [COUNT] with [CURRENCY] [AMOUNT]"></div>
```

### kr-installments-label-plural

Animated label of the "Payment mode" field when there are several.

> Expected value: any string that may contain `[COUNT]`, `[CURRENCY]` & `[AMOUNT]` variables.

```html
<div class="kr-smart-form" kr-installments-label-plural="My Label [COUNT] with [CURRENCY] [AMOUNT]"></div>
```

### kr-first-installment-delay-label-singular

Animated label of the "Payment delay" field when there is only one.

> Expected value: any string that may contain `[COUNT]` variable.

```html
<div class="kr-smart-form" kr-first-installment-delay-label-singular="My Label [COUNT]"></div>
```

### kr-first-installment-delay-label-plural

Animated label of the "Payment delay" field when there are several.

> Expected value: any string that may contain `[COUNT]` variable.

```html
<div class="kr-smart-form" kr-first-installment-delay-label-plural="My Label [COUNT]"></div>
```

### kr-label-first-installment-delay

Animated label of the "Payment delay" field when there is only one.

```html
<div class="kr-smart-form" kr-label-first-installment-delay="en-EN"></div>
```

### kr-first-installment-delay-label-without

Animated label of the "Payment delay" field when there are several.

> Expected value: any string that may contain `[COUNT]` variable.

```html
<div class="kr-smart-form" kr-first-installment-delay-label-without="My Label [COUNT]"></div>
```

---

## SmartForm

### kr-payment-methods

When creating the formToken, this field is used for filtering the compatible payment methods offered by the merchant.

> Expected value: any string that contains the comma separated list of payment methods.

```html
<div class="kr-smart-form" kr-payment-methods="CARDS,IP_WIRE,BIZUM"></div>
```

### kr-card-form-expanded

It defines the display in list mode with embedded card..

```html
<div class="kr-smart-form" kr-card-form-expanded></div>
```

### kr-no-card-logo-header

Hide card payment logos.

```html
<div class="kr-smart-form" kr-no-card-logo-header></div>
```

### kr-other-payment-methods-label

Label value for the "other payment method" section header.

```html
<div class="kr-smart-form" kr-other-payment-methods-label="Pay with another payment methods"></div>
```

### kr-single-payment-button

Payment method selection and payment initiation are two distinct steps.

```html
<div class="kr-smart-form" kr-single-payment-button></div>
```

## SmartForm - Grid specific attributes

### kr-grid

Enable grid mode.

```html
<div class="kr-smart-form" kr-grid></div>
```

### kr-opm-grid-cols

Number of columns in grid mode (if require space is available).

> Expected value: any number of `max`
> Default: `max`

```html
<div class="kr-smart-form" kr-opm-grid-cols="4"></div>
```
