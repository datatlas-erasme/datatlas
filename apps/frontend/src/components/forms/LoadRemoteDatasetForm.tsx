import React from 'react';
import { FormattedMessage, WrappedComponentProps } from 'react-intl';
import { useForm } from 'react-hook-form';
import styled, { ThemeProps } from 'styled-components';
import { LoadDataModalProps } from 'kepler.gl/src/components/modals/load-data-modal';
import { addDataToMap } from 'kepler.gl/actions';
import { DatasetFactory, DatasetInterface } from '@datatlas/models';
import { DatatlasTheme } from '../../style/theme';
import { isValidHttpURL } from '../../utils/url';
import { useForward } from '../../hooks/useForward';

export const CORS_LINK = 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS';

const InputForm = styled.form`
  flex-grow: 1;
  padding: 32px;
  background-color: ${(props) => props.theme.panelBackgroundLT};
`;

const StyledDescription = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.labelColorLT};
  line-height: 18px;
  margin-bottom: 12px;
`;

interface StyledInputProps extends ThemeProps<DatatlasTheme> {
  error?: Error;
}
const StyledInput = styled.input`
  width: 100%;
  padding: ${(props) => props.theme.inputPadding};
  color: ${(props: StyledInputProps) => (props.error ? 'red' : props.theme.titleColorLT)};
  height: ${(props) => props.theme.inputBoxHeight};
  border: 0;
  outline: 0;
  font-size: ${(props) => props.theme.inputFontSize};

  :active,
  :focus,
  &.focus,
  &.active {
    outline: 0;
  }
`;

const StyledFromGroup = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
`;

export const StyledInputLabel = styled.div`
  font-size: 11px;
  color: ${(props) => props.theme.textColorLT};
  letter-spacing: 0.2px;
  ul {
    padding-left: 12px;
  }
`;

export const StyledError = styled.div`
  color: red;
`;

export const StyledErrorDescription = styled.div`
  font-size: 14px;
`;

const ErrorBox = ({ error, url }) => (
  <StyledError>
    <StyledErrorDescription>{url}</StyledErrorDescription>
    <StyledErrorDescription>{error.message}</StyledErrorDescription>
  </StyledError>
);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
type LoadRemoteDatasetFormProps = LoadDataModalProps & WrappedComponentProps;

export interface LoadRemoteDatasetFormData {
  url: DatasetInterface['url'];
}

export function LoadRemoteDatasetForm({ intl, ...props }: LoadRemoteDatasetFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    getValues,
  } = useForm<LoadRemoteDatasetFormData & { root?: { serverError?: Error } }>({
    criteriaMode: 'all',
  });
  const forward = useForward();

  const onSubmit = async () => {
    try {
      forward(
        addDataToMap({
          datasets: await DatasetFactory.createFromURL(new URL(getValues().url)),
          options: { autoCreateLayers: true },
        })
      );
    } catch (e) {
      if (typeof e === 'string') {
        setError('root.serverError', { message: e.toUpperCase() });
      } else if (e instanceof Error) {
        setError('root.serverError', e);
      } else {
        console.error('Something went wrong :', e);
      }
    }
  };

  return (
    <InputForm onSubmit={handleSubmit(onSubmit)}>
      <StyledDescription>
        <FormattedMessage id={'loadRemoteData.description'} />
      </StyledDescription>
      <StyledInputLabel>
        <FormattedMessage id={'loadRemoteData.message'} />
      </StyledInputLabel>
      <StyledInputLabel>
        <FormattedMessage id={'loadRemoteData.examples'} />
        <ul>
          <li>https://your.map.url/map.json</li>
          <li>http://your.map.url/data.csv</li>
        </ul>
      </StyledInputLabel>
      <StyledInputLabel>
        <FormattedMessage id={'loadRemoteData.cors'} />{' '}
        <FormattedMessage id={'loadRemoteData.clickHere'} values={{ corsLink: CORS_LINK }} />
      </StyledInputLabel>
      <StyledFromGroup>
        <StyledInput
          id="url"
          placeholder="Url"
          defaultValue=""
          {...register('url', { required: true, validate: isValidHttpURL })}
        />
        {errors.url && (
          <StyledError>
            <StyledErrorDescription>
              <FormattedMessage id={'loadRemoteData.incorrectURL'} defaultMessage="Incorrect URL" />
            </StyledErrorDescription>
          </StyledError>
        )}
        <input type="submit" value={intl.formatMessage({ defaultMessage: 'loadRemoteData.fetch' })} />
      </StyledFromGroup>
      {errors?.root?.serverError && <ErrorBox error={errors?.root?.serverError} url={getValues('url')} />}
    </InputForm>
  );
}
