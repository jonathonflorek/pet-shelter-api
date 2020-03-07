import * as express from 'express';
import { getRepository } from 'typeorm';
import { PetEntity } from '../../models/PetEntity';

export async function getAllPets(_: express.Request, res: express.Response) {
    const repository = getRepository(PetEntity);
    const pets = await repository.find();
    res.status(200).json({ pets });
}
