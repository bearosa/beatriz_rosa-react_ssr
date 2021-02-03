const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpackNodeExternals = require('webpack-node-externals');

module.exports = {
  mode: "development",
  target: 'node',
  entry: ['@babel/polyfill', './src/server/index.js'],
  externals: [webpackNodeExternals()],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './build'),
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
      {
        test: /.tsx?$/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.scss$/,
        use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
        ],
      },
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.scss' ],
  },
  plugins: [
    new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
    })
  ]
};
