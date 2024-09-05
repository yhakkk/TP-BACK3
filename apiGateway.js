import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT;



app.use('/service1', createProxyMiddleware({
  target: 'http://localhost:4001', 
  changeOrigin: true,
  pathRewrite: {
    '^/app': '', 
  },
}));



app.listen(port, () => {
  console.log(`API Gateway 👂🏼 en port:${port}`);
});