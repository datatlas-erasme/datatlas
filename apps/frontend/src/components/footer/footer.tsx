import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface FooterInterface {
  children: ReactNode;
}

const FooterContainer = styled.footer`
  grid-area: footer;
  padding: ${(props) => props.theme.layoutsBoxContainer};
  height: 10vh;
`;

const Footer = ({ children }: FooterInterface) => <FooterContainer>Je suis le footer</FooterContainer>;

export default Footer;
