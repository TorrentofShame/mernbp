const webpack = require("webpack");
const autoprefixer = require("autoprefixer");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

const helpers = require("./helpers");
const config = require("./config");

const NODE_ENV = process.env.NODE_ENV;
const isProduction = NODE_ENV === "production";

const plugins = [
  new webpack.HotModuleReplacementPlugin(),

  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify(NODE_ENV)
    }
  }),

  new HtmlWebpackPlugin({
    template: helpers.root("client/public/index.html"),
    inject: "body"
  }),

  new CopyWebpackPlugin({
    patterns: [
      {from: helpers.root("client/public")}
    ]
  }),
	
  new ESLintPlugin({
	  extensions: ["js", "jsx"],
	  files: ["client", "server"],
	  emitError: true,
    emitWarning: true
  }),
  
];

if (isProduction) {
  const MiniCssExtractPlugin = require("mini-css-extract-plugin");
  plugins.push(new MiniCssExtractPlugin({
    filename: "css/[name].[hash].css",
    chunkFilename: "css/[id].css"
  }));
}

if (config.pwa_enabled) {
  const WebpackPwaManifest = require("webpack-pwa-manifest");
  plugins.push(new WebpackPwaManifest(config.pwa_manifest));
}

module.exports = {
  entry: {
    "app": [
      helpers.root("client/src/index.js")
    ]
  },

  output: {
    path: helpers.root("dist"),
    publicPath: "/"
  },

  resolve: {
    extensions: [".js", ".jsx", ".json", ".css", ".scss", ".html"],
    alias: {
      "app": "client/src"
    }
  },

  module: {
    rules: [
      { // JS
        test: /\.jsx?$/,
        include: helpers.root("client"),
        use: "babel-loader"
      },

      { // CSS/SCSS
        test: /\.(css|scss)$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            options: {
              "sourceMap": true,
              "importLoaders": 1
            }
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: () => {
                  autoprefixer;
                }
              }
            }
          },
          "sass-loader"
        ]
      }
    ]
  },

  plugins: plugins
};
