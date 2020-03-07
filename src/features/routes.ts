import { Router } from 'express';
import { petsController } from './pets/petsController';

const apiController = Router();

apiController.use('/pets', petsController);
apiController.get('/health', (_, res) => res.status(200).json({ status: 'OK' }));

export { apiController };
