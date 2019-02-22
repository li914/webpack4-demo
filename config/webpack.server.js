/**
 * 服务器环境配置文件
 * */
const path = require('path');
const Webpack = require('webpack');
const Merge=require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Comm = require('./webpack.comm.js');
//获取文件夹的绝对路径
function resolve(dir) {
    return path.resolve(__dirname, '..', dir) + '/';
}

const Server = {
    mode: 'development',
    output: {
        filename: "index.js",
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
                    {
                        loader:MiniCssExtractPlugin.loader,
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
    devServer: {
        clientLogLevel: 'warning', // 可能的值有 none, error, warning 或者 info（默认值)
        hot: true,  // 启用 webpack 的模块热替换特性, 这个需要配合： webpack.HotModuleReplacementPlugin插件
        contentBase:  resolve('dist'), // 告诉服务器从哪里提供内容， 默认情况下，将使用当前工作目录作为提供内容的目录
        compress: true, // 一切服务都启用gzip 压缩
        host: 'localhost', // 指定使用一个 host。默认是 localhost。如果你希望服务器外部可访问 0.0.0.0
        port: 8484, // 端口
        open: true, // 是否打开浏览器
        overlay: {  // 出现错误或者警告的时候，是否覆盖页面线上错误消息。
            warnings: true,
            errors: true
        },
        publicPath: resolve('asset'), // 此路径下的打包文件可在浏览器中访问。
        proxy: {  // 设置代理
            "/api": {  // 访问api开头的请求，会跳转到  下面的target配置
                target: "http://localhost:9090",
                pathRewrite: {"^/api" : "/mockjsdata/5/api"}
            }
        },
        quiet: true, // necessary for FriendlyErrorsPlugin. 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。
        watchOptions: { // 监视文件相关的控制选项
            poll: true,   // webpack 使用文件系统(file system)获取文件改动的通知。在某些情况下，不会正常工作。例如，当使用 Network File System (NFS) 时。Vagrant 也有很多问题。在这些情况下，请使用轮询. poll: true。当然 poll也可以设置成毫秒数，比如：  poll: 1000
            ignored: /node_modules/, // 忽略监控的文件夹，正则
            aggregateTimeout: 300 // 默认值，当第一个文件更改，会在重新构建前增加延迟
        }
    },
    plugins: [
        new Webpack.HotModuleReplacementPlugin(),
        new Webpack.NamedModulesPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css', // 设置最终输出的文件名
            chunkFilename: '[id].css'
        })
    ]
};

module.exports=Merge(Comm,Server);
