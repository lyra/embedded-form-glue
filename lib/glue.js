'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const KryptonGlue_1 = __importDefault(require('./KryptonGlue'))
if (typeof window !== 'undefined') {
  const browserWindow = window
  if (!browserWindow.KRGlue) browserWindow.KRGlue = KryptonGlue_1.default
}
