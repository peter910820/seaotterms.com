const { defineConfig } = require("@vue/cli-service");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false, // 禁止生成 source map 檔案
  configureWebpack: (config) => {
    config.optimization = {
      minimize: true, // 啟用程式碼壓縮(此功能有問題)
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true, // 移除 console.log(不移除)
              drop_debugger: true, // 移除 debugger
            },
            output: {
              comments: false, // 移除註解
            },
            mangle: true, // 混淆變數名稱
          },
        }),
      ],
    };
  },
});
