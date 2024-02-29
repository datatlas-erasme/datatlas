import {css} from 'styled-components';

export const DropdownScrollBar = css`
  ::-webkit-scrollbar {
    height: 10px;
    width: 10px;
  }

  ::-webkit-scrollbar-corner {
    background: ${({theme}) => theme.dropdownListBgd};
  }

  ::-webkit-scrollbar-track {
    background: ${({theme}) => theme.dropdownListBgd};
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: ${({theme}) => theme.labelColor};
    border: 3px solid ${({theme}) => theme.dropdownListBgd};
  }

  :vertical:hover {
    background: ${({theme}) => theme.textColorHl};
    cursor: pointer;
  }
`;
export const DropdownScrollBarLT = css`
  ${DropdownScrollBar} ::-webkit-scrollbar-corner {
    background: ${({theme}) => theme.dropdownListBgdLT};
  }

  ::-webkit-scrollbar-track {
    background: ${({theme}) => theme.dropdownListBgdLT};
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: ${({theme}) => theme.scrollbarThumbColorLT};
    border: 3px solid ${({theme}) => theme.dropdownListBgdLT};
  }

  :vertical:hover {
    background: ${({theme}) => theme.scrollbarThumbColorHoverLT};
    cursor: pointer;
  }
`;
export const DropdownListAnchor = css`
  color: ${({theme}) => theme.selectColor};
  padding-left: 3px;
  font-size: ${({theme}) => theme.selectFontSize};
  line-height: ${({theme}) => theme.dropdownListLineHeight}px;

  &.disabled {
    color: ${({theme}) => theme.subtextColor};
  }
`;
export const DropdownListAnchorLT = css`
  ${DropdownListAnchor} {
    color: ${({theme}) => theme.selectColorLT};
  }
`;
export const DropdownListSize = css`
  font-size: 11px;
  padding: 3px 9px;
  font-weight: 500;
  white-space: nowrap;
`;
export const DropdownListItem = css`
  ${DropdownListSize} &.hover,
  &:hover {
    cursor: pointer;
    background-color: ${({theme}) => theme.dropdownListHighlightBg};

    .list__item__anchor {
      color: ${({theme}) => theme.textColorHl};
    }
  }
`;
export const DropdownListItemLT = css`
  ${DropdownListSize} {
    color: ${({theme}) => theme.textColorLT};

    &.hover,
    &:hover {
      cursor: pointer;
      color: ${({theme}) => theme.textColorHlLT};
      background-color: ${({theme}) => theme.dropdownListHighlightBgLT};

      .list__item__anchor {
        color: ${({theme}) => theme.selectColorLT};
      }
    }
  }
`;
export const DropdownListHeader = css`
  font-size: 11px;
  padding: 5px 9px;
  color: ${({theme}) => theme.labelColor};
`;
export const DropdownListSection = css`
  padding: 0 0 4px 0;
  margin-bottom: 4px;
  border-bottom: 1px solid ${({theme}) => theme.labelColor};
`;
export const DropdownList = css`
  overflow-y: auto;
  max-height: 280px;
  box-shadow: ${({theme}) => theme.dropdownListShadow};
  border-radius: 2px;

  .list__section {
    ${({theme}) => theme.dropdownListSection};
  }
  .list__header {
    ${({theme}) => theme.dropdownListHeader};
  }

  .list__item {
    ${({theme}) => theme.dropdownListItem};
  }

  .list__item__anchor {
    ${({theme}) => theme.dropdownListAnchor};
  }

  ${({theme}) => theme.dropdownScrollBar};
`;
export const DropdownListLT = css`
  ${DropdownList} .list__item {
    ${({theme}) => theme.dropdownListItemLT};
  }

  .list__item__anchor {
    ${({theme}) => theme.dropdownListAnchorLT};
  }

  ${({theme}) => theme.dropdownScrollBarLT};
`;
