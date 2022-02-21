// Type definitions for lyra/embedded-form-glue
// Project: https://github.com/lyra/embedded-form-glue
// TypeScript Version: 4.5.2

declare module "@lyracom/embedded-form-glue" {
    const KRGlue: KRGlue;
    export default KRGlue;
}

declare interface KRGlue {
    /**
     * @summary Loads kr-payment-form library
     */
    loadLibrary: (endpoint: string, key: string, formToken?: string) => Promise<{ KR: KR }>;
}

declare interface KR {
    /**
     * @summary Set form configuration.
     */
    setFormConfig: (config: KRConfig) => Promise<{ KR: KR }>;
    /**
     * @summary Set form token.
     */
    setFormToken: (formToken: string) => Promise<{ KR: KR }>;
    /**
     * @summary Set shop name.
     */
    setShopName: (shopName: string) => Promise<{ KR: KR }>;
    /**
     * @summary Set help buttons visibility.
     */
    setHelpVisibility: (formId: string, visibility: boolean) => Promise<{ KR: KR }>;
    /**
     * @summary Add a form.
     */
    addForm: (formSelector: string) => Promise<{ KR: KR, result: {formId: string} }>;
    /**
     * @summary Attach a form to the given selector.
     */
    attachForm: (formSelector: string) => Promise<{ KR: KR, result: {formId: string} }>;
    /**
     * @summary Show form.
     */
    showForm: (formId: string) => Promise<{ KR: KR }>;
    /**
     * @summary Hide form.
     */
    hideForm: (formId: string) => Promise<{ KR: KR }>;
    /**
     * @summary Open popin form.
     */
    openPopin: (formId: string) => Promise<{ KR: KR }>;
    /**
     * @summary Close popin form.
     */
    closePopin: (formId: string) => Promise<{ KR: KR }>;
    /**
     * @summary Validate form.
     */
    validateForm: (formId: string) => Promise<{ KR: KR, result: KRError }>;
    /**
     * @summary Remove all forms.
     */
    removeForms: () => Promise<{ KR: KR }>;
    /**
     * @summary Submit a form.
     */
    submit: () => Promise<{ KR: KR }>;
    /**
     * @summary Error event listener.
     */
    onError: (callback: (error: KRError) => void) => Promise<{ KR: KR }>;
    /**
     * @summary Focus event listener.
     */
    onFocus: (callback: (field: KRField) => void) => Promise<{ KR: KR }>;
    /**
     * @summary Blur event listener.
     */
    onBlur: (callback: (field: KRField) => void) => Promise<{ KR: KR }>;
    /**
     * @summary Form created event listener.
     */
    onFormCreated: (callback: () => void) => Promise<{ KR: KR }>;
    /**
     * @summary Form ready event listener.
     */
    onFormReady: (callback: () => void) => Promise<{ KR: KR }>;
    /**
     * @summary Form valid event listener.
     */
    onFormValid: (callback: () => void) => Promise<{ KR: KR }>;
    /**
     * @summary Form invalid event listener.
     */
    onFormInvalid: (callback: () => void) => Promise<{ KR: KR }>;
    /**
     * @summary Form loaded event listener.
     */
    onLoaded: (callback: () => void) => Promise<{ KR: KR }>;
    /**
     * @summary Form submitted event listener.
     */
    onSubmit: (callback: (response: KRPaymentResponse) => void) => Promise<{ KR: KR }>;
    /**
     * @summary Payment button.
     */
    button: KRButton;
    wallet: KRWallet;
}

/**
 * @summary Payment button
 */
declare interface KRButton {
    /**
     * @summary Payment button click event listener.
     */
     onClick: (callback: () => boolean) => Promise<{ KR: KR }>;
     /**
      * @summary Set payment button label.
      * @param label - Template : Your label %amount-and-currency% for button
      */
     setLabel: (label: string) => Promise<{ KR: KR }>;
     /**
      * @summary Show payment button spinner.
      */
     showSpinner: () => Promise<{ KR: KR }>;
 
     /**
      * @summary Hide payment button spinner.
      */
     hideSpinner: () => Promise<{ KR: KR }>;
 
     /**
      * @summary Disable payment button.
      */
     disable: () => Promise<{ KR: KR }>;
 
     /**
      * @summary Enable payment buttons.
      */
     enable: () => Promise<{ KR: KR }>;
}

/**
 * @summary Form wallet
 */
declare interface KRWallet {
    /**
     * @summary Tab changed form button event listener.
     */
     onTabChange: (callback: (tabName: string) => void) => Promise<{KR: KR}>;
}

/**
 * @summary Form configuration
 */
