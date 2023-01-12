import React from 'react';
import Checkbox from 'kepler.gl/dist/components/common/checkbox';
import styled, { ThemeProvider } from 'styled-components';
import { Tooltip, Button, TextArea, TextAreaLight, BottomWidgetInner, Input, IconRoundSmall, PanelContent, SidePanelDivider, InputLight, InlineInput, ButtonGroup } from 'kepler.gl/dist/components/common/styled-components';
import KeplerGlLogo from 'kepler.gl/dist/components/common/logo'
import Toolbar from 'kepler.gl/dist/components/common/toolbar'
import LoadingSpinner from 'kepler.gl/dist/components/common/loading-spinner';
import ImagePreview from 'kepler.gl/dist/components/common/image-preview';
import ProgressBar from 'kepler.gl/dist/components/common/progress-bar';
import ModalDialog from 'kepler.gl/dist/components/common/modal';
import FieldSelector from 'kepler.gl/dist/components/common/field-selector';
import { Add } from 'kepler.gl/dist/components/common/icons';
import { theme as basicTheme } from 'kepler.gl/dist/styles/base';

const Container = styled.div`
  display: grid;
  height: 100vh;
  margin: auto 20px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: repeat(4, auto);
  grid-gap: 5px;
`;

const Spaced = styled.article`
  display: block;
  padding: 15px;
  height: min-content;
`;

export const ComponentsPage = () => {
  return (
    <div>
      <ThemeProvider theme={basicTheme}>
        <h1>Components System</h1>

        <Container>
          <Spaced>
            <h3>Checkbox</h3>
            <Checkbox id="test" label="label" checked disabled={false} />
          </Spaced>
          <Spaced>
            <h3>Tooltip</h3>
            <Tooltip id={'id'} place="left" effect="solid">
              <span>Message</span>
            </Tooltip>
          </Spaced>
          <Spaced>
            <h3>Je ne sais pas ce que je suis</h3>
            <BottomWidgetInner id={'id'} place="left" effect="solid">
              <span>Button Widget Inner</span>
            </BottomWidgetInner>
          </Spaced>
          <Spaced>
            <h3>Button</h3>
            <h4>single</h4>
            <Button>
              <Add height="12px" />
              Click me !
            </Button>
            <h4>group</h4>
            <ButtonGroup>
              <Button>
                <Add height="12px" />
                Click me !
              </Button>
              <Button>
                <Add height="12px" />
                Click me !
              </Button>
            </ButtonGroup>
          </Spaced>
          <Spaced>
            <h3>Textarea</h3>
            <h4>dark</h4>
            <TextArea />
            <h4>light</h4>
            <TextAreaLight/>
          </Spaced>
          <Spaced>
            <h3>Input</h3>
            <h4>dark</h4>
            <Input />
            <h4>light</h4>
            <InputLight/>
            <h4>focus</h4>
            <InlineInput/>
          </Spaced>
          <Spaced>
            <h3>IconRoundSmall</h3>
            <IconRoundSmall>S</IconRoundSmall>
          </Spaced>
          <Spaced>
            <h3>PanelContent</h3>
            <PanelContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in eleifend dolor, efficitur lobortis quam. Fusce sollicitudin ullamcorper lacinia. Curabitur.
            </PanelContent>
            <SidePanelDivider/>
          </Spaced>
          <Spaced>
            <h3>Loading Spiner</h3>
            <LoadingSpinner/>
          </Spaced>
          <Spaced>
            <h3>Logo</h3>
            <KeplerGlLogo/>
          </Spaced>
          <Spaced>
            <h3>Image preview</h3>
            <ImagePreview imageDataUri={"https://unsplash.com/fr/photos/6MsMKWzJWKc"}/>
          </Spaced>
          <Spaced>
            <h3>Progress bar</h3>
            <ProgressBar/>
          </Spaced>
          <Spaced>
            <h3>Modal</h3>
            <ModalDialog>Je suis la modal la plus sympa que tu connaitras</ModalDialog>
          </Spaced>
        </Container>
      </ThemeProvider>
    </div>
  );
};
