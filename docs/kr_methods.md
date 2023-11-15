# KR object methods

These are the current available methods to manipulate the payment form:

## renderElements

Render a payment form into a given DOM selector: return a `promise` with the `KR` object and result.

```javascript
const selector = `#myPaymentForm` // DOM selector
const { KR, result } = await KR.renderElements(selector)
```

> **_NOTE:_** if nothing is provided renderElements will search the complete DOM for the supported HTML elements

## attachForm (DEPRECATED use renderElements instead)

Attach a payment form to a given DOM selector: return a `promise` with the `KR` object and result.

```javascript
const selector = `#myPaymentForm` // DOM selector
const { KR, result } = await KR.attachForm(selector)
```

## addForm

Add a payment form to a given DOM selector: return a `promise` with the `KR` object and result.

```javascript
const selector = `#myPaymentForm` // DOM selector
const { KR, result } = await KR.addForm(selector)
```

> **Warning**
>
> Only for cards payment method

## showForm

Display a generated payment form: return a `promise` with the `KR` object.

```javascript
const { result } = await KR.addForm(selector)
const { KR } = await KR.showForm(result.formId)
```

## hideForm

Hide a generated payment form: return a `promise` with the `KR` object.

```javascript
const { result } = await KR.addForm(selector)
const { KR } = await KR.hideForm(result.formId)
```

## setFormConfig

Set the configuration of the payment form on runtime: return a `promise` with the `KR` object.

```javascript
const { KR } = await KR.setFormConfig({
  formToken: `DEMO-TOKEN-TO-BE-REPLACED`,
  language: `en-US`
})
```

> **Note**
>
> Please see the [type definition](../index.d.ts) file for the list of available configuration options.

## validateForm

Validate the payment form: return a `promise` with the `KR` object and validation result.

```javascript
const { KR, result } = await KR.validateForm()
if (result.error) {
  // Handle error
} else {
  // Handle success
}
```

## submit

Submit the payment form: return a `promise` with the `KR` object.

```javascript
const { KR } = await KR.submit()
```

## openPaymentMethod

Open the given payment method: return a `promise` with the `KR` object. The payment method must be
available in the payment form.

```javascript
const { KR } = await KR.openPaymentMethod('cards')
```

## openPopin

On popin mode, open the payment form in a popin: return a `promise` with the `KR` object.

```javascript
const { KR } = await KR.openPopin()
```

## closePopin

On popin mode, close the payment form in a popin: return a `promise` with the `KR` object.

```javascript
const { KR } = await KR.closePopin()
```

## button.setLabel

Sets the label of the submit button: return a `promise` with the `KR` object.

```javascript
const { KR } = await KR.button.setLabel('Pay now')
```

## button.enable

Enable the submit button: return a `promise` with the `KR` object.

```javascript
const { KR } = await KR.button.enable()
```

## button.disable

Disable the submit button: return a `promise` with the `KR` object.

```javascript
const { KR } = await KR.button.disable()
```

## button.showSpinner

Show the loading spinner on the submit button: return a `promise` with the `KR` object.

```javascript
const { KR } = await KR.button.showSpinner()
```

## button.hideSpinner

Hide the loading spinner on the submit button: return a `promise` with the `KR` object.

```javascript
const { KR } = await KR.button.hideSpinner()
```

## setBrand

Set a brand on the cards payment form: return a `promise` with the `KR` object.

```javascript
const { KR } = await KR.setBrand('visa')
```

## removeForms

Remove all generated payment forms: return a `promise` with the `KR` object.

```javascript
const { KR } = await KR.removeForms()
```

## removeEventCallbacks

Remove all event callbacks: return a `promise` with the `KR` object.

```javascript
const { KR } = await KR.removeEventCallbacks()
```
