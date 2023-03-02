import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../api';
import styled from 'styled-components';
import { Input } from 'kepler.gl/dist/components/common/styled-components';
import { StyledLabel, FormBtn } from '../../style/components';

export interface LoginFormData {
  login: string;
  password: string;
  rememberMe?: boolean;
}

const StyledLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  div {
    display: flex;
    font-size: ${(props) => props.theme.fontSizeXs};
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
    <StyledLoginForm onSubmit={handleSubmit(login)}>
      <StyledLabel htmlFor="login">
        <FormattedMessage defaultMessage="Identifiant" />
      </StyledLabel>
      <StyledLoginInput id="login" defaultValue="" {...register('login', { required: true })} />
      {errors.login && <FormattedMessage defaultMessage="This field is required" />}
      <StyledLabel htmlFor="password">
        <FormattedMessage defaultMessage="Mot de passe" />
      </StyledLabel>
      <StyledLoginInput id="password" type="password" defaultValue="" {...register('password', { required: true })} />
      {errors.password && <FormattedMessage defaultMessage="This field is required" />}
      <StyledLink to={'/'}>
        <FormattedMessage defaultMessage="J’ai oublié mon mot de passe" />
      </StyledLink>

      <FormBtn type="submit" value={'Connexion'} />
      <div>
        <input id="rememberMe" type={'checkbox'} {...register('rememberMe', { required: false })} />
        <p>
          <FormattedMessage defaultMessage="Se souvenir de moi" />
        </p>
      </div>
    </StyledLoginForm>
  );
}
