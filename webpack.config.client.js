const path = require('path');

module.exports = {
  mode: 'development',
  entry: './client/client.js',
  output: {
    filename: 'client.bundle.js',
    path: path.resolve(__dirname, 'public', 'bundles'),
    publicPath: '/public',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(sc|c)ss$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff|ttf|eot|svg|gif)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
        use: ['file-loader'],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff',
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
