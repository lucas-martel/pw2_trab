export interface Auth {
  nome: string;
  tipoUsuario: "A" | "C";
}

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  senha: string;
  tipoUsuarioId: string;
}

export type SignUpDto = Pick<
  Usuario,
  "nome" | "email" | "senha" | "tipoUsuarioId"
>;
export type LoginDto = Pick<Usuario, "email" | "senha">;
