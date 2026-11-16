const axios = require('axios').default

exports.createFormToken = async paymentConf => {
  // format: 123456789
  const username = '69876357'

  // format: testprivatekey_XXXXXXX
  const password = 'testpassword_DEMOPRIVATEKEY23G4475zXZQ2UA5x7M'

  // format: api.my.psp.domain.name without https
  const endpoint = 'api.lyra.com'

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
