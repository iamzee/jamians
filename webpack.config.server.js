const path = require ('path');
const nodeExternals = require ('webpack-node-externals');
const webpack = require ('webpack');

module.exports = {
  mode: 'development',
  target: 'node',
  entry: './server/server.js',
  output: {
    filename: 'server.bundle.js',
    path: path.resolve (__dirname, 'dist'),
    publicPath: '/dist/',
    libraryTarget: 'commonjs2',
  },
  externals: [nodeExternals ()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [new webpack.DefinePlugin ({'global.GENTLY': false})],
  node: {
    __dirname: true,
  },
};
