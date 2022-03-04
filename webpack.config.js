// Constante globale
const webpack = require('webpack')
const path = require('path')

// Plagin
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const TerserWebpackPlugin = require('terser-webpack-plugin')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
//const {CleanWebpackPlugin} = require('clean-webpack-plugin')
//const CopyWebpackPlugin = require('copy-webpack-plugin')

// Constante
const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
const filename = ext => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`
const styleHandler = isDev ? "style-loader" : MiniCssExtractPlugin.loader
const assetsfilename = tip => isDev ? `assets/${tip}/[name].[ext][query]` : `assets/${tip}/[name].[hash][ext][query]`

// separ codul ce se repeta
const optimization = () => {
  const config = {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          enforce: true,
        }
      }
    }
  }
  if (isProd) {
    config.minimizer = [
      new CssMinimizerPlugin(),
      new TerserWebpackPlugin()
    ]
  }
  return config
}

// Lucru cu css
const cssLoaders = extra => {
  const loaders = [
    {
      loader: styleHandler,
    },
    'css-loader'
  ]
  if (extra) {
    loaders.push(extra)
  }
  return loaders
}

// Pachetele Babel folosite
const babelOptions = preset => {
  const opts = {
    presets: [
      '@babel/preset-env'
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties'
    ]
  }
  if (preset) {
    opts.presets.push(preset)
  }
  return opts
}

// Adaog eslint la js development mode
const jsLoaders = () => {
  const loaders = [{
    loader: 'babel-loader',
    options: babelOptions()
  }]
  if (isDev) {
    loaders.push('eslint-loader')
  }
  return loaders
}

// Incarc Plaginurile
const plugins = () => {
  const base = [
//    cind avem mai multe pagini creez mai multe new HTMLWebpackPlugin
    new HTMLWebpackPlugin({
      template: './html/index.html',
      minify: isProd,
//      inject:false  // link
//      publicPath: ''
/*      minify: {
        collapseWhitespace: isProd
      }  */
    }),
    new MiniCssExtractPlugin({
      filename: `./css/${filename('css')}`
    })
    
//    new CleanWebpackPlugin(),
/*    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist')
        }
      ]
    }),  */
  ]
  if (isProd) {
    base.push(new BundleAnalyzerPlugin())
  }
  return base
}

// Config
module.exports = {
  
  // Developement Server
  devServer: {
    historyApiFallback: true,
    static: path.resolve(__dirname, 'dist'),
    open: true,
    compress: true,
    port: 3003,
    hot: true,
  },
  
  // Parametri de lucru
  context: path.resolve(__dirname, 'src'),
  devtool: isDev ? 'source-map' : false,
  mode: 'development',
  
  // Entry & Output
  entry: {
    main: ['@babel/polyfill', './js/index.js'],
//    about: ... poate fi [ '.ts', '.tsx', '.js', '.jsx' ]
/*    other: {
      import: './src/other.js'
      dependOn: 'shared',
    },
    shared: 'lodash',  */
  },
  output: {
    filename: `./js/${filename('js')}`,
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'auto',
    clean: true,
  },
  
  // Plagin
  plugins: plugins(),
  
  // Reguli
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: 'html-loader'
      },
      {
        test: /\.pug$/i,
        use: 'pug-loader',
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.css$/i,
        use: cssLoaders()
      },
      {
        test: /\.less$/i,
        use: cssLoaders('less-loader')
      },
      {
        test: /\.s[ac]ss$/i,
        use: cssLoaders('sass-loader')
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: assetsfilename('img'),
        },
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/i,
        type: 'asset/resource',
        generator: {
          filename: assetsfilename('fonts'),
        },
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader']
      },
      {
        test: /\.(csv|tsv)$/i,
        use: ['csv-loader']
      },
      {
        test: /\.js$/i,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components)/,
        use: jsLoaders()
      },
      {
        test: /\.ts$/i,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: babelOptions('@babel/preset-typescript')
        }
      },
      {
        test: /\.jsx$/i,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: babelOptions('@babel/preset-react')
        }
      }
    ]
  },
  
  // separ coful ce se repeta
  optimization: optimization(),
  
  //extensii si aliasuri
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.png'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@js': path.resolve(__dirname, 'src/js'),
      '@html': path.resolve(__dirname, 'src/html'),
      '@css': path.resolve(__dirname, 'src/styles'),
      '@img': path.resolve(__dirname, 'src/assets/img'),
    }
  },
}
