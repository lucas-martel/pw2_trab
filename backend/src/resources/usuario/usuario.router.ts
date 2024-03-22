import { Router } from 'express';
import validate from '../../middlewares/validate';
import usuarioSchema from './usuario.schema';

import usuarioController from './usuario.controller';

const router = Router();

router.get('/', usuarioController.index);
router.post('/', validate(usuarioSchema), usuarioController.create);
router.get('/:id', usuarioController.read);
router.put('/:id', validate(usuarioSchema), usuarioController.update);
router.delete('/:id', usuarioController.remove);

export default router;
