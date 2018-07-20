const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
module.exports = {
    mode: "development",
    entry: ["./front_src/main"], 
    output: {
        path: path.resolve(__dirname, "server/html/"),
        filename: "public/bundle.js"
    },
    module: {
        noParse: /lodash/,
        rules: [
            {
                test: /\.js?$/,
                loader: "babel-loader",
                options: {
                    presets: ["env"]
                },
            },
            {
                test: /\.html$/,
                use: [
                    "html-loader"
                ]
            },
            {
                test: /\.css$/i,
                use: [{loader: MiniCssExtractPlugin.loader}, "css-loader?sourceMap=true"]
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "assets/",
                            publicPath: "assets/"
                        }
                    }
                ]
            }
        ]
    },
    devtool: "source-map",
    plugins: [
        new CleanWebpackPlugin('./server/html'),
        new HtmlWebpackPlugin({
            template: "./front_src/index.html",
            inject: "head",
            meta: {viewport: "width=device-width, initial-scale=1, shrink-to-fit=no"}
        }),
        new MiniCssExtractPlugin({
            filename: "public/[name].css",
            chunkFilename: "public/[id].css"
        }),
        new FriendlyErrorsWebpackPlugin(),
    ]
}