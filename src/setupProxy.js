const { createProxyMiddleware } = require('http-proxy-middleware');

// Used only when proxying local UI to deployed environments
// Set defaults.js apiURL to '/api'
module.exports = (app) => {
	app.use(
		'/api',
		createProxyMiddleware({
			target: 'https://api-nonprod.acuityap.com',
			secure: false,
			changeOrigin: true,
			pathRewrite: {
				'^/api/': '/',
			},
			onProxyReq: (request) => {
				request.setHeader('origin', 'https://api-nonprod.acuityap.com');
			},
		})
	);
};
