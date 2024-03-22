import { Router } from 'express';
import generate_lorem from './exercicio.controller';

const router = Router();

router.get('/lorem/:qtd', generate_lorem);

export default router;