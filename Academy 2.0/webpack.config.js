// Подключение необходимых модулей
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackMd5Hash = require('webpack-md5-hash')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpack = require('webpack')

//Експорт модуля вебпака
module.exports = {
  // Выбор основного файла
  entry: {
    main: './src/index.js',
  },
  // Выбор папки, куда будет собираться готовый проект для разработки либо продакшена
  output: {
    path: path.resolve(__dirname, 'dist'),
    // eslint-disable-next-line arrow-body-style
    filename: (chunkData) => {
      return chunkData.chunk.name === 'main' ? '[name].[hash].js' : '[name]/[name].[hash].js'
    },
  },
  // Использование дополнительных модулей
  module: {
    // Правила
    rules: [
      // файлы js обрабатывает модуль babel для преобразования кода
      {
        test: /\.js$/,
        use: { loader: 'babel-loader' },
        exclude: /node_modules/,
      },
      // для файлов css используется плагины MiniCssExtractPlugin и postcss-loader для пред и пост обработки файлов
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '../', }
          },
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: __dirname + '/postcss.config.js'
              }
            },
          },
        ],
      },
      // Обработка шрифтов
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=./vendor/[name].[ext]',
      },
      // Для изоброжений разных форматов используется image-webpack-loader
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader?name=./images/[name].[ext]',
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 85,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: 90,
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
            },
          },
        ],

      },
    ],
  },
  // Нахождение и подключение нужных плагинов
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/style.[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/index.html',
      filename: 'index.html',
    }),
    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
  ],
}
/* 
   
  
*/