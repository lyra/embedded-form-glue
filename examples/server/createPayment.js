const axios = require('axios').default

exports.createFormToken = async paymentConf => {
  const createPaymentEndpoint = `https://[CHANGE_ME: PRIVATE_KEY]@[CHANGE_ME: ENDPOINT]/V4/Charge/CreatePayment`

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
