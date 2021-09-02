// Type definitions for lyra/embedded-form-glue
// Project: https://github.com/lyra/embedded-form-glue
// TypeScript Version: 4.3.5

/**
 * @summary TODO.
 * @version 1.0
 */
interface KRGlue {
    /**
     * @summary Allow to load lyra js library.
     */
    loadLibrary: (endpoint: string, key: string, formToken?: string) => Promise<KR>;
}

/**
 * @summary TODO.
 * @version 1.0
 */
interface KR {
    /**
     * @summary Set form configuration.
     */
    setFormConfig: (config: KRConfig) => Promise<KR>;

    /**
     * @summary Set form token.
     */
    setFormToken: (formToken: string) => Promise<KR>;

    /**
     * @summary Set shop name.
     */
    setShopName: (shopName: string) => Promise<KR>;

    /**
     * @summary Set help buttons visibility.
     */
    setHelpVisibility: (formId: string, visibility: boolean) => Promise<KR>;

    /**
     * @summary Add a new form.
     */
    addForm: (formSelector: string) => Promise<KR>;

    /**
     * @summary Attach form to specific selector.
     */
    attachForm: (formSelector: string) => Promise<KR>;

    /**
     * @summary Show form.
     */
    showForm: () => Promise<KR>;

    /**
     * @summary Hide form.
     */
    hideForm: () => Promise<KR>;

    /**
     * @summary Open popin form.
     */
    openPopin: () => Promise<KR>;

    /**
     * @summary Open close form.
     */
    closePopin: () => Promise<KR>;

    /**
     * @summary Validate form.
     */
    validateForm: () => Promise<{ KR: KR, result: KRError }>;

    /**
     * @summary Remove every forms.
     */
    removeForms: () => Promise<KR>;

    /**
     * @summary Submit form.
     */
    submit: () => Promise<KR>;

    /**
     * @summary Error event listener.
     */
    onError: (callback: (error: KRError) => void) => Promise<KR>;

    /**
     * @summary Focus event listener.
     */
    onFocus: (callback: (field: string) => void) => Promise<KR>;

    /**
     * @summary Form creation event listener.
     */
    onFormCreated: (callback: () => void) => Promise<KR>;

    /**
     * @summary Ready form event listener.
     */
    onFormReady: (callback: () => void) => Promise<KR>;

    /**
     * @summary Loaded form event listener.
     */
    onLoaded: (callback: () => void) => Promise<KR>;

    /**
     * @summary Submited form event listener.
     */
    onSubmit: (callback: (response: KRResponse) => boolean) => Promise<KR>;

    /**
     * @summary Brand changed form event listener.
     */
    onBrandChanged: (callback: () => void) => Promise<KR>;

    /**
     * @summary Brand changed form event listener.
     */
    removeEventCallbacks: (eventName: string, callback?: () => void) => Promise<KR>;

    /**
     * @summary Form button object.
     */
    button: KRButton;

    /**
     * @summary Form wallet object.
     */
    wallet: KRWallet;
}

/**
 * @summary Form button object.
 * @version 1.0
 */
interface KRButton {
    /**
     * @summary Clicked form button event listener.
     */
    onClick: (callback: () => boolean) => Promise<KR>;

    /**
     * @summary Set label button.
     */
     setLabel: (label: string) => Promise<KR>;

    /**
     * @summary Shown button spinner.
     */
     showSpinner: () => Promise<KR>;

    /**
     * @summary Hide button spinner.
     */
     hideSpinner: () => Promise<KR>;

    /**
     * @summary Disable button.
     */
     disable: () => Promise<KR>;

     /**
     * @summary Enable buttons.
     */
     enable: () => Promise<KR>;
}

/**
 * @summary Form wallet object.
 * @version 1.0
 */
 interface KRWallet {
    /**
     * @summary Tab changed form button event listener.
     */
     onTabChange: (callback: (tabName: string) => void) => Promise<KR>;
}

/**
 * @summary Form configuration object.
 * @version 1.0
 */
interface KRConfig {
    /**
     * @summary Form unique identifier.
     */
    formToken?: string;

    /**
     * @summary Public key for making a payment.
     */
    'kr-public-key'?: string;

