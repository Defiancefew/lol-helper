import Express from 'express';
import axios from 'axios';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';

const app = Express();

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.all('/api/**', ({ originalUrl, method, headers, body }, res) => {
  const url = originalUrl.replace('/api', '');
  const region = body.region || 'euw1';
  const options = {
    headers: { 'X-Riot-Token': headers['x-riot-token'] },
    method: 'GET',
    url: `https://${region}.api.riotgames.com/lol${url}`,
  };

  if (process.env.NODE_ENV === 'development') {
    console.log(options); // tslint:disable-line:no-console
  }

  return axios(options)
    .then(json => {
      res.status(json.status).send(json);
    })
    .catch(err => {
      console.log(err); // tslint:disable-line:no-console
      res.status(400).send(err);
    });
});

app.listen(3001, () => {
  console.log('Server listening on 3001 port'); // tslint:disable-line:no-console
});
