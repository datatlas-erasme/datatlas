import React from 'react';
import { Layout } from './layouts';
import { LoginForm } from '../components/forms/LoginForm';

export const LoginPage = () => {
  return (
    <Layout>
      <h1>Login</h1>
      <LoginForm />
    </Layout>
  );
};