    /**
     * @summary Language used for displaying the form in Culture format (en-US).
     */
    'kr-language'?: string;

    /**
     * @summary URL to which the form is submitted (POST method) in case of success.
     */
    'kr-post-url-success'?: string;

    /**
     * @summary URL to which the form is submitted (POST method) in case of success.
     */
    'kr-get-url-success'?: string;

    /**
     * @summary URL called when all attempts have failed (POST method).
     */
    'kr-post-url-refused'?: string;

    /**
     * @summary URL called when all attempts have failed (GET method).
     */
    'kr-get-url-refused'?: string;

    /**
     * @summary Disables the removal of CVV in case of rejected transaction.
     */
    'kr-clear-on-error'?: boolean;

    /**
     * @summary Hides the debug sidebar in test mode.
     */
    'kr-hide-debug-toolbar'?: boolean;

    /**
     * @summary If true, form is not automatically initialized.
     */
    'kr-spa-mode'?: boolean;

    /**
     * @summary Placeholder of the kr-expiry field (expiry date).
     */
    'kr-placeholder-expiry'?: string;

    /**
     * @summary Placeholder of the kr-pan field (card number).
     */
    'kr-placeholder-pan'?: string;

    /**
     * @summary Placeholder of the kr-security-code field (CVV).
     */
    'kr-placeholder-security-code'?: string;

    /**
     * @summary Placeholder of the ID document type field, if required (LATAM case).
     */
    'kr-placeholder-identity-document-type'?: string;

    /**
     * @summary Placeholder of the ID number field, if required (LATAM case).
     */
    'kr-placeholder-identity-document-number'?: string;

    /**
     * @summary Placeholder of the Payment method field.
     */
    'kr-placeholder-installment-number'?: string;

    /**
     * @summary Placeholder of the e-mail field, if required (LATAM case).
     */
    'kr-placeholder-card-holder-mail'?: string;

    /**
     * @summary Placeholder of the cardholder name field, if required (LATAM case).
     */
    'kr-placeholder-card-holder-name'?: string;

    /**
     * @summary Animated label of the kr-expiry field (expiry date).
     */
    'kr-label-expiry'?: string;

    /**
     * @summary Animated label of the kr-pan field (card number).
     */
    'kr-label-pan'?: string;

    /**
     * @summary Animated label of the kr-security-code (CVV) field.
     */
    'kr-label-security-code'?: string;

    /**
     * @summary Animated label of the ID type field, if required (LATAM case).
     */
    'kr-label-identity-document-type'?: string;

    /**
     * @summary Animated label of the ID number field, if required (LATAM case).
     */
    'kr-label-identity-document-number'?: string;

    /**
     * @summary Animated label of the Payment method field.
     */
    'kr-label-installment-number'?: string;

    /**
     * @summary Animated label of the e-mail field, if required (LATAM case).
     */
    'kr-label-card-holder-mail'?: string;

    /**
     * @summary Animated label of the cardholder name field, if required (LATAM case).
     */
    'kr-label-card-holder-name'?: string;

    /**
     * @summary Animated label of the register checkbox.
     */
    'kr-label-register'?: string;
}

/**
 * @summary Form error object.
 * @version 1.0
 */
interface KRError {
    /**
     * @summary Error identifier.
     */
    errorCode: string;

    /**
     * @summary Error explanation.
     */
    errorMessage: string;

    /**
     * @summary Specific error identifier.
     */
     detailedErrorCode?: string;

     /**
      * @summary Specific error explanation.
      */
     detailedErrorMessage?: string;
 
    /**
     * @summary Field in error.
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
 * @summary Form response object.
 * @version 1.0
 */
interface KRResponse {
    /**
     * @summary Hash of the JSON object stored in kr-answer. It allows to verify the authenticity of the response.
     */
    hash: string;
    
    /**
     * @summary Algorithm used to calculate the hash. Its value is sha256_hmac.
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
     * @summary Object containing the payment result, encoded in JSON.
     */
    clientAnswer: KRClientAnswer;
}

/**
 * @summary Client answer object.
 * @version 1.0
 */
interface KRClientAnswer {
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