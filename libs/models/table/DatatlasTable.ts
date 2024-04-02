import { KeplerTable } from '@kepler.gl/table';
import { ALL_FIELD_TYPES } from '@kepler.gl/constants';
import { Field, FieldDomain } from '@kepler.gl/types';
import { getNumericFieldDomain, getOrdinalDomain, getTimestampFieldDomain } from '@kepler.gl/utils';
import { getFilterProps } from '../utils';

export class DatatlasTable extends KeplerTable {
  /**
   * Save filterProps to field and retrieve it
   * @param columnName
   */
  getColumnFilterProps(columnName: string): Field['filterProps'] | null | undefined {
    const fieldIdx = this.getColumnFieldIdx(columnName);
    if (fieldIdx < 0) {
      return null;
    }
    const field = this.fields[fieldIdx];
    if ('filterProps' in field) {
      return field.filterProps;
    }

    const fieldDomain = this.getColumnFilterDomain(field);
    if (!fieldDomain) {
      return null;
    }

    const filterProps = getFilterProps(field, fieldDomain);
    const newField = {
      ...field,
      filterProps,
    };

    this.updateColumnField(fieldIdx, newField);

    return filterProps;
  }

  /**
   * Calculate field domain based on field type and data
   * for Filter
   */
  getColumnFilterDomain(field: Field): FieldDomain {
    const { dataContainer } = this;
    const { valueAccessor } = field;

    let domain;

    switch (field.type) {
      case ALL_FIELD_TYPES.real:
      case ALL_FIELD_TYPES.integer:
        // calculate domain and step
        return getNumericFieldDomain(dataContainer, valueAccessor);

      case ALL_FIELD_TYPES.boolean:
        return { domain: [true, false] };

      case ALL_FIELD_TYPES.string:
      case ALL_FIELD_TYPES.date:
        domain = getOrdinalDomain(dataContainer, valueAccessor);
        return { domain };

      case ALL_FIELD_TYPES.timestamp:
        return getTimestampFieldDomain(dataContainer, valueAccessor);

      default:
        return { domain: getOrdinalDomain(dataContainer, valueAccessor) };
    }
  }
}
