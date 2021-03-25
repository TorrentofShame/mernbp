const webpack = require("webpack");
const { merge } = require("webpack-merge");

const commonConf = require("./webpack.common");

module.exports = merge(commonConf, {
  devtool: "eval-source-map",

  mode: "development",

  entry: {
    "app": [
      "webpack-hot-middleware/client?reload=true"
    ]
  },

  output: {
    filename: "js/[name].[hash].js",
    chunkFilename: "[id].chunk.js"
  },

  devServer: {
    host: "127.0.0.1",
    port: 8080,
    contentBase: "./dist",
    historyApiFallback: true,
    stats: "minimal"
  }
});
