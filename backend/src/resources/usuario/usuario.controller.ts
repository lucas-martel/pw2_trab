import { RequestHandler } from 'express';
import {
  createUsuario,
  readUsuario,
  usuarioAlreadyExists,
} from './usuario.service';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { CreateUsuarioDto } from './usuario.types';

const index: RequestHandler = async (req, res) => {};

const create: RequestHandler = async (req, res) => {
  const usuario: CreateUsuarioDto = req.body;
  try {
    if (await usuarioAlreadyExists(usuario.email)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'usuario already exists' });
    }
    const novoUsuario = await createUsuario(usuario);
    return res.status(StatusCodes.CREATED).json(novoUsuario);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

const read: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await readUsuario(id);
    if (!usuario) {
      return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
    }
    return res.status(StatusCodes.OK).json(usuario);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

const update: RequestHandler = async (req, res) => {};

const remove: RequestHandler = async (req, res) => {};

export default { index, create, read, update, remove };
