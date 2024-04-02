import {
  FileUploadFactory,
  LoadDataModalFactory as KeplerLoadDataModalFactory,
  LoadStorageMapFactory,
  ModalTabsFactory
} from '@kepler.gl/components';
import {LoadingMethod} from '@kepler.gl/components/dist/modals/load-data-modal';
import {Factory} from '@kepler.gl/components/dist/injector';
import {LoadRemoteDatasetForm} from '../../forms';

LoadDataModalFactory.deps = KeplerLoadDataModalFactory.deps;

function LoadDataModalFactory(
  ModalTabs: ReturnType<typeof ModalTabsFactory>,
  FileUpload: ReturnType<typeof FileUploadFactory>,
  LoadStorageMap: ReturnType<typeof LoadStorageMapFactory>
) {
  const LoadDataModal = KeplerLoadDataModalFactory(ModalTabs, FileUpload, LoadStorageMap);
  const remoteLoadingMethod: LoadingMethod = {
    id: 'remote',
    label: 'modal.loadData.remote',
    elementType: LoadRemoteDatasetForm
  };

  const uploadLoadingMethod = LoadDataModal?.defaultProps?.loadingMethods?.find(
    lm => lm.id === 'upload'
  );
  // @ts-ignore
  const loadingMethods: LoadingMethod[] = [remoteLoadingMethod, uploadLoadingMethod].filter(
    lm => !!lm
  );
  LoadDataModal.defaultProps = {
    ...LoadDataModal.defaultProps,
    loadingMethods
  };

  return LoadDataModal;
}

export function replaceLoadDataModal(): [Factory, Factory] {
  // @ts-ignore
  return [KeplerLoadDataModalFactory, LoadDataModalFactory];
}
