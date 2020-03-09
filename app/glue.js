import 'es6-promise/auto'
import KryptonGlue from './KryptonGlue'

if (typeof window != 'undefined') {
  if (!window.KRGlue) window.KRGlue = KryptonGlue
}
