const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.base.config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const SaveAssetsJson = require('assets-webpack-plugin');

config.bail = true;
config.profile = false;
config.devtool = '#source-map';

config.output = {
  path: path.resolve(path.join(__dirname, 'dist')),
  publicPath: process.env.ASSET_CDN ? process.env.ASSET_CDN : '/dist/',
  filename: '[name].bundle.[hash].min.js',
};

config.plugins = config.plugins.concat([
  new ExtractTextPlugin('[name].[contenthash].css'),
  new webpack.DefinePlugin({
    'process.env.LOWDOWN_HOST': `'${process.env.LOWDOWN_HOST}'`,
  }),
  new webpack.optimize.UglifyJsPlugin({ output: { comments: false } }),
  new SaveAssetsJson({
    path: process.cwd(),
    filename: 'assets.json',
  }),
]);

config.module.rules = config.module.rules.concat([
//  {test: /\.js?$/, loaders: [ 'babel'], exclude: /node_modules/}
]);

module.exports = config;
