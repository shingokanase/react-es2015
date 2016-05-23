'use strict'

const path = require('path');
const webpack = require("webpack");
const env = process.env.NODE_ENV;

const src  = path.resolve(__dirname, 'src')
const dist = path.resolve(__dirname, 'dist')

let config = {

  entry: src + '/index.jsx',

  output: {
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['', '.js']
  },

  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    new webpack.optimize.OccurrenceOrderPlugin()

  ]


}

if (env === 'production') {
  // JS圧縮
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }));
} else {
  // ソースマップ
  config.devtool = 'source-map';
}

module.exports = config;