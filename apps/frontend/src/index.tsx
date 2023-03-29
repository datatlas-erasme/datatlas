import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import ReactDOM from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react';
import reportWebVitals from './reportWebVitals';
import { store, persistor } from './store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoginPage, ProjectPage, ProjectsPage, ErrorPage } from './pages';
import { Loader } from './components/Loader';
import { IntlProvider } from 'react-intl';
import { AppLayout } from './pages/layouts';
import { selectLocale } from './store/selectors';
import { ComponentsPage } from './pages/ComponentsPage';
import { GlobalStyle } from './style/GlobalStyle';
import { theme } from './style/theme';
import LegalMentions from './pages/LegalMentionsPage';
import { messages } from './i18n';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <ProjectsPage />,
      },
      {
        path: 'projects/:id',
        element: <ProjectPage />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/legalmentions',
    element: <LegalMentions />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/components',
    element: <ComponentsPage />,
    errorElement: <ErrorPage />,
  },
]);

// Start the mocking conditionally.
if (
  process.env.NODE_ENV === 'test' ||
  process.env.NODE_ENV === 'development' ||
  process.env.NODE_ENV === 'production'
) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { worker } = require('./test/mocks/browser');
  worker.start();
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <PersistGate loading={<Loader />} persistor={persistor}>
        <IntlProvider locale={selectLocale(store.getState())} messages={messages}>
          <RouterProvider router={router} />
        </IntlProvider>
      </PersistGate>
    </ThemeProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
