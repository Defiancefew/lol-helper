import { parseString } from 'xml2js';
import axios from 'axios';
import { writeFile } from 'fs';

const url = 'https://euw.leagueoflegends.com/en/rss.xml';

axios
  .get(url)
  .then(resp => {
    if (resp.status === 200) {
      parseString(resp.data, (err: any, result: any) => {
        console.log(err);

        if (!err) {
          writeFile('xml.json', JSON.stringify(result), 'utf8', err => err);
        }
      });
    }
  })
  .catch(err => console.log(err));
