const CompressionPlugin = require("compression-webpack-plugin")

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  runtimeCompiler: true,
  publicPath: './',  //输出的根路径
  productionSourceMap: false,
  devServer: {
    port: 8888 //端口
  },
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.html$|\.css$|\.jpg$|\.jpeg$|\.png/, // 需要压缩的文件类型
            threshold: 10240, // 归档需要进行压缩的文件大小最小值，我这个是10K以上的进行压缩
            deleteOriginalAssets: false, // 是否删除原文件
            minRatio: 0.8
          })
        ]
      }
    }
  }
}