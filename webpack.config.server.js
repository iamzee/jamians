const path = require ('path');
const nodeExternals = require ('webpack-node-externals');

module.exports = {
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
};
