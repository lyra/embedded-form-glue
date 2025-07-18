// Type definitions for lyra/embedded-form-glue
// Project: https://github.com/lyra/embedded-form-glue
// TypeScript Version: 4.5.2

declare module '@lyracom/embedded-form-glue' {
  const KRGlue: KRGlue
  export default KRGlue
}

declare interface KRGlue {
  /**
   * Load kr-payment-form library
   * @param endpoint - API endpoint (only the base domain, e.g. https://domain.name)
   * @param publicKey - Public key
   * @param formToken? - Form token
   *
   * @example
   *    const {KR} = await KRGlue.loadLibrary('https://domain.name', '12345678:publickey_abcdefghi...')
   */
  loadLibrary: (
    endpoint: string,
    publicKey: string,
    formToken?: string
  ) => Promise<{ KR: KR }>
}

declare interface KR {
  /**
   * Set form configuration
   * @param config - Form configuration
   */
  setFormConfig: (config: KRConfig) => Promise<{ KR: KR }>
  /**
   * Set form token.
   * @param formToken - Form token
   */
  setFormToken: (formToken: string) => Promise<{ KR: KR }>
  /**
   * Set shop name.
   * @param shopName - Shop name
   */
  setShopName: (shopName: string) => Promise<{ KR: KR }>
  /**
   * Set help buttons visibility.
   * @param formId - Form id
   * @param visibility - Visibility
   */
  setHelpVisibility: (
    formId: string,
    visibility: boolean
  ) => Promise<{ KR: KR }>
  /**
   * Add a form.
   * @param formSelector - Form selector
   * @param formType? - Form type
   */
  addForm: (
    formSelector: string,
    formType?: FormType
  ) => Promise<{ KR: KR; result: { formId: string } }>
  /**
   * Attach a form to the given selector.
   * @param formSelector - Form selector
   *
   * @deprecated Use renderElements instead
   */
  attachForm: (
    formSelector: string
  ) => Promise<{ KR: KR; result: { formId: string } }>
  /**
   * Renders the KR supported elements in the given selector or HTML element.
   * @param $elements - Form query selector or HTML element or array of HTML elements or undefined
   */
  renderElements: (
    $elements: string | HTMLElement | Array<HTMLElement> | undefined
  ) => Promise<{ KR: KR; result: { formId: string } }>
  /**
   * Show form.
   * @param formId - Form id
   */
  showForm: (formId?: string) => Promise<{ KR: KR }>
  /**
   * Hide form.
   * @param formId - Form id
   */
  hideForm: (formId?: string) => Promise<{ KR: KR }>
  /**
   * Open popin form.
   * @param formId - Form id
   */
  openPopin: (formId?: string) => Promise<{ KR: KR }>
  /**
   * Close popin form.
   * @param formId - Form id
   */
  closePopin: (formId?: string) => Promise<{ KR: KR }>
  /**
   * Validate form.
   * @param formId - Form id
   */
  validateForm: (formId?: string) => Promise<{ KR: KR; result: KRError }>
  /**
   * Remove all forms.
   */
  removeForms: () => Promise<{ KR: KR }>
  /**
   * Submit a form.
   */
  submit: () => Promise<{ KR: KR }>
  /**
   * Error event listener.
   * @param callback - Callback
   */
  onError: (callback: (error: KRError) => void) => Promise<{ KR: KR }>
  /**
   * Focus event listener.
   * @param callback - Callback
   */
  onFocus: (callback: (field: KRField) => void) => Promise<{ KR: KR }>
  /**
   * Blur event listener.
   * @param callback - Callback
   */
  onBlur: (callback: (field: KRField) => void) => Promise<{ KR: KR }>
  /**
   * Callback called when the payment form DOM elements are created.
   * @param callback - Callback
   */
  onFormCreated: (callback: () => void) => Promise<{ KR: KR }>
  /**
   * Callback called when the payment form application is loaded.
   * @param callback - Callback
   */
  onLoaded: (callback: () => void) => Promise<{ KR: KR }>
  /**
   * Callback called when the payment form is ready to be submitted.
   * @param callback - Callback
   */
  onFormReady: (callback: () => void) => Promise<{ KR: KR }>
  /**
   * Form valid event listener.
   * @param callback - Callback
   */
  onFormValid: (
    callback: (data: FormValidCallBackProps) => void
  ) => Promise<{ KR: KR }>
  /**
   * Form submitted event listener.
   * @param callback - Callback
   */
  onSubmit: (
    callback: (response: KRPaymentResponse) => void | boolean | Promise<boolean>
  ) => Promise<{ KR: KR }>
  /**
   * Brand changed event listener
   * @param callback - Callback
   */
  onBrandChanged: (
    callback: (data: BrandChangeCallBackProps) => void
  ) => Promise<{ KR: KR }>
  /**
   * Transaction created event listener
   * @param callback - Callback
   * @deprecated Use KR.onOrderUpdate
   */
  onTransactionCreated: (
    callback: (response: KRPaymentResponse) => void | boolean | Promise<boolean>
  ) => Promise<{ KR: KR }>
  /**
   * The KR.onOrderUpdate method receives a callback as a parameter that will be called every time
   * a transaction is created
   * or cancelled (Ticket Restaurant)
   * or refunded (Illicado)
   *
   *It replaces the previously used onTransactionCreated method, which is now deprecated because refunded and cancelled transactions were not supported.
   *The method onOrderUpdate receives only one parameter, a callback function, and returns a successful promise if the callback is correctly set.
   *The callback set by the user may return false or a rejected promise if they want to stop the redirection after a payment is completed. In the case of a partial payment transaction, this return value will be ignored, as there is no redirection until the payment is wholly paid.
   */
  onOrderUpdate: (
    callback: (
      response: onOrderUpdateParamType
    ) => void | boolean | Promise<boolean>
  ) => Promise<{ KR: KR }>

