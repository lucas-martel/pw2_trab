import { SignUpDto } from "@/types/auth";
import api from "@/utils/api";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/router";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function SignUp() {
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [tipoUsuarioId, setTipoUsuarioId] = useState<string>("");
  const [confirmSenha, setConfirmSenha] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmSenha, setShowConfirmSenha] = useState<boolean>(false);

  const router = useRouter();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (senha !== confirmSenha) {
      setError("Senhas diferentes");
      return;
    }

    const credenciais: SignUpDto = {
      nome: nome!,
      email: email!,
      senha: senha!,
      tipoUsuarioId: tipoUsuarioId!,
    };

    api
      .post(`/signup`, credenciais)
      .then((data) => {
        router.push("/produto");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Box sx={{ color: "rgb(0,0,0)" }}>
      <h1>Criação de Conta</h1>
      <form onSubmit={onSubmit}>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Nome"
            required
            value={nome}
            onChange={(e) => {
              setNome(e.target.value);
            }}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Senha"
            type={showPassword ? "text" : "password"}
            required
            value={senha}
            onChange={(e) => {
              setSenha(e.target.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      setShowPassword((prev) => !prev);
                    }}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box>
          <TextField
            label="Confirme a senha"
            type={showConfirmSenha ? "text" : "password"}
            required
            value={confirmSenha}
            onChange={(e) => {
              setConfirmSenha(e.target.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      setShowConfirmSenha((prev) => !prev);
                    }}
                  >
                    {showConfirmSenha ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" sx={{ color: "red" }}>
            {error}
          </Typography>
        </Box>
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                onChange={(e) => {
                  e.preventDefault();
                  setTipoUsuarioId(e.target.checked ? "admin" : "client");
                }}
              />
            }
            label="criar como administrador"
          />
        </Box>

        <Button variant="contained" type="submit">
          Enviar
        </Button>
      </form>
    </Box>
  );
}

export default SignUp;
