var path = require('path');
var fs = require('fs');
var nodeExternals = require("webpack-node-externals");

function resolve(filePath) {
  return path.resolve(__dirname, filePath)
}

var babelOptions = {
  "presets": [
    [resolve("../node_modules/babel-preset-es2015"), {"modules": false}]
  ]
}

module.exports = {
  entry: resolve('./Tests.fsproj'),
  output: {
    filename: 'tests.bundle.js',
    path: resolve('../build'),
  },
  target: "node",
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.fs(x|proj)?$/,
        use: {
          loader: "fable-loader",
          options: { babel: babelOptions }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules[\\\/](?!fable)/,
        use: {
          loader: 'babel-loader',
          options: babelOptions
        },
      }
    ]
  },
};
