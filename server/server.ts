import InitHelper from './init_helper';
import express from 'express';

const port = 4201;
const host = '127.0.0.1';
const app = express();

InitHelper.appendFiles();
InitHelper.configureRouters(app);

app.listen(port, host, () => {
  console.log('Server started');
});
