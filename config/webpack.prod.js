/**
 * 生产环境配置文件
 * */
const path = require('path');
const Webpack = require('webpack');
const Merge=require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Comm = require('./webpack.comm.js');

//获取文件夹的绝对路径
function resolve(dir) {
    return path.resolve(__dirname, '../', dir);
}

const Prod = {
    mode: 'production',
    output: {
        filename: "main.min.js",
        path: resolve('dist')
    },
    module: {
        rules: [
            {
                test: /\.(le|sc|sa|c)ss$/,
                //从右到左的顺序,从下往上处理
                use: [
                    {
                        loader:'style-loader'
                    },
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
    plugins:[
        new UglifyJsPlugin({
            parallel:4,
            uglifyOptions: {
                output: {
                    comments: false,
                    beautify: false,
                },
                compress: {
                    warnings: false
                },
            },
            cache: true,
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    }
};
module.exports=Merge(Comm,Prod);
