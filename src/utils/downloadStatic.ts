import { dataDragonUrl, dataDragonVersion } from '../server/config';
import * as _ from 'lodash';
import { createWriteStream } from 'fs';
import axios from 'axios';
import { resolve } from 'path';

/* tslint:disable:no-console */

const spritePath = resolve(__dirname, '../static/img/sprites');
const staticPath = resolve(__dirname, '../static/data');
const listOfStatic = ['profileicon', 'spell', 'champion', 'item'];
const spriteUrl = dataDragonUrl(dataDragonVersion, 'img', 'sprite/');
const staticUrl = dataDragonUrl(dataDragonVersion, 'data', 'en_US/');

const saveFiles = (type: string, url: string, fileName: string) =>
  axios({
    url,
    method: 'GET',
    responseType: 'stream',
  })
    .then(resp => {
      if (resp.status === 200) {
        resp.data.pipe(createWriteStream(`${type === 'sprite' ? spritePath : staticPath}/${fileName}`));
      }
    })
    .catch(err => console.log(`Error: ${err.response.status} ${err.response.statusText}. Url: ${url}`));

_.forEach(listOfStatic, type => {
  const preparedSpriteRequests = _.map(_.range(0, 10), (idx: number) => {
    const fileName = `${type}${idx}.png`;
    return saveFiles('sprite', `${spriteUrl}${fileName}`, fileName);
  });

  const fileName = `${type}.json`;
  saveFiles('data', `${staticUrl}${fileName}`, fileName).then(() => console.log(`downloaded ${type}.json`));

  Promise.all(preparedSpriteRequests)
    .then(() => console.log(`done downloading ${type}`))
    .catch(err => console.log(err));
});

/* tslint:enable:no-console */
