import { RequestHandler } from 'express';

import {
  createProduto,
  listProdutos,
  produtoAlreadyExists,
  readProduto,
  removeProduto,
  updateProduto,
} from './produto.service';

import { CreateProdutoDto, UpdateProdutoDto } from './produto.types';

import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const index: RequestHandler = async (req, res) => {
  /*
  #swagger.summary = 'Busca todos os produtos no estoque.'
  */
  try {
    const produtos = await listProdutos();
    return res.status(StatusCodes.OK).json(produtos);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

const create: RequestHandler = async (req, res) => {
  /*
  #swagger.summary = 'Adiciona um novo produto na base.'
  */
  const produto: CreateProdutoDto = req.body;

  try {
    if (await produtoAlreadyExists(produto.nome)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'produto already exists' });
    }
    const novoProduto = await createProduto(produto);
    return res.status(StatusCodes.CREATED).json(novoProduto);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

const read: RequestHandler = async (req, res) => {
  /*
  #swagger.summary = 'busca por um produto usando o id.'
  */
  const { id } = req.params;
  try {
    const produto = await readProduto(id);
    if (!produto) {
      return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
    }
    return res.status(StatusCodes.OK).json(produto);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

const update: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const produto = req.body as UpdateProdutoDto;
  try {
    const produtoCreated = await updateProduto(id, produto);
    if (!produtoCreated) {
      return res
        .status(StatusCodes.NOT_MODIFIED)
        .json(ReasonPhrases.NOT_MODIFIED);
    }
    return res.status(StatusCodes.CREATED).json(produtoCreated);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

const remove: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const produtoDeletado = await removeProduto(id);
    if (!produtoDeletado) {
      return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
    }
    return res.status(StatusCodes.OK).json(produtoDeletado);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default { index, create, read, update, remove };
