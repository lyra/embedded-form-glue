var __ember_auto_import__;(()=>{var e={332:(e,t,o)=>{"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0
var r,n=(r=o(323))&&r.__esModule?r:{default:r}
var i=new(function(){function e(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),e.instance?e.instance:(e.instance=this,this._name="Krypton Glue",this.configuration={},this.domain=null,this.formToken=null,this.publicKey=null,this.loaded=!1,this.loading=!1,this)}var t,o
return t=e,o=[{key:"loadLibrary",value:function(e,t){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null
if(this.loaded)return this.getKrypton(t)
if(!e)return Promise.reject("Domain not defined")
if(!t)return Promise.reject("Public key not defined")
try{var r=new URL(e)
if(!["http:","https:"].includes(r.protocol))throw new Error("Invalid protocol")
if(r.port)throw new Error("No port allowed")
if(""!==r.search)throw new Error("No query params allowed")
if("/"!==r.pathname)throw new Error("Invalid path")}catch(t){return console.error("Domain format should be https://domain.name"),Promise.reject("[".concat(e,"] is not a valid endpoint domain"))}return/^\d{2,8}:(|test)publickey_.+$/g.test(t)?(this.domain=e,this.publicKey=t,this.formToken=o,this.domain&&this.publicKey?this.loadKryptonClient():Promise.reject("The library cannot be loaded")):(console.error("Public key format should be shopId:[test]publickey_*"),Promise.reject("[".concat(t,"] is not a valid public key")))}},{key:"loadKryptonClient",value:function(){var e=this
if(!this.loading){var t=this.publicKey,o=this.domain
this.loading=!0
var r=document.createElement("script")
r.type="text/javascript",/^.+\/$/.test(o)||(o+="/"),r.src="".concat(o,"static/js/krypton-client/V4.0/stable/kr-payment-form.min.js"),r.setAttribute("kr-public-key",t),r.setAttribute("kr-spa-mode","true"),this.formToken&&r.setAttribute("kr-form-token",this.formToken),!document.querySelector('script[src="'.concat(r.src,'"]'))&&document.body?document.body.appendChild(r):document.body||console.warn("document.body is undefined")}return new Promise((function(t){(0,n.default)(window,"KR",(function(){(0,n.default)(window.KR,"ready",(function(){e.loaded=!0,e.loading=!1,t({KR:window.KR})}))}))}))}},{key:"getKrypton",value:function(e){var t=this
return new Promise((function(o,r){e&&e!==t.publicKey?window.KR.setFormConfig({publicKey:e}).then(o).catch(r):o({KR:window.KR})}))}}],o&&function(e,t){for(var o=0;o<t.length;o++){var r=t[o]
r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}(t.prototype,o),Object.defineProperty(t,"prototype",{writable:!1}),e}())
t.default=i},44:(e,t,o)=>{"use strict"
var r
Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0
var n=((r=o(332))&&r.__esModule?r:{default:r}).default
t.default=n},323:(e,t)=>{"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,t.default=function(e,t,o){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:150
setTimeout((function n(){e[t]?o():setTimeout(n,r)}),0)}},507:(e,t,o)=>{var r,n
e.exports=(r=_eai_d,n=_eai_r,window.emberAutoImportDynamic=function(e){return 1===arguments.length?n("_eai_dyn_"+e):n("_eai_dynt_"+e)(Array.prototype.slice.call(arguments,1))},window.emberAutoImportSync=function(e){return n("_eai_sync_"+e)(Array.prototype.slice.call(arguments,1))},r("__v1-addons__early-boot-set__",[],(function(){})),void r("@lyracom/embedded-form-glue",["__v1-addons__early-boot-set__"],(function(){return o(44)})))},609:function(e,t){window._eai_r=require,window._eai_d=define}},t={}
function o(r){var n=t[r]
if(void 0!==n)return n.exports
var i=t[r]={exports:{}}
return e[r].call(i.exports,i,i.exports,o),i.exports}o(609)
var r=o(507)
__ember_auto_import__=r})()
