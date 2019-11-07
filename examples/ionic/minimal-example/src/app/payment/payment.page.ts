import { Component, OnInit } from '@angular/core'
import KRGlue from "@lyracom/embedded-form-glue"

@Component({
  selector: 'app-payment',
  templateUrl: 'payment.page.html',
  styleUrls: [
    "./payment.page.scss",
  ],
})
export class PaymentPage implements OnInit {

  constructor() {}

  ngOnInit() {
    const publicKey = '69876357:testpublickey_DEMOPUBLICKEY95me92597fd28tGD4r5';
    const formToken = 'DEMO-TOKEN-TO-BE-REPLACED';

    KRGlue.loadLibrary('https://api.lyra.com', publicKey) /* Load the remote library */
          .then(({KR}) => KR.setFormConfig({                  /* set the minimal configuration */
            formToken: formToken,
            'kr-language': 'en-US',                           /* to update initialization parameter */
          }))
          .then(({KR}) => KR.addForm('#myPaymentForm'))             /* add a payment form  to myPaymentForm div*/
          .then(({KR, result}) => KR.showForm(result.formId));      /* show the payment form */
  }

}
