import { Router } from 'express';

import ProdutoController from './produto.controller';
import validate from '../../middlewares/validate';
import produtoSchema from './produto.schema';
//import isAdmin from '../../middlewares/isAdmin';
//import isAuth from '../../middlewares/isAuth';

const router = Router();

router.get('/', ProdutoController.index);
router.post(
  '/',
  /* isAdmin,
  isAuth, */
  validate(produtoSchema),
  ProdutoController.create,
);
router.get('/:id', ProdutoController.read);
router.put(
  '/:id',
  /* isAdmin, */ validate(produtoSchema),
  ProdutoController.update,
);
router.delete('/:id', /* isAdmin, */ ProdutoController.remove);

export default router;
