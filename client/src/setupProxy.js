// src/setupProxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api", // Specify the API routes you want to proxy
    createProxyMiddleware({
      target: "http://localhost:3000", // Replace with your Node.js server's URL
      changeOrigin: true,
    })
  );
};
