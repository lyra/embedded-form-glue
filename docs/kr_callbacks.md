
# KR object callbacks

These are the current available callbacks to manipulate the payment form:

## onError

Callback called when an error occurs: return a `promise` with the `KR` object.

```javascript
const { KR } = await KR.onError((error) => {
  // Handle error
})
```

> **Note**
> 
> Please see the [type definition](../index.d.ts) file for more information about the `error` object.

## onSubmit

Callback called when the payment form is submitted: return a `promise` with the `KR` object.

```javascript
const { KR } = await KR.onSubmit((paymentResponse) => {
  // Handle result
})
```

> **Note**
> 
> Please see the [type definition](../index.d.ts) file for more information about the `paymentResponse` object.

## onFormCreated

Callback called when the payment form DOM elements are created: return a `promise` with the `KR` object.

```javascript
const { KR } = await KR.onFormCreated(() => {
  // Handle result
})
```

## onLoaded

Callback called when the payment form application is loaded: return a `promise` with the `KR` object.

```javascript
const { KR } = await KR.onLoaded(() => {
  // Handle result
})
```

## onFormReady

Callback called when the payment form is ready to be submitted: return a `promise` with the `KR` object.

```javascript
const { KR } = await KR.onFormReady(() => {
  // Handle result
})
```

## onFocus

Callback called when a cards payment form field is focused: return a `promise` with the `KR` object.

```javascript
const { KR } = await KR.onFocus((field) => {
  // Handle result
})
```

> **Note**
> 
> Please see the [type definition](../index.d.ts) file for more information about the `field` object.

## onBlur

Callback called when a cards payment form field loses the focus: return a `promise` with the `KR` object.

```javascript
const { KR } = await KR.onBlur((field) => {
  // Handle result
})
```

> **Note**
> 
> Please see the [type definition](../index.d.ts) file for more information about the `field` object.

## onBrandChanged

Callback called when the brand of a cards payment form field changes: return a `promise` with the 
`KR` object.

```javascript
const { KR } = await KR.onBrandChanged(({ KR, card }) => {
  // Handle result
})
```

> **Note**
> 
> Please see the [type definition](../index.d.ts) file for more information about the `card` object.

## onTransactionCreated

Callback called when a transaction is created: return a `promise` with the `KR` object.

```javascript
const { KR } = await KR.onTransactionCreated((paymentResponse) => {
  // Handle result
})
```

> **Note**
> 
> Please see the [type definition](../index.d.ts) file for more information about the `paymentResponse` object.

## on3dSecureAbort

Callback called when a 3D Secure authentication is aborted: return a `promise` with the `KR` object.

```javascript
const { KR } = await KR.on3dSecureAbort(() => {
  // Handle result
})
```

## onPopinClosed

Callback called when the payment form popin is closed: return a `promise` with the `KR` object.

```javascript
const { KR } = await KR.onPopinClosed(() => {
  // Handle result
})
```

## onInstallmentChanged

Callback called when the installment field value of a cards payment changes: return a `promise` 
with the `KR` object.

```javascript
const { KR } = await KR.onInstallmentChanged(({ KR, installmentInfo }) => {
  // Handle result
})
```

> **Note**
> 
> Please see the [type definition](../index.d.ts) file for more information about the 
> `installmentInfo` object.

## onFormValid

Callback called when the payment form is valid: return a `promise` with the `KR` object.

```javascript
const { KR } = await KR.onFormValid(() => {
  // Handle result
})
```

## button.onClick

Callback called when the cards payment form button is submitted: return a `promise` with the 
`KR` object.

```javascript
const { KR } = await KR.button.onClick(() => {
  // Handle result
})
```

## wallet.onTabChange

Callback called when the wallet payment form tab changes: return a `promise` with the `KR` object.

```javascript
const { KR } = await KR.wallet.onTabChange((tab) => {
  // Handle result
})
```