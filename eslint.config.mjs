export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 5,
      sourceType: 'script',
      globals: {
        window: 'readonly',
        Set: 'readonly',
        Uint8Array: 'readonly',
        ArrayBuffer: 'readonly',
        jQuery: 'readonly'
      }
    },
    rules: {
      'no-empty': 'off',
      'no-cond-assign': 'off',
      'no-constant-condition': 'off',
      'no-fallthrough': 'off',
      "no-control-regex": "off",
      'no-irregular-whitespace': 'warn',
      //'no-unused-vars': 'warn'
    }
  }
];
