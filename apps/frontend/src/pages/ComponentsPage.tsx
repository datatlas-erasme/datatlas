import React from 'react';
import Checkbox from 'kepler.gl/dist/components/common/checkbox';
import styled, { ThemeProvider } from 'styled-components';
import {
  ButtonGroup,
  Button,
  SelectionButton,
  MapControlButton,
  CheckMark,
  Tooltip,
  TextArea,
  TextAreaLight,
  TruncatedTitleText,
  BottomWidgetInner,
  Input,
  IconRoundSmall,
  PanelContent,
  SidePanelDivider,
  InputLight,
  InlineInput,
  StyledFilterContent,
  StyledFilteredOption,
  SelectText,
  PanelHeaderTitle,
} from 'kepler.gl/dist/components/common/styled-components';
import { Trash, Copy, Add } from 'kepler.gl/dist/components/common/icons';
import KeplerGlLogo from 'kepler.gl/dist/components/common/logo';
import Toolbar from 'kepler.gl/dist/components/common/toolbar';
import LoadingSpinner from 'kepler.gl/dist/components/common/loading-spinner';
import ImagePreview from 'kepler.gl/dist/components/common/image-preview';
import ProgressBar from 'kepler.gl/dist/components/common/progress-bar';
import ModalDialog from 'kepler.gl/dist/components/common/modal';
import { datatlasTheme } from '../style/customTheme';

const Container = styled.div`
  display: grid;
  height: 100vh;
  margin: auto 20px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: repeat(4, auto);
  grid-gap: 5px;
  background-color: #f4f4f4;
`;

const Spaced = styled.article`
  display: block;
  padding: 15px;
  height: min-content;
`;

export const ComponentsPage = () => {
  return (
    <div>
      <ThemeProvider theme={datatlasTheme}>
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
            <StyledFilteredOption>
              <SelectionButton>J'te select</SelectionButton>
            </StyledFilteredOption>

            <MapControlButton>
              <Copy height="18px" />
            </MapControlButton>

            <SelectText>SQUARE</SelectText>
            <h4>group</h4>
            <ButtonGroup>
              <Button>
                <CheckMark />
                Click me !
              </Button>
              <Button>
                <Add height="12px" />
                Click me !
              </Button>
              <SelectionButton>J'te select</SelectionButton>
              <SelectionButton>J'te select non toi</SelectionButton>
              <SelectionButton>J'te select ou toi</SelectionButton>
              <MapControlButton>
                <Trash height="18px" />
              </MapControlButton>
            </ButtonGroup>
          </Spaced>
          <Spaced>
            <h3>Textarea</h3>
            <h4>dark</h4>
            <TextArea />
            <h4>light</h4>
            <TextAreaLight />
          </Spaced>
          <Spaced>
            <h3>Input</h3>
            <h4>dark</h4>
            <Input />
            <h4>light</h4>
            <InputLight />
            <h4>focus</h4>
            <InlineInput />
          </Spaced>
          <Spaced>
            <h3>IconRoundSmall</h3>
            <IconRoundSmall>S</IconRoundSmall>
          </Spaced>
          <Spaced>
            <h3>Loading Spiner</h3>
            <LoadingSpinner />
          </Spaced>
          <Spaced>
            <h3>Logo</h3>
            <KeplerGlLogo />
          </Spaced>
          <Spaced>
            <h3>Image preview</h3>
            <ImagePreview imageDataUri={'https://unsplash.com/fr/photos/6MsMKWzJWKc'} />
          </Spaced>
          <Spaced>
            <h3>Progress bar</h3>
            <ProgressBar />
          </Spaced>
          <Spaced>
            <h3>Modal</h3>
            <ModalDialog>Je suis la modal la plus sympa que tu connaitras</ModalDialog>
          </Spaced>
          <Spaced>
            <h3>Title</h3>
            <PanelHeaderTitle>PANEL Header Title</PanelHeaderTitle>
            <TruncatedTitleText>
              Je suis un titre tronqué tronqué tronqué tronqué tronqué tronqué tronqué tronqué tronqué tronqué tronqué
            </TruncatedTitleText>
          </Spaced>
          <Spaced>
            <h3>Content</h3>
            <StyledFilterContent>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sem sapien, vestibulum sit amet
              lobortis eu, sagittis eget sem. Fusce sodales, ante non bibendum porta.
            </StyledFilterContent>
            <SidePanelDivider />
            <PanelContent>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in eleifend dolor, efficitur lobortis
              quam. Fusce sollicitudin ullamcorper lacinia. Curabitur.
            </PanelContent>
          </Spaced>
        </Container>
      </ThemeProvider>
    </div>
  );
};
