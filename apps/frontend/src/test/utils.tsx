import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { initialState, reducer, RootState } from '../store/reducers';
import { BrowserRouter } from 'react-router-dom';
import { api } from '../api';
import { selectLocale } from '../store/selectors';
import { IntlProvider } from 'react-intl';

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
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<object>) {
    return (
      <Provider store={store}>
        <IntlProvider locale={selectLocale(store.getState())} messages={{}}>
          <BrowserRouter>{children}</BrowserRouter>
        </IntlProvider>
      </Provider>
    );
  }
  return { store, ...render(component, { wrapper: Wrapper, ...renderOptions }) };
