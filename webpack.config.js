import path from 'path';

export default {
  target: "browserslist:node 18",
  entry: './src/index.ts',
  output: {
    filename: 'horae.js',
    path: path.resolve('./', 'dist'),
    libraryTarget: 'module',
  },
  experiments: {
    outputModule: true,
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {presets: ['@babel/preset-env']},
          },
          {loader: 'ts-loader'},
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
