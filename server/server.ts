import * as fs from 'fs';
import * as memRouter from './routers/members';
import express from 'express';
import bodyParser from 'body-parser';

const port = 4201;
const host = '127.0.0.1';
const app = express();

if (!fs.existsSync(__dirname + '/storage')) {
  fs.mkdirSync(__dirname + '/storage');
}

if (!fs.existsSync(__dirname + '/storage/members.json')) {
  fs.appendFileSync(__dirname + '/storage/members.json', '[ ]');
}

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

memRouter.register(app);

app.listen(port, host, () => {
  console.log('Server started');
});
