import { ModalContainerFactory as KeplerModalContainerFactory } from 'kepler.gl/components';

const ModalContainerFactory = (...deps) => {
  const SaveMapModal = KeplerModalContainerFactory(...deps);

  console.log(SaveMapModal);

  return SaveMapModal;
};

ModalContainerFactory.deps = KeplerModalContainerFactory.deps;

export function replaceModal() {
  return [KeplerModalContainerFactory, ModalContainerFactory];
}
