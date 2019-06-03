module.exports = {
  "env": {
      "browser": true,
      "es6": true,
      "node": true,
      "mocha": true,
  },
  "extends": "eslint:recommended",
  "parserOptions": {
      "ecmaVersion": 2015,
      "sourceType": "module",
  },
  "rules": {
      "indent": ["error", "tab"],
      "linebreak-style": ["error", "unix"],
      "quotes": ["error", "single"],
      "semi": ["error", "always"],
      "curly": [2, "multi-line"],
      "no-shadow": "warn", // disallow variable declarations from shadowing variables declared in the outer scope
      "eol-last": ["error", "always"], // require newline at the end of files
      "max-len": ["error", { "code": 120 }],
      "no-console": "warn",
      "comma-dangle": ["error", "only-multiline"],
      "no-underscore-dangle": "warn",
      "no-var": "error",
      "camelcase": ["warn", {"properties": "always"}],
  }
};
