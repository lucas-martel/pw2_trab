import { PrismaClient, Produto } from '@prisma/client';
import { CreateProdutoDto, UpdateProdutoDto } from './produto.types';

const prisma = new PrismaClient();

export const listProdutos = async (): Promise<Produto[]> => {
  return await prisma.produto.findMany();
};

export const produtoAlreadyExists = async (nome: string): Promise<boolean> => {
  return !!(await prisma.produto.findUnique({
    where: { nome },
  }));
};

export const createProduto = async (
  produto: CreateProdutoDto,
): Promise<Produto> => {
  return await prisma.produto.create({
    data: produto,
  });
};

export const readProduto = async (id: string): Promise<Produto | null> => {
  return await prisma.produto.findUnique({ where: { id } });
};

export const updateProduto = async (
  id: string,
  produto: UpdateProdutoDto,
): Promise<Produto> => {
  return await prisma.produto.update({
    where: { id },
    data: produto,
  });
};

export const removeProduto = async (id: string): Promise<Produto> => {
  return await prisma.produto.delete({
    where: { id },
  });
};
