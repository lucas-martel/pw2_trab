if [ "$NODE_ENV" = "production" ]; then
  echo "API inicializado em ambiente de produção"
  npm start
else
  echo "API inicializado em ambiente de desenvolvimento"
  npm run dev
fi