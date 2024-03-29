import { LoadDataModalFactory as KeplerLoadDataModalFactory, LoadingMethod } from 'kepler.gl/components';
import { LoadRemoteDatasetForm } from '../../forms';

const LoadDataModalFactory = (...deps) => {
  const LoadDataModal = KeplerLoadDataModalFactory(...deps);
  const remoteLoadingMethod: LoadingMethod = {
    id: 'remote',
    label: 'modal.loadData.remote',
    elementType: LoadRemoteDatasetForm,
  };

  LoadDataModal.defaultProps = {
    ...LoadDataModal.defaultProps,
    loadingMethods: [remoteLoadingMethod, LoadDataModal.defaultProps.loadingMethods.find((lm) => lm.id === 'upload')],
  };

  return LoadDataModal;
};

LoadDataModalFactory.deps = KeplerLoadDataModalFactory.deps;

export function replaceLoadDataModal() {
  return [KeplerLoadDataModalFactory, LoadDataModalFactory];
}
