import path from 'path';

export default {
  target: 'node',
  entry: './src/index.ts',
  output: {
    path: path.resolve('./', 'dist'),
    filename: 'horae.js',
    libraryTarget: 'umd',
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
