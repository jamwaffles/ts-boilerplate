const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');

const devMode = process.env.NODE_ENV !== "production";
const basePath = process.env.BASE_PATH || "";

const distPath = path.resolve(__dirname, "dist");
const publicPath = `${basePath}/assets/`;

const common = {
  cache: true,
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".less"],
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|jpeg|svg|woff|woff2|ico)$/i,
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
        parallel: true,
        extractComments: false,
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
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
      path: path.resolve(distPath, 'assets'),
      publicPath,
    },
    mode: devMode ? "development" : "production",
    devtool: devMode ? "cheap-module-source-map" : "source-map",
    module: {
      rules: [
        ...common.module.rules,
        // Specific favicon rules; favicons must be copied verbatim, instead of inlined by url-loader
        {
          test: /favicon.*\.(png|ico)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
              },
            },
          ],
        },
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
      // Set defaults for defined environment variables
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
      path: path.resolve(distPath, 'server'),
      publicPath,
    },
    target: "node",
    performance: false,
    // Allow usage of these globals in code
    node: {
      __dirname: false,
      __filename: false,
    },
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
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
    ],
    // Disable optimisations for server bundle
    optimization: {
      minimizer: [],
    },
  },
];
