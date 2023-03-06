const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/weather',
    createProxyMiddleware({
      target: process.env.YANDEX_WEATHER_API_URL,
      changeOrigin: true,
      headers: {
        'X-Yandex-API-Key': process.env.YANDEX_WEATHER_API_KEY,
      },
      pathRewrite: {
        '^/weather/v2': '/v2',
      },
    }),
  );
};
