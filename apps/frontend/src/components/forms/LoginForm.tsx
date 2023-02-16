import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../api';
import styled from 'styled-components';
import { Input } from 'kepler.gl/dist/components/common/styled-components';
import Checkbox from 'kepler.gl/dist/components/common/checkbox';
import { LabelStyle, FormBtn } from '../../style/theme';

export interface LoginFormData {
  login: string;
  password: string;
  rememberMe?: boolean;
}

const LoginFormStyle = styled.form`
  display: flex;
  flex-direction: column;
  a {
    font-size: ${(props) => props.theme.fontSizeXs};
  }
  div {
    display: flex;
    font-size: ${(props) => props.theme.fontSizeXs};
    align-items: center;
  }
`;

const InputLoginStyle = styled(Input)`
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
    <LoginFormStyle onSubmit={handleSubmit(login)}>
      <LabelStyle htmlFor="login">
        <FormattedMessage defaultMessage="Identifiant" />
      </LabelStyle>
      <InputLoginStyle id="login" defaultValue="" {...register('login', { required: true })} />
      {errors.login && <FormattedMessage defaultMessage="This field is required" />}
      <LabelStyle htmlFor="password">
        <FormattedMessage defaultMessage="Mot de passe" />
      </LabelStyle>
      <InputLoginStyle id="password" type="password" defaultValue="" {...register('password', { required: true })} />
      {errors.password && <FormattedMessage defaultMessage="This field is required" />}
      <a>
        <FormattedMessage defaultMessage="J’ai oublié mon mot de passe" />
      </a>

      <FormBtn type="submit" value={'Connexion'} />
      <div>
        <Checkbox id="rememberMe" type="checkbox" {...register('rememberMe', { required: false })} />
        <p>
          <FormattedMessage defaultMessage="Se souvenir de moi" />
        </p>
      </div>
    </LoginFormStyle>
  );
}
