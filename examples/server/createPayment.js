const axios = require('axios').default

exports.createFormToken = async (paymentConf, demoId) => {

  /* default values*/
  let username = null
  let password = null
  let endpoint = null

  switch (demoId) {
    default: /* fr-demo */
      username = '69876357'
      password = 'testpassword_DEMOPRIVATEKEY23G4475zXZQ2UA5x7M'
      endpoint = 'api.lyra.com' 
  }

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
