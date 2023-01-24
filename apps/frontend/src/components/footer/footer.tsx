import React, { ReactNode } from 'react';

type FooterProps = {
  children: ReactNode;
};
const Footer = (FooterProps) => <footer style={{ gridArea: 'footer' }}>Je suis le footer</footer>;

export default Footer;
