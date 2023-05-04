import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Input } from 'kepler.gl/dist/components/common/styled-components';
import { useLoginMutation } from '../../store/api';
import { StyledLabel } from './StyledLabel';
import { StyledFormBtn } from '../buttons';
import { isApiError } from '../../utils/rtk';
import { LoginFormData } from '../../models';

const StyledLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  div {
    display: flex;
    font-size: ${({ theme }) => theme.fontSizeXs};
    align-items: center;
  }
  p {
    margin-left: 5px;
  }
`;

const StyledLink = styled(Link)`
  font-size: ${({ theme }) => theme.textLink};
  text-decoration: underline;
`;

const StyledLoginInput = styled(Input)`
  width: 20vw;
`;

export function LoginForm() {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<LoginFormData>();
  const [login, { isLoading, isSuccess, error, isError }] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const intl = useIntl();

  const from = location.state?.from.pathname || '/';

  useEffect(() => {
    if (isSuccess) {
      console.info('Login successful!');
      navigate(from);
    }
    if (isError) {
      console.error('formError', error);
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
    <StyledLoginForm onSubmit={handleSubmit(login)}>
      <StyledLabel htmlFor="login">
        <FormattedMessage id={'loginForm.login'} defaultMessage="Identifiant" />
      </StyledLabel>
      <StyledLoginInput id="login" defaultValue="" {...register('email', { required: true })} />
      {errors.email && (
        <FormattedMessage id={'loginForm.errors.email.required'} defaultMessage="This field is required" />
      )}
      <StyledLabel htmlFor="password">
        <FormattedMessage id={'loginForm.password'} defaultMessage="Mot de passe" />
      </StyledLabel>
      <StyledLoginInput id="password" type="password" defaultValue="" {...register('password', { required: true })} />
      {errors.password && (
        <FormattedMessage id={'loginForm.errors.password.required'} defaultMessage="This field is required" />
      )}
      <StyledLink to={'/'}>
        <FormattedMessage id={'loginForm.forgotPassword'} defaultMessage="J’ai oublié mon mot de passe" />
      </StyledLink>

      {isError && isApiError(error) && (
        <p>
          {error.data.statusCode} {error.data.message}
        </p>
      )}

      <StyledFormBtn
        type="submit"
        value={intl.formatMessage({ id: 'loginForm.submit', defaultMessage: 'Connexion' })}
      />
      <div>
        <input id="rememberMe" type={'checkbox'} {...register('rememberMe', { required: false })} />
        <p>
          <FormattedMessage id={'loginForm.rememberMe'} defaultMessage="Se souvenir de moi" />
        </p>
      </div>
    </StyledLoginForm>
  );
}
