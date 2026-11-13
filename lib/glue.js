import KryptonGlue from './KryptonGlue'
if (typeof window !== 'undefined') {
  const browserWindow = window
  if (!browserWindow.KRGlue) browserWindow.KRGlue = KryptonGlue
}
