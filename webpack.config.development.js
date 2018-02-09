var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    //'webpack-hot-middleware/client',
    './client/react/reactApp'
  ],
  output: {
    path: __dirname,
    filename: 'client/dist/bundle.js',
      //hotUpdateChunkFilename: 'hot/hot-update.js',
      //hotUpdateMainFilename: 'hot/hot-update.json'
  },
  plugins: [
    //new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/,
      include: path.join(__dirname, 'client'),
    },
    {
      test: /\.css$/,
        include: [path.resolve(__dirname, "node_modules/flexboxgrid"), path.resolve(__dirname, "node_modules/react-datepicker/dist/")],
      use: [
        { loader: "style-loader" },
        { loader: "css-loader" },
        {
          loader: "postcss-loader",
            options: {
                plugins: () => [require('autoprefixer')]
            }
        },
      ]
    },
        {
            test: /\.(jpg|png|eot|svg|ttf|woff|woff2)$/, loader: 'url-loader?file-loader?name=public/fonts/[name].[ext]'
        }
    ]
  },
    devtool: "source-map", // enum
};