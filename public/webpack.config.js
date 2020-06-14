const WebpackPwaManifest = require('webpack-pwa-manifest')
const path = require('path')

const config = {
  entry: {
    app: './assets/js/index.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].bundle.js'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new WebpackPwaManifest({
      fingerprints: false,
      inject: false,
      name: 'Newsy app',
      short_name: 'Newsy',
      description:
        'An application that allows you to view different news articles and save your favorites.',
      background_color: '#01579b',
      theme_color: '#ffffff',
      'theme-color': '#ffffff',
      start_url: '/',
      icons: [
        {
          src: path.resolve('icons/icon-192x192.png'),
          sizes: [192, 512],
          destination: path.join('assets', 'icons')
        }
      ]
    })
  ]
}

module.exports = config
