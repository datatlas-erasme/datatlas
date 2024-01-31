/* eslint-disable react-hooks/rules-of-hooks, react-hooks/exhaustive-deps */
// @see kepler.gl/src/components/common/file-uploader/file-upload
import React, { createRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { FormattedMessage, useIntl } from 'react-intl';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UploadButton from 'kepler.gl/dist/components/common/file-uploader/upload-button';
import { DragNDrop, FileType } from 'kepler.gl/dist/components/common/icons';
import FileUploadProgress from 'kepler.gl/dist/components/common/file-uploader/file-upload-progress';
import FileDrop from 'kepler.gl/dist/components/common/file-uploader/file-drop';
import { isChrome } from 'kepler.gl/dist/utils/utils';
import { GUIDES_FILE_FORMAT_DOC } from 'kepler.gl/dist/constants/user-guides';
import { media } from 'kepler.gl/dist/styles/media-breakpoints';
import { visStateActions } from 'kepler.gl/actions';
import { FileUploadFactory as KeplerFileUploadFactory } from 'kepler.gl/dist/components';
import { DatatlasTheme } from '../../../../../style/theme';
import { markdownComponents } from '../../../../markdown';
import { selectFileFormatNamesByInstanceId } from '../../../../../store/selectors';
import { RootState } from '../../../../../store/reducers';

const fileIconColor = '#D3D8E0';

const StyledUploadMessage = styled.div`
  color: ${(props) => props.theme.textColorLT};
  font-size: 14px;
  margin-bottom: 12px;

  ${media.portable`
    font-size: 12px;
  `};
`;

export const WarningMsg = styled.span`
  margin-top: 10px;
  color: ${(props) => props.theme.errorColor};
  font-weight: 500;
`;

const StyledFileDrop = styled.div<Pick<FileUploadState, 'dragOver'>>`
  background-color: white;
  border-radius: 4px;
  border-style: ${(props) => (props.dragOver ? 'solid' : 'dashed')};
  border-width: 1px;
  border-color: ${(props) => (props.dragOver ? props.theme.textColorLT : props.theme.subtextColorLT)};
  text-align: center;
  width: 100%;
  padding: 48px 8px 0;
  height: 360px;

  .file-upload-or {
    color: ${(props) => props.theme.linkBtnColor};
    padding-right: 4px;
  }

  .file-type-row {
    opacity: 0.5;
  }
  ${media.portable`
    padding: 16px 4px 0;
  `};
`;

const MsgWrapper = styled.div`
  color: ${(props) => props.theme.modalTitleColor};
  font-size: 20px;
  height: 36px;
`;

const StyledDragNDropIcon = styled.div`
  color: ${fileIconColor};
  margin-bottom: 48px;

  ${media.portable`
    margin-bottom: 16px;
  `};
  ${media.palm`
    margin-bottom: 8px;
  `};
`;

const StyledFileTypeFow = styled.div`
  margin-bottom: 24px;
  ${media.portable`
    margin-bottom: 16px;
  `};
  ${media.palm`
    margin-bottom: 8px;
  `};
`;

const StyledFileUpload = styled.div`
  .file-drop {
    position: relative;
  }
`;

const StyledMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;

  .loading-action {
    margin-right: 10px;
  }
  .loading-spinner {
    margin-left: 10px;
  }
`;

const StyledDragFileWrapper = styled.div`
  margin-bottom: 32px;
  ${media.portable`
    margin-bottom: 24px;
  `};
  ${media.portable`
    margin-bottom: 16px;
  `};
`;

const StyledDisclaimer = styled(StyledMessage)`
  margin: 0 auto;
`;

interface FileUploadState {
  dragOver: boolean;
  fileLoading: boolean;
  files: File[];
  errorFiles: string[];
}

interface FileUploadProps {
  fileLoading: boolean;
  fileLoadingProgress: number;
  fileExtensions?: string[];
  disableExtensionFilter?: boolean;
  fileFormatNames: string[];
  onFileUpload: visStateActions['loadFiles'];
  theme: DatatlasTheme;
}

function FileUploadFactory() {
  return ({
    fileLoading,
    fileLoadingProgress,
    fileExtensions = [],
    disableExtensionFilter = false,
    onFileUpload,
    theme,
  }: FileUploadProps) => {
    const intl = useIntl();
    const [state, setState] = useState<FileUploadState>({
      dragOver: false,
      fileLoading: false,
      files: [],
      errorFiles: [],
    });

    // @todo We should overwrite the ModalFactory and inject `fileFormatNames` there instead.
    const { id } = useParams();
    const fileFormatNames = useSelector((state: RootState) => selectFileFormatNamesByInstanceId(state, id));

    const frame = createRef<HTMLDivElement>();

    const _isValidFileType = (filename) => {
      const fileExt = fileExtensions.find((ext) => filename.endsWith(ext));

      return Boolean(fileExt);
    };

    const _handleFileInput = (fileList: FileList, event) => {
      if (event) {
        event.stopPropagation();
      }

      // @ts-ignore target is es2015 so it's allowed
      const files: File[] = [...fileList].filter(Boolean);

      // TODO - move this code out of the component
      const filesToLoad: File[] = [];
      const errorFiles: string[] = [];
      for (const file of files) {
        if (disableExtensionFilter || _isValidFileType(file.name)) {
          filesToLoad.push(file);
        } else {
          errorFiles.push(file.name);
        }
      }

      setState({ ...state, files: filesToLoad, errorFiles, dragOver: false });
    };

    useEffect(() => {
      if (state.fileLoading && !fileLoading && state.files.length) {
        setState({ ...state, files: [], fileLoading: fileLoading });
      }
      setState({ ...state, fileLoading: fileLoading });
    }, [state.files.length, fileLoading]);

    useEffect(() => {
      if (state.files.length > 0) {
        onFileUpload(state.files);
      }
    }, [state.files.length]);

    const _toggleDragState = (dragOver: boolean) => {
      setState({ ...state, dragOver });
    };

    const { dragOver, files, errorFiles } = state;
    return (
      <StyledFileUpload className="file-uploader" ref={frame}>
        {FileDrop ? (
          <FileDrop
            frame={frame.current || document}
            onDragOver={() => _toggleDragState(true)}
            onDragLeave={() => _toggleDragState(false)}
            onDrop={_handleFileInput}
            className="file-uploader__file-drop"
          >
            <StyledUploadMessage className="file-upload__message">
              <ReactMarkdown
                components={markdownComponents}
                children={intl.formatMessage(
                  {
                    id: 'fileUploader.configUploadMessage',
                  },
                  {
                    fileFormatNames: fileFormatNames.map((format) => `**${format}**`).join(', '),
                    fileFormatDocLink: GUIDES_FILE_FORMAT_DOC,
                    contactEmail: process.env.REACT_APP_CONTACT_EMAIL,
                  }
                )}
              />
            </StyledUploadMessage>
            <StyledFileDrop dragOver={dragOver}>
              <StyledFileTypeFow className="file-type-row">
                {fileExtensions.map((ext) => (
                  <FileType key={ext} ext={ext} height="50px" fontSize="9px" />
                ))}
              </StyledFileTypeFow>
              {fileLoading ? (
                <FileUploadProgress fileLoadingProgress={fileLoadingProgress} theme={theme} />
              ) : (
                <>
                  <div style={{ opacity: dragOver ? 0.5 : 1 }} className="file-upload-display-message">
                    <StyledDragNDropIcon>
                      <DragNDrop height="44px" />
                    </StyledDragNDropIcon>

                    {errorFiles.length ? (
                      <WarningMsg>
                        <FormattedMessage
                          id={'fileUploader.fileNotSupported'}
                          values={{ errorFiles: errorFiles.join(', ') }}
                        />
                      </WarningMsg>
                    ) : null}
                  </div>
                  {!files.length ? (
                    <StyledDragFileWrapper>
                      <MsgWrapper>
                        <FormattedMessage id={'fileUploader.message'} />
                      </MsgWrapper>
                      <span className="file-upload-or">
                        <FormattedMessage id={'fileUploader.or'} />
                      </span>
                      <UploadButton onUpload={_handleFileInput}>
                        <FormattedMessage id={'fileUploader.browseFiles'} />
                      </UploadButton>
                    </StyledDragFileWrapper>
                  ) : null}

                  <StyledDisclaimer>
                    <FormattedMessage id={'fileUploader.disclaimer'} />
                  </StyledDisclaimer>
                </>
              )}
            </StyledFileDrop>
          </FileDrop>
        ) : null}

        <WarningMsg>{isChrome() ? <FormattedMessage id={'fileUploader.chromeMessage'} /> : ''}</WarningMsg>
      </StyledFileUpload>
    );
  };
}

export function replaceFileUpload() {
  return [KeplerFileUploadFactory, FileUploadFactory];
}
