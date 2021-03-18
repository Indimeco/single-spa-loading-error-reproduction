var path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");


module.exports = {
    entry: "./src/index",
    mode: "development",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 3000,
        hot: true,
        historyApiFallback: true,
    },
    output: {
        publicPath: "auto",
    },
    module: {
        rules: [
            {
                test: /bootstrap\.js$/,
                loader: "bundle-loader",
                options: {
                    lazy: true,
                },
            },
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    presets: ["@babel/preset-react"],
                },
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "root",
            remotes: {
                app1: "app1@http://localhost:3001/remoteEntry.js",
                app2: "app2@http://localhost:3002/remoteEntry.js",
                app3: "app3@http://localhost:3003/remoteEntry.js",
            },
            exposes: {},
            shared: ["react", "react-dom", "react-router-dom"]
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
    ]
};