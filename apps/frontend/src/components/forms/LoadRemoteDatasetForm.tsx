import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
import styled, { ThemeProps } from 'styled-components';
import { addDataToMap } from 'kepler.gl/actions';
import { DatasetFactory, DatasetInterface } from '@datatlas/models';
import { DatatlasTheme } from '../../style/theme';
import { isValidHttpURL } from '../../utils/url';
import { useForward } from '../../hooks/useForward';
import { markdownComponents } from '../markdown';
import { GUIDES_FILE_FORMAT_DOC } from 'kepler.gl/dist/constants/user-guides';
import { RootState } from '../../store/reducers';
import { selectFileFormatNamesByInstanceId } from '../../store/selectors';

const InputForm = styled.form`
  flex-grow: 1;
  padding: 32px;
  background-color: ${({ theme }) => theme.panelBackgroundLT};
`;
const StyledDescription = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.labelColorLT};
  line-height: 18px;
  margin-bottom: 12px;
`;
interface StyledInputProps extends ThemeProps<DatatlasTheme> {
  error?: Error;
}
const StyledInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.inputPadding};
  color: ${(props: StyledInputProps) => (props.error ? 'red' : props.theme.titleColorLT)};
  height: ${({ theme }) => theme.inputBoxHeight};
  border: 0;
  outline: 0;
  font-size: ${({ theme }) => theme.inputFontSize};

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
  color: ${({ theme }) => theme.textColorLT};
  letter-spacing: 0.2px;
  ul {
    padding-left: 12px;
  }
`;
export const StyledError = styled.div`
  color: ${({ theme }) => theme.bottomWidgetBgd};
`;
export const StyledErrorDescription = styled.div`
  font-size: ${({ theme }) => theme.fontSizeMedium};
`;

const ErrorBox = ({ error, url }) => (
  <StyledError>
    <StyledErrorDescription>{url}</StyledErrorDescription>
    <StyledErrorDescription>{error.message}</StyledErrorDescription>
  </StyledError>
);

export interface LoadRemoteDatasetFormData {
  url: DatasetInterface['url'];
}

export function LoadRemoteDatasetForm() {
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
  const intl = useIntl();

  // @todo We should overwrite the ModalFactory and inject `fileFormatNames` there instead.
  const { id } = useParams();
  const fileFormatNames = useSelector((state: RootState) => selectFileFormatNamesByInstanceId(state, id));

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
        <ReactMarkdown
          components={markdownComponents}
          children={intl.formatMessage(
            {
              id: 'loadRemoteData.description',
            },
            {
              fileFormatNames: fileFormatNames.map((format) => `**${format}**`).join(', '),
              fileFormatDocLink: GUIDES_FILE_FORMAT_DOC,
              contactEmail: process.env.REACT_APP_CONTACT_EMAIL,
            }
          )}
          linkTarget="_blank"
        />
      </StyledDescription>
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
        <input type="submit" value={intl.formatMessage({ id: 'loadRemoteData.submit', defaultMessage: 'Charger' })} />
      </StyledFromGroup>
      {errors?.root?.serverError && <ErrorBox error={errors?.root?.serverError} url={getValues('url')} />}
    </InputForm>
  );
}
