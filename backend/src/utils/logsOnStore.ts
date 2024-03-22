import { RequestHandler } from 'express';
import fs from 'fs';
import path from 'path';

const createLog = (data: string) => {
  const folderPath = path.join(__dirname, '..', '..', process.env.LOGS_FOLDER!);

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  const filePath = path.join(
    folderPath,
    'logs.log',
  );

  fs.appendFile(filePath, data + '\n', err => {
    if (err) throw err;
  });
};

function logs(format: 'simples' | 'completo'): RequestHandler {
  return (req, _, next) => {
    const data =
      '[date: ' +
      new Date().toISOString() +
      ' ,url: ' +
      req.url +
      ' ,method: ' +
      req.method +
      (format === 'simples'
        ? ']'
        : ' ,httpversion: ' +
          req.httpVersion +
          ' ,userAgent: ' +
          req.get('User-Agent')) +
      ']';
    try {
      createLog(data);
    } catch (err) {
      console.log(err);
    }
    next();
  };
}

export default logs;
