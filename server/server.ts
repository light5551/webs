import * as memRouter from './routers/members';
import * as optionsRouter from './routers/options';
import * as secursRouter from './routers/securities';
import InitHelper from './init_helper';
import express from 'express';
import bodyParser from 'body-parser';

const port = 4201;
const host = '127.0.0.1';
const app = express();

InitHelper.appendFiles();

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

memRouter.register(app);
optionsRouter.register(app);
secursRouter.register(app);

app.listen(port, host, () => {
  console.log('Server started');
});
