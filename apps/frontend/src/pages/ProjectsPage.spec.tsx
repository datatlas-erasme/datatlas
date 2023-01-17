import React from 'react';
import { ProjectsPage } from './ProjectsPage';
import { renderWithProviders } from '../test/utils';

describe('ProjectsPage', () => {
  it('should render successfully', () => {
    const { baseElement } = renderWithProviders(<ProjectsPage />);
    expect(baseElement).toBeTruthy();
  });
});
