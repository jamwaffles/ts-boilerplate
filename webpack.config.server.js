const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: ['./src/server/index.tsx'],
  output: {
    filename: 'server.js',
    path: __dirname + '/dist'
  },

  target: 'node',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.less'],
    alias: {
      "@assets": path.resolve(__dirname, "assets/")
    }
  },

  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|jpeg|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: devMode ? 'assets/[name].[ext]' : 'assets/[name].[hash].[ext]',
              limit: 8192,
              fallback: 'file-loader'
            }
          }
        ]
      },

      {
        test: /\.tsx?$/,
        exclude: /(node_modules|assets)/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true
          }
        }
      },

      // { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },

      // {
      //   test: /\.less$/,
      //   use: [
      //     devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
      //     // MiniCssExtractPlugin.loader,
      //     {
      //       loader: 'css-loader' // translates CSS into CommonJS
      //     },
      //     {
      //       loader: 'less-loader' // compiles Less to CSS
      //     }
      //   ]
      // }
    ]
  },
  // plugins: [
  //   new MiniCssExtractPlugin({
  //     filename: devMode ? '[name].css' : '[name].[hash].css',
  //     chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
  //   }),
  //   new ForkTsCheckerWebpackPlugin(),
  //   new ManifestPlugin({
  //     fileName: 'asset-manifest.json',
  //   }),
  // ],
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       styles: {
  //         name: 'styles',
  //         test: /\.css$/,
  //         chunks: 'all',
  //         enforce: true
  //       }
  //     }
  //   }
  // }
};
