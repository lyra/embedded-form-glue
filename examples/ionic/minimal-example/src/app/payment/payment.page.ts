import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import KRGlue from "@lyracom/embedded-form-glue";


@Component({
  selector: 'app-payment',
  templateUrl: 'payment.page.html',
  styleUrls: [
    "./payment.page.scss",
  ],
})
export class PaymentPage implements AfterViewInit {

  message = "";

  constructor(
    private http: HttpClient,
    private chRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit(){
    const endpoint = "~~CHANGE_ME_ENDPOINT~~";
    const publicKey = "~~CHANGE_ME_PUBLIC_KEY~~";
    let formToken = "DEMO-TOKEN-TO-BE-REPLACED";

    const observable = this.http.post("http://localhost:3000/createPayment", {paymentConf: { amount: 10000, currency: 'USD' }}, {responseType: "text"});

    observable.toPromise().then((resp: any) => {
      formToken = resp
      return KRGlue.loadLibrary(endpoint, publicKey) /* Load the remote library */
    })
    .then(({ KR }) =>
      KR.setFormConfig({
        /* set the minimal configuration */
        formToken: formToken,
        "kr-language": "en-US" /* to update initialization parameter */
      })
    )
    .then(({ KR }) => KR.onSubmit(this.onSubmit))
    .then(({ KR }) => KR.addForm("#myPaymentForm")) /* add a payment form  to myPaymentForm div*/
    .then(({ KR, result }) => KR.showForm(result.formId)) /* show the payment form */
    .catch(
      error => {
        this.message = error.message + " (see console for more details)";
      }
    );
  }

  private onSubmit = (paymentData: KRPaymentResponse) => {
    this.http.post('http://localhost:3000/validatePayment', paymentData, {responseType: "text"})
    .subscribe((response: any) => {
      if (response) {
        this.message = 'Payment successful!'
        this.chRef.detectChanges();
      }
    })
  }

}