  /**
   * 3ds secure abortion event listener
   * @param callback - Callback
   */
  on3dSecureAbort: (callback: () => void) => Promise<{ KR: KR }>
  /**
   * Popin closed event listener
   * @param callback - Callback
   */
  onPopinClosed: (callback: () => void) => Promise<{ KR: KR }>
  /**
   * Installment change event listener
   * @param callback - Callback
   */
  onInstallmentChanged: (
    callback: (props: InstallmentChangeCallbackProps) => void
  ) => Promise<{ KR: KR }> // TODO installmentInfo
  /**
   * Remove event callbacks
   * @param event - Event name
   */
  removeEventCallbacks: (event: string) => void
  /**
   * Sets brand
   * @param brand - Brand name
   */
  setBrand: (brand: string | null) => void
  /**
   * Force the form validation
   */
  validate: () => void
  /**
   * Open the specified payment method
   * @param paymentMethod - Payment method name
   */
  openPaymentMethod: (paymentMethod: KRPaymentMethod) => void

  /**
   * This method will return an object with the available payment methods and card brands.
   */
  getPaymentMethods: () => Promise<{
    paymentMethods: string[]
    cardBrands: string[]
  }>

  /**
   * Payment button.
   */
  button: KRButton
  smartForm: KRSmartForm
  wallet: KRWallet
  fields: KRFields
  skeleton: KRSkeleton
  overlay: KROverlay
}

/**
 * Payment button
 */
declare interface KRButton {
  /**
   * Payment button click event listener.
   * @param callback - Callback
   * @deprecated Use KR.smartForm.onClick
   */
  onClick: (
    callback: () => void | boolean | Promise<boolean>
  ) => Promise<{ KR: KR }>
  /**
   * Set payment button label.
   * @param label - Template : Your label %amount-and-currency% for button
   */
  setLabel: (label: string) => Promise<{ KR: KR }>
  /**
   * Show payment button spinner.
   */
  showSpinner: () => Promise<{ KR: KR }>

  /**
   * Hide payment button spinner.
   */
  hideSpinner: () => Promise<{ KR: KR }>

  /**
   * Disable payment button.
   */
  disable: () => Promise<{ KR: KR }>

  /**
   * Enable payment buttons.
   */
  enable: () => Promise<{ KR: KR }>

