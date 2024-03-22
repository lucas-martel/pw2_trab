import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { v4 as uuidv4 } from 'uuid';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';

import swaggerFile from './swagger-output.json';
//import morgan from 'morgan';

import validateEnv from './utils/validateEnv';
//import logs from './utils/logsOnStore';
import router from './router';
import setCookieLang from './middlewares/setCookieLanguage';
import { carrinhoDeCompraDto } from './resources/compra/compra.types';

declare module 'express-session' {
  interface SessionData {
    uid: string;
    tipoUsuarioId: string;
    carrinho: carrinhoDeCompraDto[];
  }
}

dotenv.config();

validateEnv();

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:4466' }));

//app.use(morgan('combined'));

//app.use(logs('completo'));

app.use(express.json());

app.use('/img', express.static(`${__dirname}/../public/img`));

app.use(cookieParser());

app.use(setCookieLang);

app.use(
  session({
    genid: () => uuidv4(),
    secret: 'asASDM213LA@FAÇLMÇLSMÇDLASMMFMMFMFMMFA3W3EDEÇALSMDÇLAMSD',
    resave: true,
    saveUninitialized: true,
  }),
);

app.use(router);
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(process.env.PORT, () => {
  console.log(
    'backend api funcionado em:  http://localhost:' + process.env.PORT,
  );
});
