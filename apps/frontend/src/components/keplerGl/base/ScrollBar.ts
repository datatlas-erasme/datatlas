import {css} from 'styled-components';

export const SidePanelScrollBar = css`
  ::-webkit-scrollbar {
    height: ${({theme}) => theme.sidePanelScrollBarHeight}px;
    width: ${({theme}) => theme.sidePanelScrollBarWidth}px;
  }

  ::-webkit-scrollbar-corner {
    background: ${({theme}) => theme.sidePanelBg};
  }

  ::-webkit-scrollbar-track {
    background: ${({theme}) => theme.sidePanelBg};
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: ${({theme}) => theme.panelBackgroundHover};
    border: 3px solid ${({theme}) => theme.sidePanelBg};

    :hover {
      background: ${({theme}) => theme.labelColor};
      cursor: pointer;
    }
  }
`;
export const PanelDropdownScrollBar = css`
  ::-webkit-scrollbar {
    height: 10px;
    width: 10px;
  }

  ::-webkit-scrollbar-corner {
    background: ${({theme}) => theme.panelBackground};
  }

  ::-webkit-scrollbar-track {
    background: ${({theme}) => theme.panelBackground};
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: ${({theme}) => theme.panelBackgroundHover};
    border: 3px solid ${({theme}) => theme.panelBackground};
    :hover {
      background: ${({theme}) => theme.labelColor};
      cursor: pointer;
    }
  }
`;
export const ScrollBar = css`
  ::-webkit-scrollbar {
    height: 10px;
    width: 10px;
  }

  ::-webkit-scrollbar-corner {
    background: ${({theme}) => theme.panelBackground};
  }

  ::-webkit-scrollbar-track {
    background: ${({theme}) => theme.panelBackground};
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: ${({theme}) => theme.labelColor};
    border: 3px solid ${({theme}) => theme.panelBackground}

    :vertical:hover {
      background: ${({theme}) => theme.textColorHl};
      cursor: pointer;
    }

    :horizontal:hover {
      background: ${({theme}) => theme.textColorHl};
      cursor: pointer;
    }
  }
`;
export const ModalScrollBar = css`
  ::-webkit-scrollbar {
    width: 14px;
    height: 16px;
  }

  ::-webkit-scrollbar-track {
    background: white;
  }
  ::-webkit-scrollbar-track:horizontal {
    background: ${({theme}) => theme.textColorHl};
  }
  ::-webkit-scrollbar-thumb {
    background: ${({theme}) => theme.scrollbarThumbColorLT};
    border: 4px solid white;
  }

  ::-webkit-scrollbar-corner {
    background: ${({theme}) => theme.textColorHl};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({theme}) => theme.scrollbarThumbColorHoverLT};
  }

  ::-webkit-scrollbar-thumb:vertical {
    border-radius: 7px;
  }

  ::-webkit-scrollbar-thumb:horizontal {
    border-radius: 9px;
    border: 4px solid ${({theme}) => theme.textColorHl};
  }
`;
