import { Router } from "express";
import { getFerments, getFerment, createFerment, updateFerment, deleteFerment } from "../controllers/ferments";
export const router = Router();

router.get('/', getFerments)

router.get('/:id', getFerment)

router.post('/', createFerment) 

router.put('/:id', updateFerment) 

router.delete('/:id', deleteFerment)