import { Router } from 'express';
import { createPet } from './createPet';
import { getPetById } from './getPetById';
import { getAllPets } from './petsIndex';

const petsController = Router();

petsController.get('/', getAllPets);
petsController.post('/', createPet);
petsController.get('/:petid', getPetById);

export { petsController };
