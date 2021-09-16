const express = require('express')
const cors = require('cors')
const { createFormToken } = require('./createPayment')
const hmacSHA256 = require('crypto-js/hmac-sha256')
const Hex = require('crypto-js/enc-hex')
const app = express()
const port = 3000

app.use(cors())

// Body parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

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

/**
 * Validates the given payment data (hash)
 */
app.post('/validatePayment', (req, res) => {
  const answer = req.body.clientAnswer
  const hash = req.body.hash
  const answerHash = Hex.stringify(
    hmacSHA256(JSON.stringify(answer), 'CHANGE_ME: HMAC SHA256 KEY')
  )
  if (hash === answerHash) res.status(200).send('Valid payment')
  else res.status(500).send('Payment hash mismatch')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
