import React from 'react';
import { LoginPage } from './LoginPage';
import { renderWithProviders } from '../../test/utils';

describe('ProjectsPage', () => {
  it('should render successfully', async () => {
    const { baseElement } = renderWithProviders(<LoginPage />);
    expect(baseElement).toBeTruthy();
  });
});
