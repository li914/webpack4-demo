/**
 * 开发环境时,webpack4配置文件
 * */

const path=require('path');
const Webpack=require('webpack');
//合并配置文件插件
const Merge=require('webpack-merge');
/**
 * 基础配置文件
 * */
const BaseWebpackConfig=require('./webpack.base.config.js');
const CLeanWebpackPlugin=require('clean-webpack-plugin');
const HtmlWebpackPlugin=require('html-webpack-plugin');
/**
 * 把css样式抽取出来,生成一个css文件
 * 如若不需要,可以注释掉该项配置
 * */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports=Merge(BaseWebpackConfig,{
    mode:'development',
    entry:path.resolve(__dirname,'../src'),
    output: {
        filename: "[name].dev.js",
        path: path.resolve(__dirname,'../dist')
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    "css-loader"
                ]
            }
        ]
    },
    devServer: {
        // contentBase:path.resolve(__dirname,'../dist/index.html'),
        /**
         * 把当前项目根目录作为本地服务器的根目录
         * */
        contentBase:'./',
        host:'localhost',
        port:8000,
        open:true,
        hot:true,
        inline:true
    },
    plugins: [
        new CLeanWebpackPlugin(path.resolve(__dirname,'../dist'),{
            root:path.resolve(__dirname,'../'),
            verbose:true
        }),
        new Webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'../src/index.html'),
            filename: 'index.html',
            title:'Webpack4 配置 Demo',
            hash:true,
            chunks:['main'],
            cache:true,
            minif:{
                collapseWhitespace:true,
                removeComments:true
            }
        }),
        new MiniCssExtractPlugin({
            filename: "[name].dev.css",
            chunkFilename: "[id].css"
        })
    ]
});