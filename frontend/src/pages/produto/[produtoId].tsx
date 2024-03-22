import React from "react";
import { useRouter } from "next/router";
import ProdutoCard from "@/components/produto/ProdutoCard";
import { IProduto } from "@/types/produto";

function ProdutoCardPage() {
  const router = useRouter();
  const produtoId = router.query.produtoId as string;
  return <ProdutoCard id={produtoId} />;
}
export default ProdutoCardPage;
