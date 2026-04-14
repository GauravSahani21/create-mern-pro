// src/templates/client/postcssConfig.js
export function getPostCssConfig() {
  return `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`;
}
