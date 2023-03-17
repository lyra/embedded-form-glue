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