const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  entry: {
    main: "./assets/js/index.js"
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.min.js"
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/images"
            }
          }
        ]
      },
      {
        test: [/.css$|.scss$/],
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader" },
          {
            loader: "sass-loader",
            options: {
              includePaths: ["node_modules"]
            }
          },
          { loader: "postcss-loader" }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "bundle.min.css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
      favicon: "assets/images/favicon.ico",
      chunks: ["main"],
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      hash: true,
      inject: true
    })
  ]
};
