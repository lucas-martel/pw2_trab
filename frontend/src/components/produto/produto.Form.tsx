import { IProduto, CreateProdutoDtop } from "@/types/produto";
import { Box, TextField, Button } from "@mui/material";
import React, { FormEvent, useState } from "react";

interface Props {
  handleSubmit: (produto: CreateProdutoDtop) => void;
  produto?: IProduto;
}

function ProdutoForm({ handleSubmit, produto }: Props) {
  const [nome, setNome] = useState<string>(produto ? produto.nome : "");
  const [preco, setPreco] = useState<number | undefined>(
    produto ? produto.preco : undefined
  );
  const [estoque, setEstoque] = useState<number | undefined>(
    produto ? produto.estoque : undefined
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const produto = { nome: nome!, preco: preco!, estoque: estoque! };
    handleSubmit(produto);
  };

  return (
    <form onSubmit={onSubmit}>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Nome"
          value={nome}
          required
          onChange={(e) => {
            setNome(e.target.value);
          }}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="preco"
          type="number"
          required
          value={preco ?? ""}
          onChange={(e) => {
            setPreco(parseFloat(e.target.value));
          }}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="estoque"
          type="number"
          required
          value={estoque ?? ""}
          onChange={(e) => {
            setEstoque(parseInt(e.target.value));
          }}
        />
      </Box>
      <Button variant="contained" type="submit">
        Enviar
      </Button>
    </form>
  );
}

export default ProdutoForm;
