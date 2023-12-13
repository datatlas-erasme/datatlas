import React from 'react';
import Select from 'react-select';
import { PublicUserInterface } from '@datatlas/models';
import { FormattedMessage } from 'react-intl';

type Match = PublicUserInterface;

const getOptionValue = ({ id }: Match) => String(id);

const getOptionLabel = (match: Match) => match.email;

const NoResults = ({ inputValue }) => {
  return <FormattedMessage id={'input.contributors.noResults'} defaultMessage={'No results'} />;
};

interface ContributorSelectorProps {
  users?: PublicUserInterface[];
  contributors: PublicUserInterface[];
  handleChange: (publicUsers: readonly PublicUserInterface[]) => void;
}

export const ContributorsSelector = ({ users, contributors, handleChange }: ContributorSelectorProps) => {
  return (
    <Select
      isClearable={false}
      noOptionsMessage={NoResults}
      closeMenuOnSelect={false}
      defaultValue={contributors}
      isMulti
      options={users || []}
      getOptionValue={getOptionValue}
      getOptionLabel={getOptionLabel}
      onChange={handleChange}
      maxMenuHeight={100}
    />
  );
};
