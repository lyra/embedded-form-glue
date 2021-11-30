'use strict'

var _KryptonGlue = _interopRequireDefault(require('./KryptonGlue'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

if (typeof window !== 'undefined') {
  if (!window.KRGlue) window.KRGlue = _KryptonGlue['default']
}
