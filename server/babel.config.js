module.exports = {
  presets: [
    "@babel/preset-typescript",
    ["@babel/preset-env", { targets: { node: "current" }, loose: false }],
  ],
  plugins: [
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: false }],
    [
      "module-resolver", { alias: { 
        "@middlewares": "./src/infra/http/middlewares",
        "@helpers": "./src/helpers",
        "@handlers": "./src/handlers",
        "@config": "./src/infra/config",
        "@http": "./src/infra/http",
        "@commons": "./src/common",
        "@models": "./src/application/models",
        "@containers": "./src/infra/containers",
        "@log": "./src/infra/log",
        "@dtos": "./src/infra/dtos",
        "@provider": "./src/providers",
        "@database": "./src/infra/database",
      }}
    ],
  ],
  ignore: ["**/*.spec.ts"],
};