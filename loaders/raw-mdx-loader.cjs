/**
 * Simple loader to expose MDX source as a string when imported with `?raw`.
 */
module.exports = function rawMdxLoader(source) {
  return `export default ${JSON.stringify(source)};`;
};

