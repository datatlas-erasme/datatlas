import { notion } from './notion';
import * as fs from 'fs';

describe('Test : extraction of data from a notion page.', () => {
  it('Should get content of the notion page.', () => {
    try {
      const jsonString = fs.readFileSync('./libs/notion/src/lib/data_test.json', 'utf-8'); // todo make sure the path is built dynamically ie its base is the parent directory of the present file
      const jsonData = JSON.parse(jsonString);
      //expect(typeof notion(jsonData)).toBe({"fields":Array<string>,"rows":Array<object>,});
      expect(typeof notion(jsonData)).toBe('object');
    } catch (err) {
      console.error(err);
    }
  });
});
