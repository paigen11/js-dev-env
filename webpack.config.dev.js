import path from 'path';
import HtmlWebPackPlugin from 'html-webpack-plugin';


export default {
  debug: true,
  devtool: 'inline-source-map',
  noInfo: false,
  entry : [
    path.resolve(__dirname, 'src/index.js')
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'src/'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'src')
  },
  plugins: [
    //create html file that includes reference to bundled js
    new HtmlWebPackPlugin({
      template: 'src/index.html',
      inject: true
    })],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loaders: ['style', 'css']}
    ]
  }
};
