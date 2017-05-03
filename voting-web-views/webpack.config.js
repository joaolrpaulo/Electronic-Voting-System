var debug = process.env.NODE_ENV !== 'production';
var path = require('path');
var webpack = require('webpack');

module.exports = {
    context: path.join(__dirname, 'src'),
    devtool: debug ? 'inline-sourcemap' : null,
    devServer: {disableHostCheck: true},
    entry: './js/client.js',
    module: {
        loaders: [
            {
                test: /\.(png|jpg)$/i,
                exclude: /node_modules/,
                loaders: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        query: {
                            progressive: true,
                            optipng: {
                                optimizationLevel: 7
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            }
                        }
                    }
                ]
            },
            {
                test: /\.mp4$/,
                exclude: /node_modules/,
                loader: 'file-loader'
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },
            { test: /\.rt$/, loader: 'react-templates-loader?modules=es6' },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
                }
            }
        ]
    },
    resolve: {
        alias: {
            Components: path.resolve(__dirname, 'src/js/Components'),
            Actions: path.resolve(__dirname, 'src/js/Actions'),
            Stores: path.resolve(__dirname, 'src/js/Stores'),
            Utils: path.resolve(__dirname, 'src/js/Utils'),
            Models: path.resolve(__dirname, 'src/js/Models'),
            Styles: path.resolve(__dirname, 'src/styles')
        }
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'client.min.js'
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
    ]
};
