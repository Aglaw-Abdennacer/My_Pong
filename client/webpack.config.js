const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
var config = {
  entry: path.resolve(__dirname, "./src/scripts/pong.js"),
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "pong.js",
  },

  plugins: [
    new BrowserSyncPlugin({
      host: "localhost",
      port: 4000,
      server: { baseDir: ["dist"] },
      files: ["./dist/*"],
      notify: false,
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    config.devtool = "source-map";
    config.watch = true;
  }

  if (argv.mode === "production") {
  }

  return config;
};
