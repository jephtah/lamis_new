const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path')


module.exports = {
  entry: "./src/main/js/index.js",
  output: {
    path: path.join(__dirname, "./src/main/public"),
    filename: "bundle.js",
  },
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
        use: [
          // style-loader
          { loader: 'style-loader' },
          // css-loader
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          // sass-loader
          { loader: 'sass-loader' }
        ]
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
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/main/public/index.html",
      filename: "./index.html",
    }),
  ],
};