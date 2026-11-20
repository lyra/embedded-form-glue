import KryptonGlue, { type KRGlue } from './KryptonGlue'

if (typeof window !== 'undefined') {
  const browserWindow = window as Window & { KRGlue?: KRGlue }

  if (!browserWindow.KRGlue) browserWindow.KRGlue = KryptonGlue
}
