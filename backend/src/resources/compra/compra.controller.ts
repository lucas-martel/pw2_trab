import { RequestHandler } from 'express';
import { carrinhoDeCompraDto } from './compra.types';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const addCarrinhoCompra: RequestHandler = (req, res) => {
  const carrinho = req.body as carrinhoDeCompraDto;

  req.session.carrinho?.push(carrinho);

  res.status(StatusCodes.OK).json(ReasonPhrases.OK);
};

export default { addCarrinhoCompra };
