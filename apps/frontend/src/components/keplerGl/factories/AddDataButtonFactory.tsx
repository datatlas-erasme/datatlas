import React from 'react';
import {AddLayerButtonFactory} from '@kepler.gl/components';
import {AddLayerButtonProps} from '@kepler.gl/components/dist/side-panel/layer-panel/add-layer-button';
import AddByDatasetButton from '@kepler.gl/components/dist/side-panel/add-by-dataset-button';
import {Factory} from '@kepler.gl/components/dist/injector';

AddDataButtonFactory.deps = [];

export function AddDataButtonFactory() {
  const AddDataButton: React.FC<AddLayerButtonProps> = ({datasets, onAdd}) => {
    return (
      <AddByDatasetButton
        datasets={datasets}
        className="add-data-button"
        width="110px"
        onAdd={onAdd}
        buttonIntlId="layerManager.addData"
      />
    );
  };

  return AddDataButton;
}

export function replaceAddDataButtonFactory(): [Factory, Factory] {
  // @ts-ignore
  return [AddLayerButtonFactory, AddDataButtonFactory];
}