  /**
   * Hide payment buttons
   */
  hide: () => Promise<{ KR: KR }>

  /**
   * Show payment buttons
   */
  show: () => Promise<{ KR: KR }>
}

/**
 * Smart form
 */
declare interface KRSmartForm {
  /**
   * This method allows to add a callback that will intercept several click actions done by the user.
   * If the provided callback returns one of the following:
   * FALSE
   * A promise that eventually resolves to FALSE or returns
   * A promise that eventually gets REJECTED
   * The normal execution will be stopped, any other returned value, even undefined will allow the application to work normally.
   */
  onClick: (
    callback: (p: {
      paymentMethod: string | null
      action: 'beforePaymentStart' | 'openPopin' | 'methodSelected'
      formId: string | null
    }) => void | boolean | Promise<boolean>
  ) => Promise<{ KR: KR }>

  /**
   * This method allows a merchant to manually throw an error that will be displayed in the form.
   */
  throwCustomError: (
    error: string,
    paymentMethod?: KRPaymentMethod
  ) => Promise<{ KR: KR }>
}
/**
 * Form wallet
 */
declare interface KRWallet {
  /**
   * Tab changed form button event listener.
   * @param callback - Callback
   */
  onTabChange: (callback: (tabName: string) => void) => Promise<{ KR: KR }>

  /**
   * In wallet mode some payment method details are saved on the server.
   * The user can delete a payment method using the garbage icon.
   * It is possible to add a callback to be executed when a wallet payment information (token) is deleted.
   */
  onPaymentTokenDeleted: (
    callback: (
      param:
        | {
            /**
             * CARDS token case
             */
            paymentMethod: 'CARDS'
            token: string
            fields: {
              partialPan: string
              expiryDate: string
            }
            email?: undefined
          }
        | {
            /**
             * PAYPAL case
             */
            paymentMethod: 'PAYPAL'
            token: string
            email: string
            fields?: undefined
          }
    ) => void
  ) => Promise<{ KR: KR }>
}

/**
 * Card form fields configuration
 */
declare interface KRFields {
  pan: {
    help: {
      /**
       * It's possible to hide/show the help button from the pan field that appears when a cobranded card is entered.
       */
      button: {
        show: () => Promise<void>
        hide: () => Promise<void>
        restoreDefaultVisibility: () => Promise<void>
      }
    }
  }
  cvv: {
    /**
     * Show the content of the cvv input
     */
    show: () => Promise<void>
    /**
     * Mask the content of the cvv input with bullet points
     */
    hide: () => Promise<void>
  }
  /**
   * It's possible to focus a field from the cardForm. The function takes
   * one parameter, the class of the field to focus.
   * It returns a succesful Promise if the field exists and is focusable.
   */
  focus: (fieldClass: KRFormFieldClass) => Promise<{ KR: KR }>
}

/**
 * It is now possible to force the visibility of the skeleton
 * in all widgets using two methods: KR.skeleton.show() and KR.skeleton.hide().
 * These methods override the default behavior and provide developers
 *  with full control over the skeleton's visibility.
 */
declare interface KRSkeleton {
  show: () => Promise<{ KR: KR }>
  hide: () => Promise<{ KR: KR }>
}

/**
 * It is possible to force the visibillity of the loading overlay using 2 methods: KR.overlay.show() and KR.overlay.hide().
 * These methods override the default behavior.
 * To restore default behavior there is the KR.overlay.restoreDefaultVisibility() method.
 */
declare interface KROverlay {
  show: () => undefined
  hide: () => undefined
  restoreDefaultVisibility: () => undefined
}

declare type KRFormFieldClass =
  | 'kr-pan'
  | 'kr-expiry'
  | 'kr-security-code'
  | 'kr-identity-document-type'
  | 'kr-installment-number'
  | 'kr-first-installment-delay'
  | 'kr-do-register'
  | 'kr-identity-document-number'
  | 'kr-card-holder-name'
  | 'kr-card-holder-mail'

