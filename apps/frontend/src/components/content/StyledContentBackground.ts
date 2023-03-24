import styled from 'styled-components';
import BackgroundShapes from '../../assets/shapes/content-background.svg';

export const ContentBackground = styled.div`
  background-image: url(${BackgroundShapes});
  height: auto;
  width: 50vw;
  background-repeat: no-repeat;
  background-position: left top;
  background-size: cover;
`;
