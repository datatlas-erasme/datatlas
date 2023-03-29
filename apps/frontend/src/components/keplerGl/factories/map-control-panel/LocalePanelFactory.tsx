import React from 'react';
import KeplerLocalePanelFactory from 'kepler.gl/dist/components/map/locale-panel';

LocalePanelFactory.deps = KeplerLocalePanelFactory.deps;

function LocalePanelFactory(MapControlTooltip, MapControlToolbar) {
  return KeplerLocalePanelFactory(MapControlTooltip, MapControlToolbar);
}

export function replaceLocalePanel() {
  return [KeplerLocalePanelFactory, LocalePanelFactory];
}