declare type KRPaymentMethod =
  | 'CARDS'
  | 'BIZUM'
  | 'FRANFINANCE'
  | 'FRANFINANCE_3X'
  | 'FRANFINANCE_4X'
  | 'SEPA'
  | 'ALIPAY'
  | 'PROCESOS'
  | 'TRANSBANK'
  | 'PSE'
  | 'EFECTY'
  | 'PAGOEFECTIVO'
  | 'IP_WIRE'
  | 'IP_WIRE_INST'
  | 'SURED'
  | 'INTERRAPIDISIMO'
  | 'BALOTO'
  | 'AVWU'
  | 'MOVIL_RED'
  | 'RED_AVAL'
  | 'EXITO_CASH'
  | 'BANCOLOMBIA_IP'
  | 'NEQUI'
  | 'APPLE_PAY'
  | 'PAYPAL'
  | 'PAYPAL_SB'
  | 'PAYPAL_BNPL'
  | 'PAYPAL_BNPL_SB'
  | 'ALMA_2X'
  | 'ALMA_3X'
  | 'ALMA_4X'
  | 'ALMA_10X'
  | 'ALMA_12X'
  | 'COFIDIS_DFPAY_FR'
  | 'COFIDIS_FRAC_ES'
  | 'COFIDIS_LOAN_BE'
  | 'COFIDIS_LOAN_CB'
  | 'COFIDIS_LOAN_ES'
  | 'COFIDIS_LOAN_FR'
  | 'COFIDIS_LOAN_IT'
  | 'COFIDIS_PAY_FR'
  | 'COFIDIS_4X_ES'
  | 'COFIDIS_4X_FR'
  | 'COFIDIS_3X_BE'
  | 'COFIDIS_3X_FR'
  | 'SICREDI_BOLETO'
  | 'BRADESCO_BOLETO'
  | 'SICOOB_BOLETO'
  | 'PIX'
  | 'PAYCONIQ'
  | 'UPI'
  | 'MULTIBANCO'
  | 'MB_WAY'
  | 'WEBPAY_PLUS'
  | 'GOOGLEPAY'
  | 'ALINEA'
  | 'ALINEA_SB'
  | 'AUCHAN'
  | 'AUCHAN_SB'
  | 'BOULANGER'
  | 'BOULANGER_SB'
  | 'NORAUTO'
  | 'NORAUTO_SB'
  | 'ONEY_10X_12X'
  | 'ONEY_3X_4X'
  | 'ONEY_ENSEIGNE'
  | 'ONEY_PAYLATER'
  | 'PICWIC'
  | 'PICWIC_SB'
  | 'CVCO'
  | 'AKULAKU_PAYLATER'
  | 'ALIPAY_CN'
  | 'ALIPAY_HK'
  | 'BILLEASE'
  | 'BOOST'
  | 'BPI'
  | 'DANA'
  | 'GCASH'
  | 'KAKAOPAY'
  | 'KREDIVO_ID'
  | 'MAYA'
  | 'MPAY'
  | 'RABBIT_LINE_PAY'
  | 'TNG'
  | 'TRUEMONEY'
  | 'FLOA_3X'
  | 'FLOA_4X'
  | 'FLOA_10X'
  | 'FLOA_PAYLATER'
  | 'TRANSFIYA'
  | 'WECHAT_PAY'
  | 'TOSS'
  | 'SAMSUNG_PAY'
  | 'ILLICADO'
  | 'HUB_PISP'
  | 'HUB_PISP_INST'
  | 'DAVIPLATA'
  | 'WERO'

/**
 * Form configuration
 */
