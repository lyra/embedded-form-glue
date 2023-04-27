# NodeJS Server Example

This is an example of how to create the server side in nodeJS for
the payment form.

## Requirements

You need to install [node.js LTS version](https://nodejs.org/en/).

## Payment hash verification

Payment hash must be validated on the server side to prevent the exposure of your
personal hash key.

### Server side

```js
const express = require('express')
const hmacSHA256 = require('crypto-js/hmac-sha256')
const Hex = require('crypto-js/enc-hex')
const app = express()

// In a separate file
exports.createFormToken = async paymentConf => {
  // format: 123456789
  const username = '~~CHANGE_ME_USER~~'

  // format: testprivatekey_XXXXXXX
  const password = '~~CHANGE_ME_PASSWORD~~'

  // format: api.my.psp.domain.name without https
  const endpoint = '~~CHANGE_ME_ENDPOINT_NO_HTTPS~~'

  const createPaymentEndpoint = `https://${username}:${password}@${endpoint}/api-payment/V4/Charge/CreatePayment`

  try {
    const response = await axios.post(createPaymentEndpoint, paymentConf, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!response?.data?.answer?.formToken) throw response
    return response.data.answer.formToken
  } catch (error) {
    throw error
  }
}
/**
 * Generates a payment token for the given configuration
 */
app.post('/createPayment', async (req, res) => {
  const paymentConf = req.body.paymentConf

  try {
    const formToken = await createFormToken(paymentConf)
    res.send(formToken)
  } catch (error) {
    res.status(500).send(error)
  }
})

(...)
// Validates the given payment data (hash)
app.post('/validatePayment', (req, res) => {
  const answer = req.body.clientAnswer
  const hash = req.body.hash
  const answerHash = Hex.stringify(
    hmacSHA256(JSON.stringify(answer), 'CHANGE_ME: HMAC SHA256 KEY')
  )
  if (hash === answerHash) res.status(200).send('Valid payment')
  else res.status(500).send('Payment hash mismatch')
})
(...)
```

### Client side

```js
await KR.onSubmit(paymentData => {
  const response = await fetch('http://localhost:3000/validatePayment', {
    method: "POST",
    body: JSON.stringify(paymentData)
  })

  if (response.status === 200) this.message = 'Payment successful!'
  return false
})
```

## Run it from github

You can run the example node.js server by running:

```sh
cd examples/server
npm i
npm run start
```