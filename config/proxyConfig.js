const devPath = 'http://127.0.1:7001/';
export default {
  '/api/': {
    target: devPath,
    changeOrigin: false
  },
};
