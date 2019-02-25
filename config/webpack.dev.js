/**
 * 开发环境配置文件
 * */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Merge=require('webpack-merge');
const Webpack = require('webpack');
const Comm = require('./webpack.comm.js');

//获取文件夹的绝对路径
function resolve(dir) {
    return path.resolve(__dirname, '../', dir);
}

const Dev = {
    mode: 'development',
    output: {
        filename: "build.js",
        path: resolve('dist')
    },
    //显示JavaScript错误位置（在源文件中的位置）
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(le|sc|sa|c)ss$/,
                //从右到左的顺序,从下往上处理
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            //追踪样式在源文件中的位置
                            sourceMap: true
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            ident:'postcss',
                            plugins: loader => [
                                require('autoprefixer')({ browsers: ['> 0.15% in CN'] }) // 添加前缀
                            ]
                        }
                    },
                    {
                        loader: "less-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css', // 设置最终输出的文件名
            chunkFilename: '[id].css'
        })
    ],
    optimization: {
        minimizer: [
            //压缩生产出的js和css文件
            /*new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})*/
        ]
    },
};
module.exports=Merge(Comm,Dev);
