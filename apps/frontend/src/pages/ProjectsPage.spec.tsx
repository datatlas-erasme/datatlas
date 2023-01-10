import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ProjectsPage } from './ProjectsPage';

describe('ProjectsPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <ProjectsPage />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
