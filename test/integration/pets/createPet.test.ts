import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { getRepository } from 'typeorm';
import { PetEntity } from '../../../src/models/PetEntity'
import { app } from '../../../src';
import { CONFLICT, CREATED, UNPROCESSABLE_ENTITY } from 'http-status-codes';

chai.use(chaiHttp);
const { expect } = chai;

describe('Endpoint test for pets: POST /pets', () => {
    const PETS_ENDPOINT = '/pets';

    it('GIVEN an invalid pet, ' +
        'WHEN posting to pets endpoint, ' +
        'THEN HTTP STATUS UNPROCESSABLE_ENTITY and an errors list',
        async () => {

            // Arrange

            const pet = {
                name: 'Mysty',
                // missing other fields
            };

            // Act

            const result = await chai
                .request(app)
                .post(PETS_ENDPOINT)
                .send({ pet });
            const allPets = await getRepository(PetEntity).find();

            // Assert

            expect(result).to.have.status(UNPROCESSABLE_ENTITY);
            expect(allPets).to.have.length(0);
            expect(result.body.errors.length).to.be.greaterThan(0);

        })

    it('GIVEN a valid pet, ' +
        'WHEN posting to pets endpoint, ' +
        'THEN HTTP STATUS OK and the created pet',
        async () => {

            // Arrange

            const pet = {
                name: 'Mysty',
                type: 'Dog',
                breed: 'Basset Hound',
                location: {
                    type: 'Point',
                    coordinates: [-104.618896, 50.445210],
                },
            };

            // Act

            const result = await chai
                .request(app)
                .post(PETS_ENDPOINT)
                .send({ pet });
            const allPets = await getRepository(PetEntity).find();

            expect(result).to.have.status(CREATED);
            expect(allPets).to.have.length(1);
            expect(allPets[0].id).to.equal(result.body.pet.id);
        });

    it('GIVEN a duplicate pet breed and name, ' +
        'WHEN posting to pets endpoint, ' +
        'THEN HTTP STATUS CONFLICT',
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

            const pet = {
                name: 'Mysty',
                type: 'Dog',
                breed: 'Basset Hound',
                location: {
                    type: 'Point',
                    coordinates: [-104.6189, 50.4453],
                },
            };

            // Act

            const result = await chai
                .request(app)
                .post(PETS_ENDPOINT)
                .send({ pet });
            const allPets = await petRepo.find();

            // Assert

            expect(result).to.have.status(CONFLICT);
            expect(allPets).to.have.length(1);
            expect(allPets[0].id).to.equal(saved.id);

        });
});
