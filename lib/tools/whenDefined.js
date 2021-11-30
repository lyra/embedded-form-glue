'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports['default'] = void 0

var _default = function _default(context, variableName, cb) {
  var interval =
    arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 150

  var checkVariable = function checkVariable() {
    if (context[variableName]) {
      cb()
    } else {
      setTimeout(checkVariable, interval)
    }
  }

  setTimeout(checkVariable, 0)
}

exports['default'] = _default
