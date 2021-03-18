var path = require('path');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");


module.exports = {
    entry: "./src/index",
    mode: "development",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 3002,
        hot: true
    },
    output: {
        publicPath: "auto",
    },
    module: {
        rules: [
            // {
            //     test: /bootstrap\.js$/,
            //     loader: "bundle-loader",
            //     options: {
            //         lazy: true,
            //     },
            // },
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
            name: "app2",
            filename: "remoteEntry.js",
            library: { type: "var", name: "app2" },
            remotes: {},
            exposes: {
                './App': './src/index'
            },
            shared: ["react", "react-dom", "react-router-dom"]
        })
    ]
};