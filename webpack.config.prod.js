import path from 'path';
import webpack from 'webpack';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import WebPackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry : {
    vendor: path.resolve(__dirname, 'src/vendor'),
    main: path.resolve(__dirname, 'src/index')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    //generate an external css file with a hash in the filename
    new ExtractTextPlugin('[name].[contenthash].css'),

    //hash the files using MD5 so that their name changes when their content changes
    new WebPackMd5Hash(),

    //use CommonsChunkPlugin to create a separate bundle
    // of vendor libraries so they're cached separately
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),

    //create html file that includes reference to bundled js
    new HtmlWebPackPlugin({
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true,
      //properties you define here are available in index.html
      //using htmlWebpackPlugin.options.varName
      trackJSToken: '262c712922eb4d319fd7d935c2806d40'
    }),

    //eliminate duplicate packages when generating bundle
    new webpack.optimize.DedupePlugin(),

    //minify js
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')}
    ]
  }
};
