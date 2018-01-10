import * as express from 'express';
import axios from 'axios';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as path from 'path';
import { isDev, isProd } from '../utils/variables';
import { serverPort } from '../utils/endpoints';

const app = express();
const port = isDev ? 3001 : serverPort;

if (isProd) {
  app.use('/', require('express-static-gzip')('dist')); // tslint:disable-line:no-var-requires
}

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/static', express.static('/src/static'));

app.all('/api/**', ({ originalUrl, method, headers, body }, res) => {
  const url = originalUrl.replace('/api', '');
  const region = body.region || 'euw1';
  const options = {
    headers: { 'X-Riot-Token': headers['x-riot-token'] },
    method: 'GET',
    url: `https://${region}.api.riotgames.com/lol${url}`,
  };

  return axios(options)
    .then(resp => {
      if (isDev) {
        console.log(resp.status, resp.data); // tslint:disable-line:no-console
      }

      return res.status(resp.status).send(resp.data);
    })
    .catch(err => res.status(err.response.status).send({ error: err.response.statusText }));
});

app.get('*', (req, res) => {
  if (isProd) {
    return res.sendFile(path.resolve(process.cwd(), 'dist', 'index.html'));
  }

  return;
});
// We launch proxy on separate port while developing
app.listen(port, () => console.log(`Server listening on ${port} port`)); // tslint:disable-line:no-console
