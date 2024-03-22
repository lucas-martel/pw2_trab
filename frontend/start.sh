if [ "$NODE_ENV" = "production" ]; then
  echo "frontend inicializado em ambiente de produção"
  npm run build
  npm start
else
  echo "frontend inicializado em ambiente de desenvolvimento"
  npm run dev
fi