import React from 'react';
import Checkbox from 'kepler.gl/dist/components/common/checkbox';
import styled, { ThemeProvider } from 'styled-components';
import { Tooltip, Button, TextArea } from 'kepler.gl/dist/components/common/styled-components';
import { Add } from 'kepler.gl/dist/components/common/icons';
import { theme as basicTheme } from 'kepler.gl/dist/styles/base';

const Spaced = styled.article`
  padding: 15px;
`;

export const ProjectsPage = () => {
  return (
    <div>
      <ThemeProvider theme={basicTheme}>
        <h1>Projects</h1>
        <Spaced>
          <Checkbox id="test" label="label" checked disabled={false} />
        </Spaced>
        <Spaced>
          <Tooltip id={'id'} place="left" effect="solid">
            <span>Message</span>
          </Tooltip>
        </Spaced>
        <Spaced>
          <Button>
            <Add height="12px" />
            Button
          </Button>
        </Spaced>
        <Spaced>
          Textarea
          <TextArea />
        </Spaced>
      </ThemeProvider>
    </div>
  );
};
