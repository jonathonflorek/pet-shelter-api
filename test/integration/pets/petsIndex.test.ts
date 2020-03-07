import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { getRepository } from 'typeorm';
import { PetEntity } from '../../../src/models/PetEntity'
import { app } from '../../../src';
import { OK, NOT_FOUND } from 'http-status-codes';

chai.use(chaiHttp);
const { expect } = chai;

describe('Endpoint test for pets: POST /pets', () => {
    const PETS_ENDPOINT = '/pets';

    it('GIVEN several pets, ' +
        'WHEN getting the pet index, ' +
        'THEN HTTP STATUS OK and all pets',
        async () => {

            // Arrange

            const petRepo = getRepository(PetEntity);
            await petRepo.save([
                {
                    name: 'Mysty',
                    type: 'Dog',
                    breed: 'Basset Hound',
                    location: {
                        type: 'Point',
                        coordinates: [-104.618896, 50.445210],
                    },
                },
                {
                    name: 'Toby',
                    type: 'Dog',
                    breed: 'Basset Hound',
                    location: {
                        type: 'Point',
                        coordinates: [-104.618896, 50.445210],
                    },
                },
            ]);

            // Act

            const result = await chai
                .request(app)
                .get(PETS_ENDPOINT)
                .send();

            // Assert

            expect(result).to.have.status(OK);
            expect(result.body.pets).to.have.length(2);

        });
});
