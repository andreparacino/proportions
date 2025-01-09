module.exports = {
  trailingComma: "none",
  tabWidth: 2,
  printWidth: 100,
  useTabs: false,
  quoteProps: "as-needed",
  bracketSpacing: true,
  arrowParens: "always",
  jsxBracketSameLine: false,
  endOfLine: "lf",
  overrides: [
    {
      files: ".prettierrc",
      options: {
        parser: "json",
      },
    },
  ],
  plugins: [],
};
