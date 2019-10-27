const express = require('express');

const port = 4201;
const host = '127.0.0.1';
const app = express();

app.get('/', (req: any, res: any) => {
  res.send('Hello world!');
});

app.listen(port, host, () => {
  console.log('server started');
});
