'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports['default'] = void 0

var _whenDefined = _interopRequireDefault(require('./tools/whenDefined'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i]
    descriptor.enumerable = descriptor.enumerable || false
    descriptor.configurable = true
    if ('value' in descriptor) descriptor.writable = true
    Object.defineProperty(target, descriptor.key, descriptor)
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps)
  if (staticProps) _defineProperties(Constructor, staticProps)
  Object.defineProperty(Constructor, 'prototype', { writable: false })
  return Constructor
}

var Glue = /*#__PURE__*/ (function () {
  function Glue() {
    _classCallCheck(this, Glue)

    // Singleton
    if (!!Glue.instance) return Glue.instance
    Glue.instance = this
    this._name = 'Krypton Glue'
    this.configuration = {}
    this.domain = null
    this.formToken = null
    this.publicKey = null
    this.loaded = false
    this.loading = false
    return this
  }

  _createClass(Glue, [
    {
      key: 'loadLibrary',
      value: function loadLibrary(domain, publicKey) {
        var formToken =
          arguments.length > 2 && arguments[2] !== undefined
            ? arguments[2]
            : null
        var pubKeyRegex = /^\d{2,8}:(|test)publickey_.+$/g
        if (this.loaded) return this.getKrypton(publicKey)
        if (!domain) return Promise.reject('Domain not defined')
        if (!publicKey) return Promise.reject('Public key not defined') // Domain validation

        try {
          var domainUrl = new URL(domain)
          if (!['http:', 'https:'].includes(domainUrl.protocol))
            throw new Error('Invalid protocol')
          if (domainUrl.port) throw new Error('No port allowed')
          if (domainUrl.search !== '')
            throw new Error('No query params allowed')
          if (domainUrl.pathname !== '/') throw new Error('Invalid path')
        } catch (err) {
          console.error('Domain format should be https://domain.name')
          return Promise.reject(
            '['.concat(domain, '] is not a valid endpoint domain')
          )
        }

        if (!pubKeyRegex.test(publicKey)) {
          console.error('Public key format should be shopId:[test]publickey_*')
          return Promise.reject(
            '['.concat(publicKey, '] is not a valid public key')
          )
        }

        this.domain = domain
        this.publicKey = publicKey
        this.formToken = formToken
        if (this.domain && this.publicKey) return this.loadKryptonClient()
        return Promise.reject('The library cannot be loaded')
      }
    },
    {
      key: 'loadKryptonClient',
      value: function loadKryptonClient() {
        var _this = this

        if (!this.loading) {
          var publicKey = this.publicKey
          var domain = this.domain
          this.loading = true
          var script = document.createElement('script')
          script.type = 'text/javascript' // Domain must end with slash

          if (!/^.+\/$/.test(domain)) domain += '/'
          script.src = ''.concat(
            domain,
            'static/js/krypton-client/V4.0/stable/kr-payment-form.min.js'
          )
          script.setAttribute('kr-public-key', publicKey)
          script.setAttribute('kr-spa-mode', 'true')
          if (this.formToken)
            script.setAttribute('kr-form-token', this.formToken) // Check if the library is already present

          var $script = document.querySelector(
            'script[src="'.concat(script.src, '"]')
          ) // Append it to body if it's not already loaded

          if (!$script && document.body) document.body.appendChild(script)
          else if (!document.body) console.warn('document.body is undefined')
        }

        return new Promise(function (resolve) {
          ;(0, _whenDefined['default'])(window, 'KR', function () {
            ;(0, _whenDefined['default'])(window.KR, 'ready', function () {
              _this.loaded = true
              _this.loading = false
              resolve({
                KR: window.KR
              })
            })
          })
        })
      }
    },
    {
      key: 'getKrypton',
      value: function getKrypton(publicKey) {
        var _this2 = this

        return new Promise(function (resolve, reject) {
          if (publicKey && publicKey !== _this2.publicKey) {
            window.KR.setFormConfig({
              publicKey: publicKey
            })
              .then(resolve)
              ['catch'](reject)
          } else {
            resolve({
              KR: window.KR
            })
          }
        })
      }
    }
  ])

  return Glue
})()

var _default = new Glue()

exports['default'] = _default
