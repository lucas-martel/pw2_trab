export interface IProduto {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
}

export type CreateProdutoDtop = Pick<IProduto, "nome" | "preco" | "estoque">;

export type UpdateProdutoDtop = Pick<IProduto, "nome" | "preco" | "estoque">;
