import { PrismaClient, Usuario } from '@prisma/client';
import { CreateUsuarioDto } from './usuario.types';
import { genSalt, hash } from 'bcryptjs';

const prisma = new PrismaClient();

export const createUsuario = async (
  usuario: CreateUsuarioDto,
): Promise<Usuario> => {
  const salt = await genSalt(parseInt(process.env.SALT_ROUNDS!));
  const senha = await hash(usuario.senha, salt);

  return await prisma.usuario.create({
    data: { ...usuario, senha: senha },
  });
};

export const usuarioAlreadyExists = async (email: string): Promise<boolean> => {
  return !!(await prisma.usuario.findUnique({
    where: { email },
  }));
};

export const readUsuario = async (id: string): Promise<Usuario | null> => {
  return await prisma.usuario.findUnique({ where: { id } });
};
