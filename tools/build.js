const { execSync } = require("child_process");

const exec = (command, extraEnv) =>
  execSync(command, {
    stdio: "inherit",
    env: Object.assign({}, process.env, extraEnv),
  });

console.log("\nBuilding ES modules ...");

exec("babel src/modules -d es --ignore __tests__", {
  BABEL_ENV: "es",
});

console.log("Building CommonJS modules ...");

exec("babel src/modules -d lib --ignore __tests__", {
  BABEL_ENV: "cjs",
});
