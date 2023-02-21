// development config

const { resolve } = require("path");
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = merge(commonConfig, {
  mode: "development",
  output: {
    publicPath: "/",
  },
  devServer: {
    hot: true, // enable HMR on the server
    port : 5000,
    historyApiFallback: true, // fixes error 404-ish errors when using react router :see this SO question: https://stackoverflow.com/questions/43209666/react-router-v4-cannot-get-url
  },
  devtool: "cheap-module-source-map",
  plugins: [new ReactRefreshPlugin()],
  
});