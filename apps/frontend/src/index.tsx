import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import store from './store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoginPage, ProjectPage, ProjectsPage, ErrorPage } from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProjectsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/project',
    element: <ProjectPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
]);

// Start the mocking conditionally.
if (process.env.NODE_ENV === 'test') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { worker } = require('./test/mocks/browser');
  worker.start();
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
