import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../api';

export interface LoginFormData {
  login: string;
  password: string;
  rememberMe?: boolean;
}

export function LoginForm() {
  const intl = useIntl();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<LoginFormData>();
  const [login, { isLoading, isSuccess, error, isError }] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from.pathname || '/';

  useEffect(() => {
    if (isSuccess) {
      console.info('Login successful!');
      navigate(from);
    }
    if (isError) {
      console.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  return (
    <form onSubmit={handleSubmit(login)}>
      <label htmlFor="login">
        <FormattedMessage defaultMessage="Login" />
      </label>
      <input id="login" defaultValue="" {...register('login', { required: true })} />
      {errors.login && <FormattedMessage defaultMessage="This field is required" />}

      <label htmlFor="password">
        <FormattedMessage defaultMessage="Password" />
      </label>
      <input id="password" type="password" defaultValue="" {...register('password', { required: true })} />
      {errors.password && <FormattedMessage defaultMessage="This field is required" />}

      <label htmlFor="rememberMe">
        <FormattedMessage defaultMessage="Remember me" />
      </label>
      <input id="rememberMe" type="checkbox" {...register('rememberMe', { required: false })} />

      <input type="submit" value={intl.formatMessage({ defaultMessage: 'Connexion' })} />
    </form>
  );
}
