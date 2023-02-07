import React from 'react';
import { waitForElementToBeRemoved } from '@testing-library/react';
import { ProjectsPage } from './ProjectsPage';
import { renderWithProviders } from '../test/utils';

describe('ProjectsPage', () => {
  it('should render successfully', async () => {
    const { baseElement } = renderWithProviders(<ProjectsPage />);
    await waitForElementToBeRemoved(document.querySelector('.loader'));
    expect(baseElement).toBeTruthy();
  });
});
