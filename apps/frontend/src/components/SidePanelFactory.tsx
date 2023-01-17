import { Icons, SidePanelFactory as KeplerSidePanelFactory } from 'kepler.gl/components';
import PublicFilterManager from './side-panel/PublicFilterManager';

export function SidePanelFactory(...args) {
  const DatatlasSidePanel = KeplerSidePanelFactory(...args);
  DatatlasSidePanel.defaultProps.sidebarComponents = {
    ...DatatlasSidePanel.defaultProps.sidebarComponents,
    public_filter: PublicFilterManager,
  };

  DatatlasSidePanel.defaultProps = {
    ...DatatlasSidePanel.defaultProps,
    panels: DatatlasSidePanel.defaultProps.panels
      .concat([
        {
          id: 'public_filter',
          label: 'sidebar.panels.public_filter',
          // Required and must be a component or it crashes badly.
          iconComponent: Icons.Rocket,
          onClick: null,
        },
      ])
      .map((component) => ({
        ...component,
        component: DatatlasSidePanel.defaultProps.sidebarComponents[component.id],
      })),
  };

  return DatatlasSidePanel;
}

SidePanelFactory.deps = KeplerSidePanelFactory.deps;
