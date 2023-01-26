import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Rocket, Info, Settings, Play } from 'kepler.gl/dist/components/common/icons';
import { Link } from 'react-router-dom';

interface NavbarInterface {
  children: ReactNode;
}

const NavContainer = styled.nav`
  grid-area: nav;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
  background-color: ${(props) => props.theme.navBackgroundColor};
`;

const NavContainerLogo = styled.div`
  padding: 20px;
  svg {
    padding: 20px;
    :nth-child(2) {
      border-left: 1px solid #cecece;
    }
  }
`;

const NavItemsList = styled.ul`
  display: flex;
  justify-content: space-around;
  list-style: none;
  padding: 20px;
  font-family: ${(props) => props.theme.fontFamily};
  li {
    :nth-child(1n + 2) {
      padding-left: 10px;
    }
    a {
      display: flex;
      align-items: center;
      text-decoration: none;
    }
  }
`;

const Navbar = ({ children }: NavbarInterface) => (
  <NavContainer>
    <NavContainerLogo>
      <Rocket style={{ height: 35, width: 35, paddingRight: '20px' }} />
      <svg xmlns="http://www.w3.org/2000/svg" width="173" height="40" fill="none">
        <path
          fill="#000"
          fillRule="evenodd"
          d="M76.748 7.408h4.466v5.595h1.868v3.867h-1.868v15.874h-4.466V16.87h-1.867v-3.867h1.867V7.408Zm30.863 15.466c0 3.04-2.417 5.406-5.278 5.406-2.86 0-5.277-2.365-5.277-5.406 0-3.04 2.417-5.405 5.277-5.405 2.861 0 5.278 2.365 5.278 5.405Zm0-8.298a9.609 9.609 0 0 0-5.278-1.573c-5.38 0-9.743 4.42-9.743 9.871 0 5.452 4.362 9.871 9.743 9.871a9.608 9.608 0 0 0 5.278-1.572v1.572h4.466V13.003h-4.466v1.572ZM85.688 7.407h4.466v25.336h-4.466V7.408ZM68.156 32.744h4.466V13.002h-4.466v1.573a9.607 9.607 0 0 0-5.279-1.573c-5.381 0-9.743 4.42-9.743 9.871 0 5.452 4.362 9.871 9.743 9.871a9.607 9.607 0 0 0 5.279-1.573v1.573Zm59.907-6.691c0-3.488-2.299-4.707-5.164-5.62a29.683 29.683 0 0 1-1.599-.542l-.075-.03c-.74-.293-1.458-.578-1.458-1.528 0-.948.766-1.625 1.699-1.625 1 0 1.566.643 1.766 1.625h4.331c-.133-3.284-2.799-5.756-6.03-5.756-3.232 0-6.197 2.404-6.197 5.824 0 2.776 1.666 4.503 4.131 5.383.165.06.375.13.612.208 1.103.365 2.793.924 3.286 1.62.2.306.267.644.267.983 0 1.15-.933 1.896-1.999 1.896-1.533 0-2.132-1.05-2.432-2.404h-4.531c.133 1.557.433 2.81 1.399 4.063 1.299 1.659 3.465 2.471 5.53 2.471 3.665 0 6.464-2.844 6.464-6.568Zm-91.12-3.079v-.202c-.053-2.992-2.449-5.304-5.277-5.304-2.86 0-5.278 2.365-5.278 5.405s2.417 5.405 5.278 5.405c2.828 0 5.223-2.313 5.276-5.304Zm-5.277-9.972c1.944 0 3.756.577 5.276 1.571v-1.571h4.466v9.736a10.148 10.148 0 0 1 0 .27v9.736h-4.466v-1.572a9.607 9.607 0 0 1-5.276 1.572c-5.381 0-9.744-4.42-9.744-9.871 0-5.452 4.363-9.871 9.744-9.871Zm18.512-5.594h-4.465v5.594h-1.867v3.866h1.867v15.876h4.465V16.868h1.869v-3.866h-1.869V7.408ZM57.6 22.873c0-3.04 2.417-5.405 5.277-5.405 2.86 0 5.278 2.365 5.278 5.405s-2.418 5.405-5.278 5.405c-2.86 0-5.278-2.365-5.278-5.405ZM9.742 28.278c2.86 0 5.278-2.365 5.278-5.405s-2.417-5.405-5.278-5.405c-2.86 0-5.277 2.365-5.277 5.405s2.417 5.405 5.277 5.405Zm5.279-13.703V7.408h4.466v25.336h-4.466V31.17a9.608 9.608 0 0 1-5.279 1.573c-5.38 0-9.743-4.42-9.743-9.871 0-5.452 4.362-9.871 9.743-9.871 1.946 0 3.758.577 5.279 1.572Z"
          clipRule="evenodd"
        />
        <path
          fill="#FFC93C"
          d="M164.26 3.786 173 .203v20.535l-8.74 3.836-9.34-3.836-9.75 3.836V3.786l9.75-3.583 9.34 3.583Z"
        />
        <path
          fill="#5AB6EB"
          d="m141.676 16.053-.346-8.215 18.924 8.207.58 8.317-6.693 5.715.239 9.1-19.158-8.309-.005-8.998 6.459-5.817Z"
        />
        <path
          fill="#07689F"
          fillRule="evenodd"
          d="m160.745 23.132-5.83-2.395-9.75 3.836V9.468l15.123 6.64.457 7.024Z"
          clipRule="evenodd"
        />
      </svg>
    </NavContainerLogo>
    <NavItemsList>
      <li>
        <Link to={'#'}>
          <Info style={{ height: 15, width: 15, paddingRight: '5px' }} />
          Aide
        </Link>
      </li>
      <li>
        <Link to={'#'}>
          <Settings style={{ height: 15, width: 15, paddingRight: '5px' }} />
          Réglage
        </Link>
      </li>
      <li>
        <Link to={'#'}>
          <Play style={{ height: 15, width: 15, paddingRight: '5px' }} />
          Mon Compte
        </Link>
      </li>
    </NavItemsList>
  </NavContainer>
);

export default Navbar;
