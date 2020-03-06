import 'reflect-metadata';
import * as express from 'express';
import 'express-async-errors';

import { apiController } from './features/routes';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { port } from './config';

const app = express();
const running = start(app);

async function start(app: express.Application) {

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
