const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var host = process.env.PORT == 80 ? process.env.HOST : (process.env.HOST + ':' + process.env.PORT);
var apiUrl = process.env.API_URL;

module.exports = {
  entry: './src/devApp.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        include: __dirname
      }, {
        test: /\.(scss|css)$/,
        loaders: [
          "style-loader", "css-loader", "sass-loader"
        ]
      }, {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
        loader: 'url-loader'
      }, { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
        { from: 'index.html', to: 'index.html' },
        { from: 'src/assets/images', to: 'src/assets/images/' }
    ], {
        copyUnmodified: true
    }),
    new ExtractTextPlugin("styles.css")
  ],
  externals: {
    'Config': JSON.stringify({
      host: host,
      assetsPrefix: host + "/src/assets/images",
      apiUrl: apiUrl,
      env: process.env.NODE_ENV
    })
  },
  devServer: {
    contentBase: path.join(__dirname),
    historyApiFallback: true,
    open: true,
    port: process.env.PORT || 3000,
  }
}