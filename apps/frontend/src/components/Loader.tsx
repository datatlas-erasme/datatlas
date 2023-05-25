import React, { SVGProps } from 'react';
import styled from 'styled-components';

export const Loader = styled((props: SVGProps<SVGSVGElement> & { dark?: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-label="Loading..." {...props}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
))`
  @keyframes spin {
    100% {
      transform: rotate(1turn);
    }
  }

  color: rgb(${({ dark }) => (dark ? '0 0 0' : '255 255 255')} / 1);
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.75rem;
  margin-left: -0.25rem;

  animation: spin 1s linear infinite;

  circle {
    opacity: 0.25;
  }

  path {
    opacity: 0.75;
  }
`;
