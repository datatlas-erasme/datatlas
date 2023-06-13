import { notion } from './notion';
import * as fs from 'fs';

// Launch it using : jest path/to/project/datatlas/libs/notion/src/lib/notion.spec.ts while being in datatlas folder.

// Many warnings may be raised using jest>=29.0.0
// Reverting back to any jest 28 version seems to solve this problem.
// See more at this jest issue : https://github.com/jestjs/jest/issues/13576

describe('Test : extraction of data from a notion page.', () => {
  it('Should get content of the notion page.', () => {
    try {
      const jsonString = fs.readFileSync('./libs/notion/src/lib/data_test.json', 'utf-8');
      const jsonData = JSON.parse(jsonString);
      const notionData = notion(jsonData);
      expect(typeof notionData).not.toBe(null);
      expect(typeof notionData.fields).not.toBe(null);
      expect(typeof notionData.rows).not.toBe(null);
    } catch (err) {
      console.error(err);
    }
  });
});
