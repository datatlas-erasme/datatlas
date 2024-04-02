import React from 'react';
import { LoadingProjectInterface, UserInterface } from '@datatlas/models';
import { Trash } from '@kepler.gl/components/dist/common/icons';
import { IconButton } from './buttons';
import { FormattedMessage } from 'react-intl';

interface ProjectUserTableRowProps {
  name: string;
  isOwner?: boolean;
  canDeleteContributor?: boolean;
  deleteContributor?: () => void;
}

const ProjectUserTableRow = ({ name, isOwner, canDeleteContributor, deleteContributor }: ProjectUserTableRowProps) => (
  <tr>
    <td>{name}</td>
    <td>
      {isOwner ? (
        <FormattedMessage id={'project.owner'} defaultMessage="Owner" />
      ) : (
        <FormattedMessage id={'project.contributor'} defaultMessage="Contributeur" />
      )}
    </td>
    <td>{canDeleteContributor && <IconButton Icon={<Trash />} onClick={deleteContributor} />}</td>
  </tr>
);

interface ProjectUserTableProps {
  owner: LoadingProjectInterface['owner'];
  contributors: Pick<UserInterface, 'name' | 'id'>[];
  canDeleteContributor: boolean;
  deleteContributor: () => void;
}

export const ProjectUserTable = ({
  owner,
  contributors,
  canDeleteContributor,
  deleteContributor,
}: ProjectUserTableProps) => (
  <table>
    <tbody>
      <ProjectUserTableRow name={owner?.name || ''} isOwner></ProjectUserTableRow>
      {contributors.map((contributor) => (
        <ProjectUserTableRow
          name={contributor.name}
          canDeleteContributor={canDeleteContributor}
          deleteContributor={deleteContributor}
        />
      ))}
    </tbody>
  </table>
);
