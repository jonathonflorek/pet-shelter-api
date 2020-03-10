import 'reflect-metadata';
import * as express from 'express';
import 'express-async-errors';

import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { port, postgresConfig } from './config';
import { createConnection } from 'typeorm';
import * as petsController from './controllers/pets';

const app = express();
const running = start(app);

async function start(app: express.Application) {
    await createConnection({
        ...postgresConfig,
        entities: [__dirname + '/models/*{.js,.ts}'],
        migrations: ['dist/migrations/*.js'],
        migrationsRun: true,
    });

    app.use(cors());
    app.use(bodyParser.json());

    app.get('/health', (_, res) => res.status(200).json({ status: 'OK' }));
    app.get('/pets', petsController.getAllPets);
    app.post('/pets', petsController.createPet);
    app.get('/pets/:petid', petsController.getPetById);

    await new Promise(resolve => {
        app.listen(port, () => {
            console.log(`application listening on port ${port}...`);
            resolve();
        });
    });
}

export {
    app,
    running,
};
