import {Field, FieldDomain, Filter} from '@kepler.gl/types';
import {ALL_FIELD_TYPES, FILTER_TYPES, FILTER_VIEW_TYPES} from '@kepler.gl/constants';

/**
 * Get default filter prop based on field type
 *
 * @param field
 * @param fieldDomain
 * @returns default filter
 */
export function getFilterProps(
  field: Field,
  fieldDomain: FieldDomain
): Partial<Filter> & {fieldType: string} {
  const filterProps = {
    ...fieldDomain,
    fieldType: field.type,
    view: FILTER_VIEW_TYPES.side
  };

  switch (field.type) {
    case ALL_FIELD_TYPES.real:
    case ALL_FIELD_TYPES.integer:
      // @ts-ignore
      return {
        ...filterProps,
        value: fieldDomain.domain,
        type: FILTER_TYPES.range,
        // @ts-ignore
        typeOptions: [FILTER_TYPES.range],
        gpu: true
      };

    case ALL_FIELD_TYPES.boolean:
      // @ts-ignore
      return {
        ...filterProps,
        type: FILTER_TYPES.select,
        value: true,
        gpu: false
      };

    case ALL_FIELD_TYPES.string:
    case ALL_FIELD_TYPES.date:
      // @ts-ignore
      return {
        ...filterProps,
        type: FILTER_TYPES.multiSelect,
        value: [],
        gpu: false
      };

    case ALL_FIELD_TYPES.timestamp:
      // @ts-ignore
      return {
        ...filterProps,
        type: FILTER_TYPES.timeRange,
        view: FILTER_VIEW_TYPES.enlarged,
        fixedDomain: true,
        value: filterProps.domain,
        gpu: true
      };

    default:
      // @ts-ignore
      return {};
  }
}
