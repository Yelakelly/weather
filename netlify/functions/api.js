const serverless = require('serverless-http');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

export async function handler(event, context) {
  const app = express();

  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.YANDEX_WEATHER_API_URL,
      changeOrigin: true,
      headers: {
        'X-Yandex-API-Key': process.env.YANDEX_WEATHER_API_KEY,
      },
      pathRewrite: {
        '^/api': '/v2',
      },
    }),
  );

  return serverless(app)(event, context);
}
