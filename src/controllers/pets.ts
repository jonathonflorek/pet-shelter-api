import * as express from 'express';
import { getRepository, QueryFailedError } from 'typeorm';
import { PetEntity } from '../models/PetEntity';

import * as t from 'io-ts';
import { either } from 'fp-ts';
import { failure } from 'io-ts/lib/PathReporter';

const petCreation = t.strict({
    pet: t.strict({
        name: t.string,
        type: t.string,
        breed: t.string,
        location: t.strict({
            type: t.literal('Point'),
            coordinates: t.tuple([t.number, t.number]),
        }, 'Point'),
    }, 'Pet'),
}, 'PetPost');

export async function createPet(req: express.Request, res: express.Response) {
    const petCreate = petCreation.decode(req.body);

    if (either.isLeft(petCreate)) {
        return res.status(422).json({
            errors: failure(petCreate.left),
        });
    }

    const repository = getRepository(PetEntity);
    try {
        const ir = await repository.insert(petCreate.right.pet);
        res.status(201).json({
            pet: {
                id: ir.identifiers[0].id,
                ...req.body.pet,
            },
        });
    } catch (ex) {
        if (ex instanceof QueryFailedError && ex.message.includes('duplicate key value violates unique constraint')) {
            res.status(409).send();
        } else {
            throw ex;
        }
    }
}

export async function getPetById(req: express.Request, res: express.Response) {
    const repository = getRepository(PetEntity);
    const pet = await repository.findOne(req.params.petid);
    if (pet) {
        res.status(200).json({ pet });
    } else {
        res.status(404).send();
    }
}

export async function getAllPets(_: express.Request, res: express.Response) {
    const repository = getRepository(PetEntity);
    const pets = await repository.find();
    res.status(200).json({ pets });
}
