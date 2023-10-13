/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const baseConfig = {
  entry: path.resolve(__dirname, './src/index.ts'),
  mode: 'development',
  module: {
    rules: [
      { test: /\.ts$/i, use: 'ts-loader' },
      {
        test: /\.(s[ac]ss|css)$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader', // Добавляем postcss-loader
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                    {
                      overrideBrowserslist: ['last 10 versions', '> 1%'],
                    },
                  ],
                ],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(jpg|png|svg|jpeg|gif)$/i,
        type: 'asset/resource', // Используем asset modules
        generator: {
          filename: 'images/[name][ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../dist'),
    assetModuleFilename: 'images/[hash][ext][query]',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index-en.html'),
      filename: 'index-en.html',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/info.html'),
      filename: 'info.html',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/info-en.html'),
      filename: 'info-en.html',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/support.html'),
      filename: 'support.html',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/support-en.html'),
      filename: 'support-en.html',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/privacy-pol.html'),
      filename: 'privacy-pol.html',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/privacy-pol-en.html'),
      filename: 'privacy-pol-en.html',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './src/images'),
          to: path.resolve(__dirname, '../dist/images'),
        },
      ],
    }),
    new CleanWebpackPlugin(),
  ],
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === 'prod';
  const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

  return merge(baseConfig, envConfig);
};
