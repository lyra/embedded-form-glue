var __ember_auto_import__;(()=>{var e={325:(e,t,o)=>{"use strict"
function n(e,t,o,n=150){const r=()=>{e[t]?o():setTimeout(r,n)}
setTimeout(r,0)}function r(e){if(!e)throw new TypeError("Domain undefined")
try{const t=new URL(e)
if(!["http:","https:"].includes(t.protocol))throw new Error("Invalid protocol")
if(t.port)throw new Error("No port allowed")
if(""!==t.search)throw new Error("No query params allowed")
if("/"!==t.pathname)throw new Error("Invalid path")
if(""!==t.hash)throw new Error("No fragments allowed")}catch(t){console.error("Domain format should be https://domain.name")
const n=`[${e}] is not a valid endpoint domain`
throw t instanceof Error?new Error(`${n}: ${t.message}`):new Error(n)}}function i(e,t,o){e[t]=o}function c(e){e instanceof HTMLLinkElement?function(e){const t=document.querySelector(`link#${e.id}`)
if(t instanceof HTMLLinkElement){if(t.href===e.href)return
document.head.removeChild(t)}document.head.appendChild(e)}(e):e instanceof HTMLScriptElement&&function(e){const t=document.querySelector(`script#${e.id}`)
if(t instanceof HTMLScriptElement){if(t.src===e.src)return
document.head.removeChild(t)}document.head.appendChild(e)}(e)}function s(e){return new Promise((t,o)=>{e.onload=()=>t(),e.onerror=()=>o()})}o.r(t),o.d(t,{default:()=>d})
class a{constructor(){if(this._name="Krypton Glue",this.configuration={domain:null,formToken:null,publicKey:null},this.loaded=!1,this.loading=!1,this.loadedPublicKey=null,a.instance)return a.instance
a.instance=this}configure(e){for(const t of Object.keys(e)){const o=e[t]
void 0!==o&&i(this.configuration,t,o)}}loadTheme(e){return new Promise((t,o)=>{!function(e){if("string"!=typeof e||!e)throw new TypeError("Unspecified theme")
if("classic"!==e&&"neon"!==e&&"material"!==e)throw new TypeError(`Invalid theme "${e}"`)}(e)
const{domain:n}=this.configuration
if(n){r(n)
const{link:i,script:a}=function(e,t){const o=new URL(`/static/js/krypton-client/V4.0/ext/${t}-reset.min.css`,e).toString(),n=new URL(`/static/js/krypton-client/V4.0/ext/${t}.js`,e).toString()
return{link:function(e){const t=document.createElement("link")
return t.id="krglue-theme-css",t.href=e,t.rel="stylesheet",t.type="text/css",t}(o),script:function(e){const t=document.createElement("script")
return t.id="krglue-theme-js",t.src=e,t.type="text/javascript",t}(n)}}(n,e)
Promise.all([s(i),s(a)]).then(()=>t()).catch(e=>o(e)),c(i),c(a)}else o(new Error("Could not load theme: domain is undefined"))})}loadLibrary(e={}){const t=e.domain??this.configuration.domain,o=e.publicKey??this.configuration.publicKey,n=e.formToken??this.configuration.formToken
try{return function(e){if(!e)throw new TypeError("Public key undefined")
if(!/^\d{2,8}:(|test)publickey_.+$/.test(e))throw console.error("Public key format should be shopId:[test]publickey_*"),new Error(`[${e}] is not a valid public key`)}(o),this.loaded?this.getKrypton(o,n):(r(t),this.loadKryptonClient({domain:t,publicKey:o,formToken:n}))}catch(e){return Promise.reject(e)}}loadKryptonClient(e){const{domain:t,publicKey:o,formToken:r}=e
if(!this.loading){this.loading=!0
const e=function(e){return function(e){const t=document.createElement("script")
return t.id="krglue-js",t.src=e,t.type="text/javascript",t.setAttribute("kr-spa-mode","true"),t}(new URL("/static/js/krypton-client/V4.0/stable/kr-payment-form.min.js",e).toString())}(t)
e.setAttribute("kr-public-key",o),r&&e.setAttribute("kr-form-token",r)
const n=document.querySelector(`script[src="${e.src}"]`)
if(!document.body)throw new Error("document.body is undefined")
n||document.body.appendChild(e),this.loadedPublicKey=o}const i=window
return new Promise(e=>{n(i,"KR",()=>{const t=i.KR
n(t,"ready",()=>{this.loadedPublicKey=o,this.loaded=!0,this.loading=!1,e({KR:t})})})})}getKrypton(e,t){const o=window.KR
if(e!==this.loadedPublicKey){const n={publicKey:e}
return t&&(n.formToken=t),o.setFormConfig(n).then(t=>(this.loadedPublicKey=e,t))}return Promise.resolve({KR:o})}}const d=new a},746:(e,t,o)=>{var n,r
e.exports=(n=_eai_d,r=_eai_r,window.emberAutoImportDynamic=function(e){return 1===arguments.length?r("_eai_dyn_"+e):r("_eai_dynt_"+e)(Array.prototype.slice.call(arguments,1))},window.emberAutoImportSync=function(e){return r("_eai_sync_"+e)(Array.prototype.slice.call(arguments,1))},n("__v1-addons__early-boot-set__",[],function(){}),void n("@lyracom/embedded-form-glue",["__v1-addons__early-boot-set__"],function(){return o(325)}))},569:function(e,t){window._eai_r=require,window._eai_d=define}},t={}
function o(n){var r=t[n]
if(void 0!==r)return r.exports
var i=t[n]={exports:{}}
return e[n].call(i.exports,i,i.exports,o),i.exports}o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o(569)
var n=o(746)
__ember_auto_import__=n})()
