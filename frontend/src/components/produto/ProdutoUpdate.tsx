import api from "@/utils/api";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProdutoForm from "./produto.Form";
import { IProduto, UpdateProdutoDtop } from "@/types/produto";

interface Props {
  id: string;
}

function ProdutoUpdate({ id }: Props) {
  const [produto, setProduto] = useState<IProduto>();

  const router = useRouter();

  useEffect(() => {
    api
      .get(`/produto/${id}`)
      .then((data) => {
        setProduto(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleSubmit = (produto: UpdateProdutoDtop) => {
    api
      .put(`/produto/${id}`, produto)
      .then(() => {
        router.push(`/produto/${id}`);
      })
      .catch((err) => console.log(err));
  };

  if (!produto) {
    return <h1>Carregando...</h1>;
  }

  return (
    <div>
      <h2>Criação de Produto</h2>
      <ProdutoForm handleSubmit={handleSubmit} produto={produto} />
    </div>
  );
}

export default ProdutoUpdate;
