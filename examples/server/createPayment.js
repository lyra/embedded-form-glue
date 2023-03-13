const axios = require('axios').default

exports.createFormToken = async paymentConf => {
  // format: 123456789
  const username = "~~CHANGE_ME_USER~~";

  // format: testprivatekey_XXXXXXX
  const password = "~~CHANGE_ME_PASSWORD~~";

  // format: api.my.psp.domain.name without https
  const endpoint = "~~CHANGE_ME_ENDPOINT_NO_HTTPS~~";

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
