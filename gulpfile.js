const replace = require('gulp-replace')
const { src, dest } = require('gulp')

const keyMap = {
  '~~CHANGE_ME_USER~~': '69876357',
  '~~CHANGE_ME_PASSWORD~~': 'testpassword_DEMOPRIVATEKEY23G4475zXZQ2UA5x7M',
  '~~CHANGE_ME_PUBLIC_KEY~~':
    '69876357:testpublickey_DEMOPUBLICKEY95me92597fd28tGD4r5',
  '~~CHANGE_ME_ENDPOINT~~': 'https://api.lyra.com',
  '~~CHANGE_ME_HMAC_SHA256_KEY~~': '38453613e7f44dc58732bad3dca2bca3',
  '~~CHANGE_ME_ENDPOINT_NO_HTTPS~~': 'api.lyra.com'
}

function replaceKeys() {
  let stream = src([
    './examples_build/**/*.html',
    './examples_build/**/*.js',
    '!./examples_build/**/node_modules/**/*js'
  ])
  Object.entries(keyMap).forEach(([key, value]) => {
    stream = stream.pipe(replace(key, value))
  })
  return stream.pipe(dest('./examples_build/'))
}

exports.replaceKeys = replaceKeys
