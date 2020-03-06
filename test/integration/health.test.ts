import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { app } from '../../src';
import { OK } from 'http-status-codes';

chai.use(chaiHttp);
const { expect } = chai;

describe('Health check test: GET /health', () => {
    const HEALTH_ENDPOINT = '/health';

    it('GIVEN the health endpoint, ' +
        'WHEN a request is made, ' +
        'THEN a response with HTTP STATUS OK',
        async () => {

            // Act

            const result = await chai
                .request(app)
                .get(HEALTH_ENDPOINT)
                .send();

            // Assert

            expect(result).to.have.status(OK);
            expect(result.body).to.include({
                status: 'OK',
            });

        });
});
