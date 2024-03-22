import { Router } from 'express';
import produtoRouter from '../resources/produto/produto.router';
import exercicioRouter from '../resources/exercicio/exercicio.router';
import languageRouter from '../resources/language/language.router';
import usuarioRouter from '../resources/usuario/usuario.router';
import authRouter from '../resources/auth/auth.router';
const router = Router();

router.use(
  '/produto',
  // #swagger.tags = ['Produto']
  produtoRouter
);
router.use(
  '/',
  // #swagger.tags = ['Auth']
  authRouter
);
router.use(
  '/exercicio',
  // #swagger.tags = ['Exercicio']
  exercicioRouter
);
router.use(
  '/language',
  // #swagger.tags = ['Language']
  languageRouter
);
router.use(
  '/usuario',
  // #swagger.tags = ['Usuario']
  usuarioRouter
);

export default router;
