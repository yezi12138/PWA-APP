// proxy api requests
module.exports = {
  '/api': {
    target: 'https://api.douban.com',
    changeOrigin: true,
    pathRewrite: {
      '/api': ''
    }
  }
}