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

    it('GIVEN a valid pet ID, ' +
        'WHEN getting the pet, ' +
        'THEN HTTP STATUS OK and the created pet',
        async () => {

            // Arrange

            const petRepo = getRepository(PetEntity);
            const saved = await petRepo.save({
                name: 'Mysty',
                type: 'Dog',
                breed: 'Basset Hound',
                location: {
                    type: 'Point',
                    coordinates: [-104.618896, 50.445210],
                },
            });

            const url = PETS_ENDPOINT + '/' + saved.id;

            // Act

            const result = await chai
                .request(app)
                .get(url)
                .send();

            // Assert

            expect(result).to.have.status(OK);
            expect(result.body).to.deep.include({
                pet: {
                    id: saved.id,
                    name: 'Mysty',
                    type: 'Dog',
                    breed: 'Basset Hound',
                    location: {
                        type: 'Point',
                        coordinates: saved.location.coordinates,
                    },
                },
            });

        });

    it('GIVEN a nonexistent pet id, ' +
        'WHEN getting the pet, ' +
        'THEN HTTP STATUS NOT FOUND',
        async () => {

            // Arrange

            const url = PETS_ENDPOINT + '/0';

            // Act

            const result = await chai
                .request(app)
                .get(url)
                .send()

            // Assert

            expect(result).to.have.status(NOT_FOUND);

        });
});
