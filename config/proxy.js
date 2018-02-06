// proxy api requests
module.exports = {
  '/api': {
    target: 'http://120.79.133.111:9001',
    changeOrigin: false,
    pathRewrite: {
      '/api': ''
    }
  }
}