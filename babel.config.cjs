// eslint-disable-next-line no-undef
module.exports = {
  presets: [
    '@babel/preset-env',         // Handles modern JavaScript
    '@babel/preset-react',       // ⬅️ Missing! Now JSX will be transpiled properly
    '@babel/preset-typescript',  // Handles TypeScript
  ],
  plugins: [
    '@babel/plugin-transform-runtime',  // Optimizes Babel output
  ],
};
