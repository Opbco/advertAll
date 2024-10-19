module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: ['.ios.js', '.android.js', '.js', '.jsx', '.ts', '.tsx', '.json'],
          alias: {
            '@components': './components',
            '@constants': './constants',
            '@hooks': './hooks',
            '@redux': './redux',
            '@assets': './assets',
          },
        },
      ],
    ],
  };
};

