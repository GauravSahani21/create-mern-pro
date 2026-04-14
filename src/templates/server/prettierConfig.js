// src/templates/server/prettierConfig.js
export function getPrettierConfig() {
  return JSON.stringify(
    {
      semi: true,
      singleQuote: true,
      tabWidth: 2,
      trailingComma: 'es5',
      printWidth: 100,
    },
    null,
    2
  );
}
