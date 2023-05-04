/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { initialState, reducer, RootState } from '../store/reducers';
import { api } from '../store/api';
import { DatatlasIntlProvider } from '../components/i18n/DatatlasIntlProvider';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: EnhancedStore<RootState>;
}

export function renderWithProviders(
  component: React.ReactElement,
  {
    preloadedState = initialState,
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer,
      preloadedState,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware),
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<object>) {
    return (
      <Provider store={store}>
        <DatatlasIntlProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </DatatlasIntlProvider>
      </Provider>
    );
  }
  return { store, ...render(component, { wrapper: Wrapper, ...renderOptions }) };
}
