import axios from 'axios';
import * as _ from 'lodash';
import { writeFile } from 'fs';
import { resolve } from 'path';
import { argv } from 'yargs';

// Downloads static data and converts { [name]: data } => {[id]: name} for easier search
// Example keys --url http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/summoner.json
// --file ./src/static/data/summonerMap.json

/* tslint:disable:no-console */
const downloadAndConvert = (args: { url: string; file: string }) => {
  const { url, file } = args;

  if (!url || !file) {
    const validMessage = () => {
      if (url && !file) {
        return `Missing file argument`;
      }

      if (!url && file) {
        return `Missing url argument`;
      }

      return `Missing both url and file arguments`;
    };

    return console.log(validMessage());
  }

  return axios
    .get(url)
    .then(resp => {
      const converted = _.reduce(resp.data.data, (acc, value, key) => ({ ...acc, [value.key]: key }), {});

      return writeFile(file, JSON.stringify(converted), 'utf8', err => {
        if (err) {
          console.log(err);
        }

        console.log('done');
      });
    })
    .catch(err => console.log(err));
};

downloadAndConvert(argv);
/* tslint:enable:no-console */
