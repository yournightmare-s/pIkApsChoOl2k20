/* eslint-disable global-require */
// Использование 2 postcss плагинов для правильной обработки и минимизации css файлов
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default',
    }),
  ],
}
