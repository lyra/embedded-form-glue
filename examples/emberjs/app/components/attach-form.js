import KRGlue from '@lyracom/embedded-form-glue'
import axios from 'axios'
import Component from '@ember/component';

export default Component.extend({
    message: '',
    ready: false,

    didReceiveAttrs() {
        const endpoint = 'CHANGE_ME: JAVASCRIPT ENDPOINT'
        const publicKey = 'CHANGE_ME: YOUR PUBLIC KEY'
        let formToken = 'DEMO-TOKEN-TO-BE-REPLACED'

        // Generate the form token
        axios
            .post('http://localhost:3000/createPayment', {
                paymentConf: { amount: 10000, currency: 'USD' }
            })
            .then(resp => {
                formToken = resp.data
                KRGlue.loadLibrary(endpoint, publicKey)
            })
            .then(({ KR }) =>
                KR.setFormConfig({
                /* set the minimal configuration */
                formToken: formToken,
                'kr-language': 'en-US' /* to update initialization parameter */
                })
            )
            .then(({ KR }) => KR.onSubmit((paymentData) => {
                axios
                    .post('http://localhost:3000/validatePayment', paymentData)
                    .then(response => {
                        if (response.status === 200) this.message = 'Payment successful!'
                    })
                return false // Return false to prevent the redirection
            })) // Custom payment callback
            .then(({ KR }) =>
                KR.attachForm('#myPaymentForm')
            ) /* create a payment form */
            .then(({ KR, result }) => {
                KR.showForm(result.formId)
                this.ready = true
            }) /* show the payment form */
            .catch(
                error => (this.message = error + ' (see console for more details)')
            )
    },
});