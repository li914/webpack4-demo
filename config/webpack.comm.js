/**
 * 公共配置文件
 * */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

//获取文件夹的绝对路径
function resolve(dir) {
    return path.resolve(__dirname, '../', dir);
}

module.exports = {
    entry: resolve('src') + '/index.js',
    resolve: {
        extensions: [
            '.js', '.css', '.scss', 'sass', '.less', '.json', '.xml'
        ],
        alias: {
            '@': resolve('src')
        }
    },
    performance: {
        hints: false
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            /*{
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },*/
            {
                test: /\.(png|jpg|gif|jpge)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[ext]?[hash]',
                            limit: 8192,
                            index: path.resolve(__dirname, '../dist/index.html'),
                            assetsRoot: resolve('dist'),
                        }
                    },
                    {
                        loader: 'image-webpack-loader', // 先进行图片优化
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            optipng: {
                                enabled: false
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false
                            },
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: ["img:src", "img:data-src"]
                    }
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            {
                test: /\.(xml)$/,
                use: [
                    'xml-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(resolve('dist'), {
            //配置项目根目录路径
            root: resolve('/')
        }),
        new HtmlWebpackPlugin({
            template: resolve('src') + "/index.html",
            filename: resolve('dist') + '/index.html',
            title: 'Webpack4 基础配置 Demo',
            inject: 'head',
            hash: true
        })
    ],
    externals: {
        'jquery': "jQuery"
    }
};
