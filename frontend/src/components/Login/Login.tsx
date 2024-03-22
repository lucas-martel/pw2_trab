import api from "@/utils/api";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { FormEvent, useState, useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/provider/AuthProvider";

function Login() {
  const { auth, setAuth } = useContext(AuthContext);

  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const credenciais = { email, senha };
    api
      .post("login", credenciais, { withCredentials: true })
      .then((data) => {
        setError("");
        setAuth({
          nome: data.data.nome,
          tipoUsuarioId: data.data.tipoUsuarioId,
        });
        router.push("/produto");
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setError("Email e/ou senha Invalidos");
        }
      });
  };

  return (
    <Box>
      <h1>Login de Usuário</h1>
      <form onSubmit={onSubmit}>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box>
          <TextField
            label="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" sx={{ color: "red" }}>
            {error}
          </Typography>
        </Box>
        <Button variant="contained" type="submit">
          Entrar
        </Button>
      </form>
    </Box>
  );
}

export default Login;
