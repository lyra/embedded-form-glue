# Customization

The payment form can be customized in many ways like:

## Use a custom field order

```html
<div id="myPaymentForm">
  <div class="kr-smart-form">
    <div class="kr-embedded">
      <div class="kr-security-code"></div>
      <div class="kr-pan"></div>
      <div class="kr-expiry"></div>
    </div>
  </div>
</div>
```

## Add additional fields

```html
<div id="myPaymentForm">
  <div class="kr-smart-form">
    <div class="kr-embedded">
      <div class="kr-pan"></div>
      <input
        class="kr-theme my-custom-email-field"
        type="text"
        name="email"
        label="email"
        placeholder="Email"
        kr-tab-order="2"
      />
      <div class="kr-expiry"></div>
      <div class="kr-security-code"></div>
      <input
        class="kr-theme my-custom-checkbox-field"
        type="checkbox"
        name="checkbox"
        label="Remember me"
      />
    </div>
  </div>
</div>
```

## Use a different HTML structure

```html
<div id="myPaymentForm">
  <div class="kr-smart-form">
    <div class="kr-embedded">
      <div class="my-custom-wrapper">
        <div class="kr-pan"></div>
        <div class="kr-security-code"></div>
        <div class="my-extra-element"></div>
      </div>
      <div class="kr-expiry"></div>
    </div>
  </div>
</div>
```

Any of these customizations can be done using the same method **KR.renderElements()**.

> **Note**
>
> Please see the [Field Customization][doc-customization] section of the documentation for more
> information.
