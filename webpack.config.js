'use strict'

const path = require('path')

module.exports = {
  entry: './app/glue.ts',
  devtool: 'source-map',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'kr-payment-form-glue.min.js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: { configFile: 'tsconfig.json' }
        }
      }
    ]
  }
}
