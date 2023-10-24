import React, { PropsWithChildren } from 'react';

export const ExternalLink = ({ href, children }: PropsWithChildren<{ href?: string }>) =>
  href ? (
    <a target="_blank" rel="noopener noreferrer" href={href}>
      {children}
    </a>
  ) : (
    <>{children}</>
  );
