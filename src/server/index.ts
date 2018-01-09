import * as express from 'express';
import axios from 'axios';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';

const app = express();

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
      if (process.env.NODE_ENV === 'development') {
        console.log(resp.status, resp.data); // tslint:disable-line:no-console
      }

      return res.status(resp.status).send(resp.data);
    })
    .catch(err => res.status(err.response.status).send({ error: err.response.statusText }));
});

app.listen(3001, () => console.log('Server listening on 3001 port')); // tslint:disable-line:no-console
