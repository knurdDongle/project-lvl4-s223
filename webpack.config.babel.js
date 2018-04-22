import path from 'path';

export default () => ({
  entry: {
    app: ['babel-polyfill', './app'],
    vendor: ['react', 'react-dom', 'bootstrap/dist/css/bootstrap.min.css', 'bootstrap', 'jquery'],
  },
  devtool: 'inline-source-map',
  externals: {
    gon: 'gon',
  },
  output: {
    path: path.join(__dirname, 'dist', 'assets'),
    filename: '[name].js',
    publicPath: '/assets/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(s*)css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
});

