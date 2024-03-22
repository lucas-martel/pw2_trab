import React, { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/utils/api";
import { IProduto } from "@/types/produto";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function ProdutoIndex() {
  const [produtos, setProdutos] = useState<IProduto[]>([]);

  useEffect(() => {
    api
      .get("/produto", { withCredentials: true })
      .then((data) => {
        setProdutos(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box flexGrow={1} sx={{ color: "rgb(0,0,0)" }}>
      <h1>Produtos</h1>
      <Button component={Link} href="/produto/create" variant="contained">
        <AddIcon />
      </Button>
      <ul>
        {produtos.map((prod) => (
          <li
            className="modularizer"
            key={prod.id}
            style={{ listStyleType: "disc" }}
          >
            <Link href={`/produto/${prod.id}`}>{prod.nome}</Link>
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default ProdutoIndex;
