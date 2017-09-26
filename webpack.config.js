var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },
  resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: [".ts", ".tsx", ".js", ".json", ".css", ".scss"]
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'typings-for-css-modules-loader?modules'
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
                loader: 'typings-for-css-modules-loader',
                options: {
                    modules: true,
                    namedExport: true,
                    camelCase: true,
                    sourceMap: false
                }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: false,
                namedExport: true
              }
            }
          ]
        })
      },
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  },
  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new HtmlWebpackPlugin({template: './templates/index.ejs'}),
    new webpack.WatchIgnorePlugin([
      /scss\.d\.ts$/
    ])
  ]
};
