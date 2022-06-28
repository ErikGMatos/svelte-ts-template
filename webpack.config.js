const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';
const sveltePreprocess = require('svelte-preprocess');
const preprocessOptions = require('./svelte.config').preprocessOptions;

module.exports = {
  entry: {
    bundle: ['./src/app.ts'],
  },
  resolve: {
    alias: {
      svelte: path.dirname(require.resolve('svelte/package.json')),
    },
    extensions: ['.mjs', '.js', '.ts', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
  },
  output: {
    publicPath: '/',
    path: path.join(__dirname, '/dist'),
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].[id].js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.svelte$/,
        use: {
          loader: 'svelte-loader',
          options: {
            compilerOptions: {
              dev: !prod,
            },
            emitCss: prod,
            hotReload: !prod,
            preprocess: sveltePreprocess(preprocessOptions),
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          prod ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(png|jpe?g|gif|mp4|svg|ttf)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  mode,
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
  ],
  devtool: prod ? false : 'inline-source-map',
  devServer: {
    hot: true,
  },
};
