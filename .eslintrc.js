module.exports = {
  env: { browser: true },
  globals: {
    __DEV__: true,
  },
  parser: "babel-eslint",
  extends: ["airbnb", "prettier", "prettier/react"],
  rules: {
    "no-use-before-define": ["error", "nofunc"],
    "no-return-assign": "off",
    "no-nested-ternary": "off",
    "react/sort-comp": "off",
    "react/forbid-prop-types": "off",
    "react/no-unused-prop-types": "off",
    "react/require-default-props": "off",
    "react/jsx-filename-extension": "off",
    "import/prefer-default-export": "off",
  },
};
