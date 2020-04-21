const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path')


module.exports = {
  entry: "./src/main/js/index.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(css|scss)$/,
        loader: "style-loader!css-loader!sass-loader"
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },
      {
        test: /\.html$#/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
    ],
  },
  devtool: "eval-source-map",
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/main/index.html",
      filename: "./index.html",
    }),
  ],
};