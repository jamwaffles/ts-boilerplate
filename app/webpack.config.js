const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: ['./src/index.tsx'],
  output: {
    filename: 'app.js',
    path: __dirname + '/dist',
    publicPath: '/assets/'
  },

  mode: 'development',

  devtool: 'source-map',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.less']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              useCache: true
            }
          }
        ]
      },

      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },

      {
        test: /\.less$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          // MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'less-loader' // compiles Less to CSS
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  }
};
