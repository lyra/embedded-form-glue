import { HttpClient } from '@angular/common/http'
import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core'
import KRGlue from '@lyracom/embedded-form-glue'
import { firstValueFrom } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title: string = 'Angular example'
  message: string = ''

  constructor(private http: HttpClient, private chRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
    const endpoint = '~~CHANGE_ME_ENDPOINT~~'
    const publicKey = '~~CHANGE_ME_PUBLIC_KEY~~'
    const observable = this.http.post(
      'http://localhost:3000/createPayment',
      { paymentConf: { amount: 10000, currency: 'USD' } },
      { responseType: 'text' }
    )
    firstValueFrom(observable)
      .then((formToken: string) => {
        return KRGlue.load({
          domain: endpoint,
          publicKey,
          formToken,
          theme: 'neon'
        }) /* Load the remote library */
      })
      .then(({ KR }) =>
        KR.setFormConfig({
          /* set the remaining configuration */
          'kr-language': 'en-US' /* to update initialization parameter */
        })
      )
      .then(({ KR }) => KR.onSubmit(this.onSubmit))
      .then(({ KR }) =>
        KR.renderElements('#myPaymentForm')
      ) /* Render the payment form into the specified selector*/
      .catch(error => {
        this.message = error.message + ' (see console for more details)'
      })
  }

  private onSubmit = (paymentData: KRPaymentResponse) => {
    this.http
      .post('http://localhost:3000/validatePayment', paymentData, {
        responseType: 'text'
      })
      .subscribe((response: any) => {
        if (response) {
          this.message = 'Payment successful!'
          this.chRef.detectChanges()
        }
      })
  }
}
