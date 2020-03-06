import { Router } from 'express';

const apiController = Router();

apiController.get('/health', (_, res) => res.status(200).json({ status: 'OK' }));

export { apiController };
