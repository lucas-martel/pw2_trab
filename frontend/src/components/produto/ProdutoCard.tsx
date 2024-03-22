import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IProduto } from "@/types/produto";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { ButtonGroup, IconButton, Link } from "@mui/material";
import api from "@/utils/api";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";

interface Prop {
  id: string;
}

export default function ProdutoCard({ id }: Prop) {
  const [quantidade, setQuantidade] = useState(1);
  const [produto, setProduto] = useState<IProduto>();

  const router = useRouter();

  const precoTotal = produto ? produto.preco * quantidade : 0;

  function handleQuantidade(inc: number) {
    const value = quantidade + inc;
    if ((produto && value > produto.estoque) || value < 1) {
      return;
    }
    setQuantidade(value);
  }

  const HandleDelete = (e: any) => {
    e.preventDefault();
    api
      .delete(`/produto/${id}`)
      .then(() => {
        router.push("/produto");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    api.get(`/produto/${id}`).then((data) => {
      setProduto(data.data);
    });
  }, [id]);

  if (!produto) return <>Carregando...</>;

  return (
    <Card sx={{ maxWidth: 355 }}>
      <CardContent>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography gutterBottom variant="h4" component="div">
            {produto.nome}
          </Typography>
          <CardActions>
            <ButtonGroup variant="contained" aria-label="Basic">
              <Button
                variant="contained"
                size="small"
                onClick={() => handleQuantidade(1)}
              >
                <AddIcon />
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={() => handleQuantidade(-1)}
              >
                <RemoveIcon />
              </Button>
            </ButtonGroup>
          </CardActions>
        </div>
        <Typography variant="body2" color="text.secondary">
          Preço: {produto.preco}
          <br />
          Estoque: {produto.estoque}
          <br />
          Quantidade: {quantidade}
          <br />
          Preço Total: {precoTotal}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton
          component={Link}
          href={`/produto/update/${id}`}
          aria-label=""
        >
          <EditIcon />
        </IconButton>

        <IconButton aria-label="" onClick={HandleDelete}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
