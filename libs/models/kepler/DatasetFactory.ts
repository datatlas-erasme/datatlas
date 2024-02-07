import { ProtoDataset } from '@kepler.gl/types';
import { ParsedField } from '@kepler.gl/schemas';
import { processGeojson } from '@kepler.gl/processors';
import { ColorFactory } from '../ColorFactory';

export interface DatasetFactory {
  fields: ParsedField[];
  rows: never[][];
}

export class DatasetFactory {
  public static async createFromURL(url: URL): Promise<ProtoDataset> {
    // This will be replaced by the POST version once the backend is ready.
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      cache: 'default',
    });

    // const response = await fetch('/api/dataset', {
    //   method: 'POST',
    //   mode: 'no-cors',
    //   cache: 'default',
    //   body: JSON.stringify(getValues()),
    // });

    if (response.status > 200) {
      throw new Error(`Whoopsie... ${response.statusText} \n ${response.body}`);
    }
    const pathname = url.pathname;

    const processResult = processGeojson(await response.json());
    if (!processResult) {
      throw new Error(`Couldn't process GeoJson. Processing return null.`);
    }

    return {
      info: {
        label: pathname.substring(pathname.lastIndexOf('/') + 1),
        id: url
          .toString()
          .split('')
          .reduce((a, b) => {
            a = (a << 5) - a + b.charCodeAt(0);
            return a & a;
          }, 0)
          .toString(),
        color: ColorFactory.createRandomRGBArray(),
      },
      data: processResult,
    };
  }
}
