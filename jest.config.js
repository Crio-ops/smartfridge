module.exports = {
    preset: 'react-native',
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
    testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
    transform: {
        '^.+\\.js$': 'babel-jest',
      },
      transformIgnorePatterns: [
        'node_modules/(?!(LinearGradient)/)',
      ],
    // Ajoutez d'autres configurations selon vos besoins
  };
  