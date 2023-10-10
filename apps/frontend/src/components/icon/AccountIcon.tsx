import React, { SVGProps } from 'react';

interface AccountIconProps extends SVGProps<SVGSVGElement> {
  username?: string;
}

export const AccountIcon = ({ username }: AccountIconProps) => (
  <svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {username && (
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="black">
        {username[0].toUpperCase()}
      </text>
    )}
  </svg>
);
