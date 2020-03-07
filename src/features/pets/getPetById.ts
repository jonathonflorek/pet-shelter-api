import * as express from 'express';
import { getRepository } from 'typeorm';
import { PetEntity } from '../../models/PetEntity';

export async function getPetById(req: express.Request, res: express.Response) {
    const repository = getRepository(PetEntity);
    const pet = await repository.findOne(req.params.petid);
    if (pet) {
        res.status(200).json({ pet });
    } else {
        res.status(404).send();
    }
}
