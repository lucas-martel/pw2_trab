import api from "@/utils/api";
import React, { useState } from "react";
import { useRouter } from "next/router";
import ProdutoForm from "./produto.Form";
import { CreateProdutoDtop } from "@/types/produto";
import style from "./produto.module.css";
import { useContext } from "react";
import { AuthContext } from "@/provider/AuthProvider";
import { Auth } from "@/types/auth";
function ProdutoCreate() {
  const { auth, setAuth } = useContext(AuthContext);

  const router = useRouter();
  const [error, setError] = useState<string>("");
  const handleSubmit = (produto: CreateProdutoDtop) => {
    api
      .post(`/produto`, produto)
      .then(() => {
        router.push("/produto");
      })
      .catch((err) => console.log(err));
  };

  console.log(auth);
  return (
    <div>
      <h2 className={style.TextBlack}>Criação de Produto</h2>
      <ProdutoForm handleSubmit={handleSubmit} />
    </div>
  );
}

export default ProdutoCreate;