declare interface KRConfig {
  /**
   * Form token.
   */
  formToken?: string
  /**
   * Public key.
   */
  'kr-public-key'?: string
  /**
   * Language used to display the form in Culture format (en-US).
   */
  'kr-language'?: string
  /**
   * URL to which the form is submitted (POST method) in case of success.
   */
  'kr-post-url-success'?: string
  /**
   * URL to which the form is submitted (GET method) in case of success.
   */
  'kr-get-url-success'?: string
  /**
   * URL called when there are no attempts left (POST method).
   */
  'kr-post-url-refused'?: string
  /**
   * URL called when there are no attempts left (GET method).
   */
  'kr-get-url-refused'?: string
  /**
   * CVV clean in case of rejected transaction.
   */
  'kr-clear-on-error'?: boolean
  /**
   * Hide the debug toolbar.
   */
  'kr-hide-debug-toolbar'?: boolean
  /**
   * Form's read only mode.
   */
  'kr-read-only'?: boolean
  /**
   * Disables auto initialization for SPA mode.
   */
  'kr-spa-mode'?: boolean
  /**
   * Form's z-index style.
   */
  'kr-z-index'?: string
  /**
   * Installments field content label (singular)
   * @param label - Template : Your label [COUNT] for singular installment with [CURRENCY] [AMOUNT]
   *
   */
  'kr-installments-label-singular'?: string
  /**
   * Installments field content label (plural)
   * @param label - Template : Your label [COUNT] for plural installment with [CURRENCY] [AMOUNT]
   */
  'kr-installments-label-plural'?: string
  /**
   * First installment delay field content label (singular)
   * @param label - Template : Your label [COUNT] for singular installment delay
   */
  'kr-first-installment-delay-label-singular'?: string
  /**
   * First installment delay field content label (plural)
   * @param label - Template : Your label [COUNT] for plural installment delay
   */
  'kr-first-installment-delay-label-plural'?: string
  /**
   * First installment delay field content label (without)
   */
  'kr-first-installment-delay-label-without'?: string
  /**
   * Pan field placeholder (card number).
   */
  'kr-placeholder-pan'?: string
  /**
   * Expiry field placeholder (expiry date).
   */
  'kr-placeholder-expiry'?: string
  /**
   * Security code field placeholder (CVV).
   */
  'kr-placeholder-security-code'?: string
  /**
   * ID document type field placeholder.
   */
  'kr-placeholder-identity-document-type'?: string
  /**
   * ID document number field placeholder.
   */
  'kr-placeholder-identity-document-number'?: string
  /**
   * Installments field placeholder (default).
   */
  'kr-placeholder-installments-default'?: string
  /**
   * Installments field placeholder (single payment).
   */
  'kr-placeholder-installments-single-payment'?: string
  /**
   * Installments field placeholder (single payment and credit card).
   */
  'kr-placeholder-installments-single-payment-credit'?: string
  /**
   * First installment delay field placeholder.
   */
  'kr-placeholder-first-installment-delay'?: string
  /**
   * Card holder email field placeholder.
   */
  'kr-placeholder-card-holder-mail'?: string
  /**
   * Card holder name field placeholder.
   */
  'kr-placeholder-card-holder-name'?: string
  /**
   * Pan field label (card number).
   */
  'kr-label-pan'?: string
  /**
   * Expiry field label (expiry date).
   */
  'kr-label-expiry'?: string
  /**
   * Security code field label (CVV).
   */
  'kr-label-security-code'?: string
  /**
   * ID document type field label.
   */
  'kr-label-identity-document-type'?: string
  /**
   * ID document number field label.
   */
  'kr-label-identity-document-number'?: string
  /**
   * Installments field label.
   */
  'kr-label-installment-number'?: string
  /**
   * Card holder email field label.
   */
  'kr-label-card-holder-mail'?: string
  /**
   * Card holder name field label.
   */
  'kr-label-card-holder-name'?: string
  /**
   * Card register checkbox field label.
   */
  'kr-label-register'?: string

  [key: string]: any
  /**
   * Smartform specific configuration
   */
  smartForm: {
    /**
     * Allows to customize the paymentMethods. Accepted keys: ALL or a payment methods like CARDS
     */
    paymentMethods: {
      [k in 'ALL' | KRPaymentMethod]: {
        /**
         * Allows the merchant to decide if a payment receipt will be shown after the payment.
         * Note that it's not possible to display a payment ticket for a simple card payment.
         * By default the ticket is displayed for non card methods and for partial and split card payments.
         * null represents the default behavior.
         **/
        displayPaymentReceipt: boolean | null
      }
    }
    /**
     * Allowd to define a threshold. If the total number of payment method that should be displayed is (strictly) greater than said threshold, then the payment method are grouped based on our internal configuration.
     * If it's lower or equal, then every payment method is displayed individually.
     */
    groupingThreshold: number
    /**
     * This smartform attribute allows the user to have a hidden smartform. The client can still open the payment methods with KR.openPaymentMethod.
     * Important: For popup payment methods, the KR.openPaymentMethod has to be used in a click event listener or handler.
     * Otherwise some browsers can block the popup.
     */
    hidden: boolean
  }
}

