const webpack = require("webpack");
const { merge } = require("webpack-merge");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const helpers = require("./helpers");
const commonConf = require("./webpack.common");

module.exports = merge(commonConf, {
  mode: "production",
  devtool: "source-map",

  output: {
    path: helpers.root("dist/"),
    filename: "js/bundle.js"
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      },
      output: {
        comments: false
      }
    })
  ],
  optimization: {
    minimizer: [
      ...,
      new CssMinimizerPlugin()
    ]
  }
});
