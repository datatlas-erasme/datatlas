import React, { Component, ReactNode } from 'react';
import { Button } from 'kepler.gl/dist/components/common/styled-components';

interface IconButtonProps {
  children: ReactNode;
  Icon: typeof Component;
}
const IconButton = ({ children, Icon }: IconButtonProps) => {
  {
    <Button>
      <Icon />
      {children}
    </Button>;
  }
};

export default IconButton;
