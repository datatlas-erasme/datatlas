import React, { useCallback, useMemo } from 'react';
import { injectIntl, FormattedDate, WrappedComponentProps } from 'react-intl';
import { Datasets, Layer } from 'kepler.gl/src';
import { Action } from '@reduxjs/toolkit';

interface PublicFilterManagerProps extends WrappedComponentProps {
  date: Date | number;
  filters: object[];
  datasets?: Datasets;
  layers: Layer[];
  actions: {};
}

const PublicFilterManager = ({ actions, date, intl, datasets, filters, layers }: PublicFilterManagerProps) => {
  const { addFilter, enlargeFilter, removeFilter, setFilter, toggleAnimation, toggleFilterFeature, showDatasetTable } =
    actions;
  const isAnyFilterAnimating = filters.some((f) => f.isAnimating);
  const hadEmptyFilter = filters.some((f) => !f.name);
  const hadDataset = Object.keys(datasets).length;
  const onClickAddFilter = useCallback(() => {
    const defaultDataset = (Object.keys(datasets).length && Object.keys(datasets)[0]) || null;
    addFilter(defaultDataset);
  }, [datasets, addFilter]);
  // render last added filter first
  const reversedIndex = useMemo(() => {
    return new Array(filters.length)
      .fill(0)
      .map((d, i) => i)
      .reverse();
  }, [filters.length]);

  return (
    <div className="filter-manager">
      <span title={intl.formatDate(date)}>
        <FormattedDate value={date} />
      </span>
      <SourceDataCatalog datasets={datasets} showDatasetTable={showDatasetTable} />
      <SidePanelDivider />
      <SidePanelSection>
        {reversedIndex.map((idx) => (
          <FilterPanel
            key={`${filters[idx].id}-${idx}`}
            idx={idx}
            filters={filters}
            filter={filters[idx]}
            datasets={datasets}
            layers={layers}
            isAnyFilterAnimating={isAnyFilterAnimating}
            removeFilter={() => removeFilter(idx)}
            enlargeFilter={() => enlargeFilter(idx)}
            toggleAnimation={() => toggleAnimation(idx)}
            toggleFilterFeature={() => toggleFilterFeature(idx)}
            setFilter={setFilter}
          />
        ))}
      </SidePanelSection>
      <Button
        className="add-filter-button"
        inactive={hadEmptyFilter || !hadDataset}
        width="105px"
        onClick={onClickAddFilter}
      >
        <Add height="12px" />
        <FormattedMessage id={'filterManager.addFilter'} />
      </Button>
    </div>
  );
};

export default injectIntl(PublicFilterManager);
