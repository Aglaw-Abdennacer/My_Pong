const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");


// connecting it with the client phase 
const io = require("socket.io")(3000 , {
  cors : {
      origin : ["http://localhost:4000"],
  },
  })

  let i = 1 ;
  io.on("connection" , (socket) => {
    while ( i  < 3 ) {
      console.log("a socket is connected ") ;
      console.log(i); 
      i++ ;
    }
      socket.disconnect() ; 
      console.log(socket.id + " is a 3th");
    
  })
  




var config = {
  entry: path.resolve(__dirname, "../client/src/scripts/pong.js"),
  output: {
    path: path.resolve(__dirname, "./public/"),
    filename: "pong.js",
  },

  plugins: [
    new BrowserSyncPlugin({
      host: "localhost",
      port: 3000,
      server: { baseDir: ["public"] },
      files: ["./public/*"],
      notify: false,
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "../client/src/index.html",
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
