export default {
  presets: [
    '@babel/preset-env',  // Handles modern JavaScript syntax
    '@babel/preset-typescript',  // Handles TypeScript if you're using TS
  ],
  plugins: [
    '@babel/plugin-transform-runtime',  // Optional: Handles helpers for Babel
  ],
};
