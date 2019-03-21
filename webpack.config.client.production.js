const path = require ('path');

module.exports = {
  mode: 'production',
  entry: './client/client.js',
  output: {
    filename: 'client.bundle.js',
    path: path.resolve (__dirname, 'public', 'bundles'),
    publicPath: '/public',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  devtool: 'source-map',
};
