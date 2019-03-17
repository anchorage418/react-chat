const path = require('path');
const dotenv = require('dotenv');
// const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const DashboardPlugin = require("webpack-dashboard/plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// console.log('process.env.NODE_ENV 1', process.env.NODE_ENV);
// dotenv.config();
// console.log('process.env.NODE_ENV 2', process.env.NODE_ENV);

// const MODE = process.env.NODE_ENV === 'production' ? 'production' : 'development';

// const configPath = {};
// if (environment === 'production') configPath.path = '.env.production';
// dotenv.config(configPath).parsed;

// let PORT = process.env.PORT || 3000;
// const HOST = process.env.HOST || 'localhost';
// const SSL = process.env.SSL ? 's' : '';
// if (environment === 'development') PORT = 3010;
// if (process.env.ASSETS_NO_PORT === 'true') PORT = '';

// const publicPath = `http${SSL}://${HOST}:${PORT}/assets/`;
// console.log('publicPath', publicPath)

module.exports = function(env, options) {
  console.log('env', env);

  const prodPlugins = env.prod ? [
    new BundleAnalyzerPlugin()
  ] : [];

  return {
    mode: env.prod ? 'production' : 'development',
    entry: ["@babel/polyfill", "./src/index.js"],
    output: {
      filename: env.prod ? '[name].[contenthash].bundle.min.js' : '[name].bundle.js',
      chunkFilename: env.prod ? '[name].[contenthash].min.js' : '[name].js',
      path: path.resolve(__dirname, 'dist'),
      // publicPath
    },  
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      historyApiFallback: true,
      hot: true
    },
    devtool: env.prod ? 'source-maps' : 'eval',
    plugins: [
      new CleanWebpackPlugin(),
      // new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        title: 'Chat',
        template: 'src/index.html'
      }),
      new DashboardPlugin(),  
      ...prodPlugins
    ],
    optimization: {
      usedExports: true,
      splitChunks: {
        chunks: 'all',
        name: true,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      },
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: 4
        })
        // should include CSS minimizer if need
      ],
    },
    resolve: {
      alias: {
        src: path.resolve(__dirname, 'src'),
        components: path.resolve(__dirname, 'src/components/'),
        containers: path.resolve(__dirname, 'src/containers/')
      }
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 0, // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
              },
            },
            'postcss-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(png|jpg|gif)$/,
          include: path.resolve(__dirname, 'src/assets/images'),
          use: [
            {
              loader: 'file-loader',
              options: {
                publicPath: 'assets',
                outputPath: 'assets/images',
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          include: path.resolve(__dirname, 'src/assets/fonts'),
          use: [
            'file-loader'
          ]
        },
      ]
    }
  }
}
