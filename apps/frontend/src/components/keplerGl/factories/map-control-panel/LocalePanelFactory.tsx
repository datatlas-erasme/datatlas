import React, { useCallback } from 'react';
import classnames from 'classnames';
import { ToolbarItem } from 'kepler.gl/dist';
import KeplerLocalePanelFactory from 'kepler.gl/dist/components/map/locale-panel';
import { MapControlButton } from 'kepler.gl/dist/components/common/styled-components';
import { LOCALES } from '../../../../i18n/locales';

LocalePanelFactory.deps = KeplerLocalePanelFactory.deps;

function LocalePanelFactory(MapControlTooltip, MapControlToolbar) {
  const LocalePanel = ({ onToggleMapControl, onSetLocale, locale: currentLocal, mapControls }) => {
    const { active: isActive, disableClose, show } = mapControls.mapLocale || {};

    const onClickItem = useCallback(
      (locale) => {
        onSetLocale(locale);
      },
      [onSetLocale]
    );

    const onClickButton = useCallback(
      (e) => {
        e.preventDefault();
        onToggleMapControl('mapLocale');
      },
      [onToggleMapControl]
    );
    const getLabel = useCallback((locale) => `toolbar.${locale}`, []);

    if (!show) {
      return null;
    }
    return (
      <div className="map-locale-controls" style={{ position: 'relative' }}>
        {isActive ? (
          <MapControlToolbar show={isActive}>
            {Object.keys(LOCALES).map((locale) => (
              <ToolbarItem
                key={locale}
                onClick={() => onClickItem(locale)}
                label={getLabel(locale)}
                active={currentLocal === locale}
              />
            ))}
          </MapControlToolbar>
        ) : null}
        <MapControlButton
          onClick={onClickButton}
          className={classnames('map-control-button', 'map-locale', { isActive })}
          active={isActive}
          data-tip
          data-for="locale"
          disableClose={disableClose}
        >
          <span className="map-control-button__locale">{currentLocal.toUpperCase()}</span>
          <MapControlTooltip id="locale" message="tooltip.selectLocale" />
        </MapControlButton>
      </div>
    );
  };

  return React.memo(LocalePanel);
}

export function replaceLocalePanel() {
  return [KeplerLocalePanelFactory, LocalePanelFactory];
}
