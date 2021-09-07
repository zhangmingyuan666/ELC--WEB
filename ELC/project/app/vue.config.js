module.exports = {
  publicPath: "/",
  lintOnSave: false,
  productionSourceMap: process.env.NODE_ENV !== "production",
  // 下面为代理服务器配置
  devServer: {
    open: true, // 启动服务后是否打开浏览器
    hot: true,
    host: 'localhost',
    https: false,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '/'
        },
      },
    },
  }
}