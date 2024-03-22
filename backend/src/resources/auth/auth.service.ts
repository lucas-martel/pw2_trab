import { compare } from 'bcryptjs';
import { LoginDto } from './auth.types';
import { PrismaClient, Usuario } from '@prisma/client';

const prisma = new PrismaClient();

export const checkCredentials = async ({
  email,
  senha,
}: LoginDto): Promise<false | Usuario> => {
  const usuario = await prisma.usuario.findUnique({
    where: { email },
  });
  if (!usuario) {
    return false;
  }
  const ok = await compare(senha, usuario.senha);
  if (ok) {
    return usuario;
  }
  return false;
};
