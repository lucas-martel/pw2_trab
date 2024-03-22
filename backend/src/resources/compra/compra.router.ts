import { Router } from "express";
import compraController from './compra.controller'
import validate from "middlewares/validate";
import carrinhoSchema from "./compra.schema";

const router = Router();

router.post('/add', validate(carrinhoSchema), compraController.addCarrinhoCompra)

export default router;