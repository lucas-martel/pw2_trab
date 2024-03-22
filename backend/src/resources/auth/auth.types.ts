import { Usuario } from '@prisma/client';

export type SignupDto = Pick<
  Usuario,
  'nome' | 'email' | 'senha' | 'tipoUsuarioId'
>;

export type LoginDto = Pick<Usuario, 'email' | 'senha'>;
