import { css } from 'styled-components';

export const MapMenuScrollBar = css`
  ::-webkit-scrollbar {
    width: 12px;
    height: 14px;
    background: transparent;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-track:horizontal {
    background: ${({ theme }) => theme.textColorHl};
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.scrollbarThumbColorLT};
    border: 4px solid white;
  }

  ::-webkit-scrollbar-corner {
    background: ${({ theme }) => theme.textColorHl};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.scrollbarThumbColorHoverLT};
  }

  ::-webkit-scrollbar-thumb:vertical {
    border-radius: 7px;
  }

  ::-webkit-scrollbar-thumb:horizontal {
    border-radius: 9px;
    border: 4px solid ${({ theme }) => theme.textColorHl};
  }
`;
