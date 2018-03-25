module.exports = {
  entry: [
    './src/index.js' // входная точка - исходный файл
  ],
  output: {
    path: __dirname, // путь к каталогу выходных файлов - папка public
    publicPath: '/',
    filename: 'bundle.js' // название создаваемого файла
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
