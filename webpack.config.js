const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');

const devMode = process.env.NODE_ENV !== "production";
const basePath = process.env.BASE_PATH || "";

const distPath = path.resolve(__dirname, "dist/assets");
const publicPath = `${basePath}/assets/`;

const common = {
  cache: true,
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".less"],
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|jpeg|svg|woff|woff2)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              name: devMode ? "[name].[ext]" : "[name].[hash].[ext]",
              limit: 8192,
              fallback: "file-loader",
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true
      }),
    ],
  }
};

module.exports = [
  // Browser
  {
    ...common,
    name: "browser",
    entry: ["./src/index.tsx"],
    output: {
      filename: devMode ? "main.js" : "main.[hash].js",
      chunkFilename: "[name].chunk.js",
      path: distPath,
      publicPath,
    },
    mode: devMode ? "development" : "production",
    devtool: devMode ? "cheap-module-source-map" : "source-map",
    module: {
      rules: [
        ...common.module.rules,
        {
          test: /\.tsx?$/,
          exclude: /(node_modules|assets)/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              plugins: devMode ? ["react-hot-loader/babel"] : [],
            },
          },
        },

        {
          test: /\.less$/,
          use: [
            devMode ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            "less-loader",
          ],
        },

        {
          test: /\.sass$/,
          use: [
            devMode ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader",
          ],
        },
      ],
    },
    plugins: [
      new webpack.EnvironmentPlugin({ NODE_ENV: "development", BASE_PATH: "" }),
      new MiniCssExtractPlugin({
        filename: devMode ? "[name].css" : "[name].[hash].css",
        chunkFilename: devMode ? "[id].css" : "[id].[hash].css",
      }),
      new ManifestPlugin({
        fileName: "../asset-manifest.json",
      }),
      new BundleAnalyzerPlugin({
        // Comment next line to analyse browser bundle
        analyzerMode: 'disabled'
      }),
    ],
    optimization: {
      ...common.optimization,
      splitChunks: {
        cacheGroups: {
          styles: {
            name: "styles",
            test: /\.css$/,
            chunks: "all",
            enforce: true,
          },
        },
      },
    },
  },

  // Server
  {
    ...common,
    name: "server",
    entry: ["./src/server/index.tsx"],
    output: {
      filename: "server.js",
      path: distPath,
      publicPath,
    },
    target: "node",
    performance: false,
    module: {
      rules: [
        ...common.module.rules,
        {
          test: /\.tsx?$/,
          exclude: /(node_modules|assets)/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            },
          },
        },
      ],
    },
  },
];
