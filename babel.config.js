module.exports = {
  presets: [
    // Faz a conversão do código para a versão do node instalada no sistema
    ['@babel/preset-env', { targets: { node: 'current' } }],
    // Faz com que o babel entenda typescript
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        // Define os paths da aplicação
        alias: {
          '@modules': './src/modules',
          '@config': './src/config',
          '@shared': './src/shared',
        },
      },
    ],
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
};
