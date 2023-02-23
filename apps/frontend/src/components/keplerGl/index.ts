import { injectComponents } from 'kepler.gl';
import { replaceLoadDataModal } from './factories/LoadDataModalFactory';

export const KeplerGl = injectComponents([replaceLoadDataModal()]);
