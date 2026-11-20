export function setConfigValue(config, key, value) {
  config[key] = value
}
export function createStylesheetLink(href) {
  const link = document.createElement('link')
  link.id = 'krglue-theme-css'
  link.href = href
  link.rel = 'stylesheet'
  link.type = 'text/css'
  return link
}
export function createThemeScript(src) {
  const script = document.createElement('script')
  script.id = 'krglue-theme-js'
  script.src = src
  script.type = 'text/javascript'
  return script
}
export function createClientScript(src) {
  const script = document.createElement('script')
  script.id = 'krglue-js'
  script.src = src
  script.type = 'text/javascript'
  script.setAttribute('kr-spa-mode', 'true')
  return script
}
export function getThemeElements(domain, theme) {
  const css = new URL(
    `/static/js/krypton-client/V4.0/ext/${theme}-reset.min.css`,
    domain
  ).toString()
  const js = new URL(
    `/static/js/krypton-client/V4.0/ext/${theme}.js`,
    domain
  ).toString()
  const link = createStylesheetLink(css)
  const script = createThemeScript(js)
  return { link, script }
}
export function getClientScriptElement(domain) {
  const target = new URL(
    '/static/js/krypton-client/V4.0/stable/kr-payment-form.min.js',
    domain
  ).toString()
  return createClientScript(target)
}
function forceAppendLink(element) {
  const current = document.querySelector(`link#${element.id}`)
  if (current instanceof HTMLLinkElement) {
    if (current.href === element.href) return // Same theme already included
    // Different theme, remove it
    document.head.removeChild(current)
  }
  document.head.appendChild(element)
}
function forceAppendScript(element) {
  const current = document.querySelector(`script#${element.id}`)
  if (current instanceof HTMLScriptElement) {
    if (current.src === element.src) return // Same script already included
    // Different script, remove it
    document.head.removeChild(current)
  }
  document.head.appendChild(element)
}
export function forceAppendElement(element) {
  if (element instanceof HTMLLinkElement) {
    forceAppendLink(element)
  } else if (element instanceof HTMLScriptElement) {
    forceAppendScript(element)
  }
}
export function onceLoaded(element) {
  return new Promise((resolve, reject) => {
    element.onload = () => resolve()
    element.onerror = () => reject()
  })
}
