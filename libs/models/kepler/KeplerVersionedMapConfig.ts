import { KeplerMapConfig } from './KeplerMapConfig';
import { KeplerVersionedMapConfigInterface } from './KeplerVersionedMapConfigInterface';

export class KeplerVersionedMapConfig implements KeplerVersionedMapConfigInterface {
  config: KeplerMapConfig = new KeplerMapConfig();
  version = 'v1' as const;

  constructor(config: KeplerMapConfig = new KeplerMapConfig(), version = 'v1' as const) {
    this.config = new KeplerMapConfig(config);
    this.version = version;
  }
}
