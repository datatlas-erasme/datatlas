import React, {useCallback} from 'react';
import classnames from 'classnames';
import {
  LocalePanelFactory as KeplerLocalePanelFactory,
  MapControlButton,
  MapControlToolbarFactory,
  MapControlTooltipFactory,
  ToolbarItem
} from '@kepler.gl/components';
import {LocalePanelProps} from '@kepler.gl/components/dist/map/locale-panel';

LocalePanelFactory.deps = KeplerLocalePanelFactory.deps;

function LocalePanelFactory(
  MapControlTooltip: ReturnType<typeof MapControlTooltipFactory>,
  MapControlToolbar: ReturnType<typeof MapControlToolbarFactory>
) {
  const LocalePanel: React.FC<LocalePanelProps> = React.memo(
    ({availableLocales, onToggleMapControl, onSetLocale, locale: currentLocal, mapControls}) => {
      const {active: isActive, show} = mapControls.mapLocale || {};

      const onClickItem = useCallback(
        locale => {
          onSetLocale(locale);
        },
        [onSetLocale]
      );

      const onClickButton = useCallback(
        e => {
          e.preventDefault();
          onToggleMapControl('mapLocale');
        },
        [onToggleMapControl]
      );
      const getLabel = useCallback(locale => `toolbar.${locale}`, []);

      if (!show) {
        return null;
      }
      return (
        <div
          className={classnames('locale-panel-controls', 'map-locale-controls')}
          style={{position: 'relative'}}
        >
          {isActive ? (
            <MapControlToolbar show={isActive}>
              {availableLocales.map(locale => (
                <ToolbarItem
                  key={locale}
                  onClick={() => onClickItem(locale)}
                  label={getLabel(locale)}
                  active={currentLocal === locale}
                />
              ))}
            </MapControlToolbar>
          ) : null}
          <MapControlTooltip id="locale" message="tooltip.selectLocale">
            <MapControlButton
              className={classnames('map-control-button', 'locale-panel', 'map-locale', {isActive})}
              onClick={onClickButton}
              active={isActive}
            >
              <span className="map-control-button__locale">{currentLocal.toUpperCase()}</span>
            </MapControlButton>
          </MapControlTooltip>
        </div>
      );
    }
  );

  LocalePanel.displayName = 'LocalePanel';

  return LocalePanel;
}

export function replaceLocalePanel() {
  return [KeplerLocalePanelFactory, LocalePanelFactory];
}
