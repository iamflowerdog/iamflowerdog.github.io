
const webpack = require('webpack');
const merge = require('webpack-merge');
const prodConfig = require('./webpack.prod');

const testConfig = {
  plugins: [
    new webpack.DefinePlugin({
      environment: JSON.stringify('test')
    })
  ]
};

module.exports = merge(testConfig, prodConfig);