/**
 * Form error
 */
declare interface KRError {
  /**
   * Error code.
   */
  errorCode: string
  /**
   * Error message.
   */
  errorMessage: string
  /**
   * Detailed error code.
   */
  detailedErrorCode?: string
  /**
   * Detailed error message.
   */
  detailedErrorMessage?: string
  /**
   * Field with the error.
   */
  field?: string
  /**
   * Child errors.
   */
  children?: Array<KRError>
  /**
   * Error metadata.
   */
  metadata?: Record<string, any>
}

/**
 * Field.
 */
declare interface KRField {
  formId: string
  field: string
}

/**
 * onOrderUpdate callback param type
 */
declare type onOrderUpdateParamType = {
  clientAnswer: KRClientAnswer
  hash: string
  hashAlgorithm: string
  hashKey: string
  _type: string
} & (
  | {
      _name: 'payment' | 'billingPartialPayment'
      _cancelledTransactionUuid?: undefined
      rawClientAnswer: string
      serverDate: string | null
    }
  | {
      _name: 'partialPaymentCancelledOrRefunded'
      _cancelledTransactionUuid: string
      rawClientAnswer?: undefined
      serverDate?: undefined
    }
)

/**
 * Payment response object.
 */
declare interface KRPaymentResponse {
  /**
   * Response type.
   */
  _type: string
  /**
   * Hash of the JSON object stored in kr-answer. It allows to verify the authenticity of the response.
   */
  hash: string
  /**
   * Algorithm used to calculate the hash.
   */
  hashAlgorithm: string
  /**
   * Type of key used to sign kr-answer. Can be set to sha256_hmac (browser return) or password (IPN).
   */
  hashKey: string
  /**
   * Server date.
   */
  serverDate: string
  /**
   * Object containing the payment result in JSON format.
   */
  clientAnswer: KRClientAnswer
  /**
   * Object containing the payment result in string format.
   */
  rawClientAnswer: string
  formId: string
  post: () => KRPaymentIPNResponse
}

/**
 * Client answer object.
 */
declare interface KRClientAnswer {
  /**
   * Shop identifier.
   */
  shopId: string
  /**
   * Payment cycle (CLOSED or OPEN).
   */
  orderCycle: string
  /**
   * Payment status (PAID, UNPAID... ).
   */
  orderStatus: string
  /**
   * Server date.
   */
  serverDate: string
  /**
   * Payment cycle for CARD transactions (CLOSED or OPEN).
   */
  cardOrderCycle: string
  /**
   * Customer data
   */
  customer: any
  /**
   * Order information (amount, currency...)
   */
  orderDetails: any
  /**
   * Array with transactions inside the current order
   */
  transactions: any[]
}

/**
 * Payment object in IPN format.
 */
declare interface KRPaymentIPNResponse {
  /**
   * Hash of the response object.
   */
  'kr-hash': string
  /**
   * Hash algorithm of the response object.
   */
  'kr-hash-algorithm': string
  /**
   * Answer type.
   */
  'kr-answer-type': string
  /**
   * Answer data.
   */
  'kr-answer': string
}

declare enum FormType {
  Cards = 'cards',
  All = 'all'
}

declare interface FormValidCallBackProps {
  KR: KR
  cardInfo: {
    bin: string
    brand: string
  }
}

declare interface BrandChangeCallBackProps {
  KR: KR
  cardInfo: {
    bin: string
    brand: string
  }
}

declare interface InstallmentChangeCallbackProps {
  KR: KR
  installmentInfo: {
    installmentCount: number
    totalAmount: number
    hasInterests: boolean
    brand: string
  }
}
