import React, { ReactNode } from 'react';
import styled from 'styled-components';

type FooterProps = {
  children: ReactNode;
};

const FooterContainer = styled.footer`
  grid-area: footer;
  padding: ${(props) => props.theme.layoutsBoxContainer};
  height: 10vh;
`;

const Footer = (FooterProps) => <FooterContainer>Je suis le footer</FooterContainer>;

export default Footer;
