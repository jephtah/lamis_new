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
  devServer: {
    contentBase: path.join(__dirname, "public"),
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/main/public/index.html",
      filename: "./index.html",
    }),
  ],
};