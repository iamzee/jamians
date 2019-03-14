const path = require ('path');

module.exports = {
  mode: 'development',
  entry: './client/client.js',
  output: {
    filename: 'client.bundle.js',
    path: path.resolve (__dirname, 'dist'),
    publicPath: '/dist/',
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
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  devtool: 'inline-source-map',
};
