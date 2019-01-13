import { Application } from 'express';
import supplyChainRouter from './api/controllers/examples/router'
export default function routes(app: Application): void {
  app.use('/api/v1/supplychain', supplyChainRouter);
};
