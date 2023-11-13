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
   * @param endpoint - API endpoint
   * @param publicKey - Public key
   * @param formToken? - Form token
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
   */
  attachForm: (
    formSelector: string
  ) => Promise<{ KR: KR; result: { formId: string } }>
  /**
   * Renders KR  in the given selector or HTML element.
   * @param $elements - Form query selector or HTML element or array of HTML elements or undefined
   */
  renderElements: (
    $elements: string | HTMLElement | Array<HTMLElement> | undefined
  ) => Promise<{ KR: KR; result: { formId: string } }>
  /**
   * Show form.
   * @param formId - Form id
   */
  showForm: (formId: string) => Promise<{ KR: KR }>
  /**
   * Hide form.
   * @param formId - Form id
   */
  hideForm: (formId: string) => Promise<{ KR: KR }>
  /**
   * Open popin form.
   * @param formId - Form id
   */
  openPopin: (formId: string) => Promise<{ KR: KR }>
  /**
   * Close popin form.
   * @param formId - Form id
   */
  closePopin: (formId: string) => Promise<{ KR: KR }>
  /**
   * Validate form.
   * @param formId - Form id
   */
  validateForm: (formId: string) => Promise<{ KR: KR; result: KRError }>
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
  onFormValid: (callback: () => void) => Promise<{ KR: KR }>
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
   */
  onTransactionCreated: (
    callback: (response: KRPaymentResponse) => void | boolean | Promise<boolean>
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
  openPaymentMethod: (paymentMethod: string) => void
  /**
   * Payment button.
   */
  button: KRButton
  wallet: KRWallet
}

/**
 * Payment button
 */
declare interface KRButton {
  /**
   * Payment button click event listener.
   * @param callback - Callback
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
}

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
   * Object containing the payment result in JSON format.
   */
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

declare interface BrandChangeCallBackProps {
  KR: KR
  card: {
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
