import React from 'react';
import {InteractionManagerFactory as KeplerInteractionManagerFactory} from '@kepler.gl/components';
import {Factory} from '@kepler.gl/components/dist/injector';

export type InteractionConfigType = 'tooltip' | 'geocoder' | 'brush' | 'coordinate' | 'filters';

const enabledInteractionConfigTypes: InteractionConfigType[] = ['tooltip'];

function InteractionManagerFactory(InteractionPanel) {
  return ({interactionConfig, datasets, visStateActions}) => {
    const {interactionConfigChange: onConfigChange} = visStateActions;
    return (
      <div className="interaction-manager">
        {Object.keys(interactionConfig)
          .filter(key => enabledInteractionConfigTypes.includes(key as InteractionConfigType))
          .map(key => (
            <InteractionPanel
              datasets={datasets}
              config={interactionConfig[key]}
              key={key}
              onConfigChange={onConfigChange}
            />
          ))}
      </div>
    );
  };
}

InteractionManagerFactory.deps = KeplerInteractionManagerFactory.deps;

export function replaceInteractionManager(): [Factory, Factory] {
  // @ts-ignore
  return [KeplerInteractionManagerFactory, InteractionManagerFactory];
}
