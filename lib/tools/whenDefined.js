'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
function whenDefined(context, variableName, callback, interval = 150) {
  const checkVariable = () => {
    if (context[variableName]) {
      callback()
    } else {
      setTimeout(checkVariable, interval)
    }
  }
  setTimeout(checkVariable, 0)
}
exports.default = whenDefined
