module.exports = {
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  semi: false,
  overrides: [
    {
      files: ['**/*.css', '**/*.scss', '**/*.html'],
      options: {
        singleQuote: false,
      },
    },
  ],
}
