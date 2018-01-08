module.exports = {
  presets: [
    [
      "env",
      {
        modules: process.env.BABEL_ENV === "cjs" ? "commonjs" : false,
        targets: {
          uglify: true,
        },
      },
    ],

    "react",
  ],

  plugins: [
    "babel-plugin-lodash",
    process.env.BABEL_ENV !== "cjs" && require("./babel-plugin-lodash-es"),
  ].filter(Boolean),
};
