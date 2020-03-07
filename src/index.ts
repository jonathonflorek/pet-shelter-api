import 'reflect-metadata';
import * as express from 'express';
import 'express-async-errors';

import { apiController } from './features/routes';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { port, postgresConfig } from './config';
import { createConnection } from 'typeorm';

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

    app.use(apiController);

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
