const path = require('path')

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react']
        }
      }
    ]
  },
  devServer: {
    port: 8080,
    host: "0.0.0.0",
    contentBase: path.resolve(__dirname, 'dist'),
    historyApiFallback: true,
  }
}