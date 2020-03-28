const path = require('path');


module.exports = {
    entry : './src/index.js',
    output : {
               path : path.resolve('./public/'),
               filename : 'bundle.js',
               publicPath: '/'
            },
    module :{
        rules :[ 
                { 
                    test: /\.(js|jsx)$/, 
                    exclude: /node_modules/, 
                    use: [
                        {
                            loader: 'babel-loader'
                        }
                    ]
                },
                { 
                    test: /\.(scss)$/,
                    use: [
                        { 
                            loader: 'style-loader' 
                        }, 
                        { 
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                config: {
                                  path: 'postcss.config.js'
                                }
                              }
                        },
                        { 
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        } 
                    ]
                }
            ]
        },
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true,
        compress: true,
        port: 9000
      }
 }
