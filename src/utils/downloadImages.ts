import { dataDragonUrl, dataDragonVersion } from '../server/config';
import * as _ from 'lodash';
import { createWriteStream } from 'fs';
import { promisify } from 'util';
import axios from 'axios';
import { resolve } from 'path';

/* tslint:disable:no-console */

const pWriteStream = promisify(createWriteStream);
const spritePath = resolve(__dirname, '../static/img/sprites');
const listOfSprites = ['profileicon', 'spell', 'champion', 'item'];
const partialUrl = dataDragonUrl(dataDragonVersion, 'img', 'sprite/');

const dowloadImage = (url: string, fileName: string) =>
  axios({
    url,
    method: 'GET',
    responseType: 'stream',
  })
    .then(resp => {
      if (resp.status === 200) {
        resp.data.pipe(createWriteStream(`${spritePath}/${fileName}`));
      }
    })
    .catch(err => console.log(`Error: ${err.response.status} ${err.response.statusText}. Url: ${url}`));

_.forEach(listOfSprites, type => {
  const preparedRequests = _.map(_.range(0, 10), (idx: number) => {
    const fileName = `${type}${idx}.png`;
    return dowloadImage(`${partialUrl}${fileName}`, fileName);
  });

  Promise.all(preparedRequests)
    .then(() => console.log(`done downloading ${type}`))
    .catch(err => console.log(err));
});

/* tslint:enable:no-console */
