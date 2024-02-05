import React, { FunctionComponent, useState } from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import { Icons } from 'kepler.gl/dist/components';
import { IconRoundSmall, MapControlButton } from 'kepler.gl/dist/components/common/styled-components';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useProject } from '../../../../hooks';
import { markdownComponents } from '../../../markdown';

const StyledFloatingPanel = styled.div``;

const StyledProjectPanel = styled.div`
  background: ${(props) => props.theme.panelBackground};
  border-radius: 7px;
  padding: 16px 20px;
  width: 280px;

  .project-title {
    color: ${(props) => props.theme.titleTextColor};
    font-size: 13px;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
  }

  .project-description {
    color: ${(props) => props.theme.textColor};
    font-size: 11px;
    margin-top: 12px;

    a {
      font-weight: 500;
      color: ${(props) => props.theme.titleTextColor};
    }
  }

  .project-links {
    margin-top: 20px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;
const StyledPanelAction = styled.div`
  border-radius: 2px;
  margin-left: 4px;
  padding: 5px;
  font-weight: 500;

  a {
    align-items: center;
    justify-content: flex-start;
    display: flex;
    height: 16px;
    padding-right: 10px;
    color: ${(props) => props.theme.subtextColor};

    svg {
      margin-right: 8px;
    }
  }

  :hover,
  :active {
    cursor: pointer;
    a {
      color: ${(props) => props.theme.textColorHl};
    }
  }
`;

interface LinkButtonProps {
  height: string;
  iconComponent: FunctionComponent<{ height: string }>;
  label: string;
  href: string;
}
export const LinkButton = (props: LinkButtonProps) => (
  <StyledPanelAction className="project-link__action">
    <a target="_blank" rel="noopener noreferrer" href={props.href}>
      <props.iconComponent height={props.height || '16px'} />
      <p>{props.label}</p>
    </a>
  </StyledPanelAction>
);

const CloseButton = ({ onClick }) => (
  <IconRoundSmall>
    <Icons.Close height="16px" onClick={onClick} />
  </IconRoundSmall>
);

export function SampleMapPanel() {
  const [isActive, setActive] = useState(false);
  const project = useProject();

  return (
    <StyledFloatingPanel>
      {isActive ? (
        <StyledProjectPanel>
          <div className="project-title">
            <div>{project?.title}</div>
            <CloseButton onClick={() => setActive(false)} />
          </div>
          <div className="project-description">
            {project?.description && (
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {project?.description}
              </ReactMarkdown>
            )}
          </div>
        </StyledProjectPanel>
      ) : (
        <MapControlButton
          className={classnames('map-control-button', 'info-panel', { isActive })}
          onClick={(e) => {
            e.preventDefault();
            setActive(true);
          }}
        >
          <Icons.Docs height="18px" />
        </MapControlButton>
      )}
    </StyledFloatingPanel>
  );
}