declare interface KRConfig {
    /**
     * @summary Form token.
     */
    formToken?: string;
    /**
     * @summary Public key.
     */
    'kr-public-key'?: string;
    /**
     * @summary Language used to display the form in Culture format (en-US).
     */
    'kr-language'?: string;
    /**
     * @summary URL to which the form is submitted (POST method) in case of success.
     */
    'kr-post-url-success'?: string;
    /**
     * @summary URL to which the form is submitted (GET method) in case of success.
     */
    'kr-get-url-success'?: string;
    /**
     * @summary URL called when there are no attempts left (POST method).
     */
    'kr-post-url-refused'?: string;
    /**
     * @summary URL called when there are no attempts left (GET method).
     */
    'kr-get-url-refused'?: string;
    /**
     * @summary CVV clean in case of rejected transaction.
     */
    'kr-clear-on-error'?: boolean;
    /**
     * @summary Hide the debug toolbar.
     */
    'kr-hide-debug-toolbar'?: boolean;
    /**
     * @summary Form's read only mode.
     */
    'kr-read-only'?: boolean;
    /**
     * @summary Disables auto initialization for SPA mode.
     */
    'kr-spa-mode'?: boolean;
    /**
     * @summary Form's z-index style.
     */
     'kr-z-index'?: string;
    /**
     * @summary Installments field content label (singular)
     * @param label - Template : Your label [COUNT] for singular installment with [CURRENCY] [AMOUNT]
     *  
     */
     'kr-installments-label-singular'?: string;
    /**
     * @summary Installments field content label (plural)
     * @param label - Template : Your label [COUNT] for plural installment with [CURRENCY] [AMOUNT]
     */
     'kr-installments-label-plural'?: string;
    /**
     * @summary First installment delay field content label (singular)
     * @param label - Template : Your label [COUNT] for singular installment delay
     */
     'kr-first-installment-delay-label-singular'?: string;
    /**
     * @summary First installment delay field content label (plural)
     * @param label - Template : Your label [COUNT] for plural installment delay
     */
     'kr-first-installment-delay-label-plural'?: string;
    /**
     * @summary First installment delay field content label (without)
     */
     'kr-first-installment-delay-label-without'?: string;
    /**
     * @summary Pan field placeholder (card number).
     */
    'kr-placeholder-pan'?: string;
    /**
     * @summary Expiry field placeholder (expiry date).
     */
    'kr-placeholder-expiry'?: string;
    /**
     * @summary Security code field placeholder (CVV).
     */
    'kr-placeholder-security-code'?: string;
    /**
     * @summary ID document type field placeholder.
     */
    'kr-placeholder-identity-document-type'?: string;
    /**
     * @summary ID document number field placeholder.
     */
    'kr-placeholder-identity-document-number'?: string;
    /**
     * @summary Installments field placeholder (default).
     */
    'kr-placeholder-installments-default'?: string;
    /**
     * @summary Installments field placeholder (single payment).
     */
    'kr-placeholder-installments-single-payment'?: string;
    /**
     * @summary Installments field placeholder (single payment and credit card).
     */
    'kr-placeholder-installments-single-payment-credit'?: string;
    /**
     * @summary First installment delay field placeholder.
     */
    'kr-placeholder-first-installment-delay'?: string;
    /**
     * @summary Card holder email field placeholder.
     */
    'kr-placeholder-card-holder-mail'?: string;
    /**
     * @summary Card holder name field placeholder.
     */
    'kr-placeholder-card-holder-name'?: string;
    /**
     * @summary Pan field label (card number).
     */
    'kr-label-pan'?: string;
    /**
     * @summary Expiry field label (expiry date).
     */
    'kr-label-expiry'?: string;
    /**
     * @summary Security code field label (CVV).
     */
    'kr-label-security-code'?: string;
    /**
     * @summary ID document type field label.
     */
    'kr-label-identity-document-type'?: string;
    /**
     * @summary ID document number field label.
     */
    'kr-label-identity-document-number'?: string;
    /**
     * @summary Installments field label.
     */
    'kr-label-installment-number'?: string;
    /**
     * @summary Card holder email field label.
     */
    'kr-label-card-holder-mail'?: string;
    /**
     * @summary Card holder name field label.
     */
    'kr-label-card-holder-name'?: string;
    /**
     * @summary Card register checkbox field label.
     */
    'kr-label-register'?: string;
}

/**
 * @summary Form error
 */
declare interface KRError {
    /**
     * @summary Error code.
     */
    errorCode: string;
    /**
     * @summary Error message.
     */
    errorMessage: string;
    /**
     * @summary Detailed error code.
     */
     detailedErrorCode?: string;
     /**
      * @summary Detailed error message.
      */
     detailedErrorMessage?: string;
    /**
     * @summary Field with the error.
     */
    field?: string;
    /**
     * @summary Child errors.
     */
    children?: Array<KRError>;
    /**
     * @summary Error metadata.
     */
     metadata?: Record<string, any>;
}

/**
 * @summary Field.
 */
declare interface KRField {
    formId: string;
    field: string;
}

/**
 * @summary Payment response object.
 */
declare interface KRPaymentResponse {
    /**
     * @summary Response type.
     */
     _type: string;
    /**
     * @summary Hash of the JSON object stored in kr-answer. It allows to verify the authenticity of the response.
     */
    hash: string;
    /**
     * @summary Algorithm used to calculate the hash.
     */
    hashAlgorithm: string;
    /**
     * @summary Type of key used to sign kr-answer. Can be set to sha256_hmac (browser return) or password (IPN).
     */
    hashKey: string;
    /**
     * @summary Server date.
     */
    serverDate: string;
    /**
     * @summary Object containing the payment result in JSON format.
     */
    clientAnswer: KRClientAnswer;
    /**
     * @summary Object containing the payment result in JSON format.
     */
    post: () => KRPaymentIPNResponse;
}

/**
 * @summary Client answer object.
 */
declare interface KRClientAnswer {
    /**
     * @summary Shop identifier.
     */
    shopId: string;
    /**
     * @summary Payment cycle (CLOSED or OPEN).
     */
    orderCycle: string;
    /**
     * @summary Payment status (PAID, UNPAID... ).
     */
    orderStatus: string;
    /**
     * @summary Server date.
     */
    serverDate: string;
}

/**
 * @summary Payment object in IPN format.
 */
declare interface KRPaymentIPNResponse {
    /**
     * @summary Hash of the response object.
     */
    'kr-hash': string;
    /**
     * @summary Hash algorithm of the response object.
     */
    'kr-hash-algorithm': string;
    /**
     * @summary Answer type.
     */
    'kr-answer-type': string;
    /**
     * @summary Answer data.
     */
    'kr-answer': string;
}