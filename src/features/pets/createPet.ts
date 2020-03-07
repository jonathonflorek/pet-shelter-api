import * as express from 'express';
import { getRepository, QueryFailedError } from 'typeorm';
import { PetEntity } from '../../models/PetEntity';

export async function createPet(req: express.Request, res: express.Response) {
    const repository = getRepository(PetEntity);
    try {
        const ir = await repository.insert(req.body.pet || {});
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
