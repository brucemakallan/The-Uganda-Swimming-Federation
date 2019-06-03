module.exports = {
  env: {
      browser: true,
      es6: true,
      node: true,
      jest: true
  },
  parser: "babel-eslint",
  extends: "airbnb",
  plugins: ["react", "import"],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    jsx: true,
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  },
  rules: {
      indent: [2, 2],
      quotes: ["error", "single"],
      semi: ["error", "always"],
      curly: [2, "multi-line"],
      "linebreak-style": ["error", "unix"],
      "no-shadow": "warn", // disallow variable declarations from shadowing variables declared in the outer scope
      "eol-last": ["error", "always"], // require newline at the end of files
      "max-len": ["error", { "code": 120 }],
      "no-console": "warn",
      "comma-dangle": ["error", "only-multiline"],
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "no-underscore-dangle": "warn",
      "no-var": "error",
      "camelcase": ["warn", {"properties": "always"}],
  }
};
