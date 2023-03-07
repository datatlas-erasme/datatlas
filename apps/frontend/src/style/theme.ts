import { DIMENSIONS } from 'kepler.gl/dist/constants/default-settings';
import {
  input,
  inputLT,
  inlineInput,
  chickletedInput,
  chickletedInputLT,
  chickletedInputContainer,
  secondaryChickletedInput,
  secondaryInput,
  dropdownScrollBar,
  dropdownScrollBarLT,
  dropdownList,
  dropdownListLT,
  dropdownListItem,
  dropdownListItemLT,
  dropdownListAnchor,
  dropdownListAnchorLT,
  dropdownListHeader,
  dropdownListSection,
  modalScrollBar,
  scrollBar,
  sidePanelScrollBar,
  inputSwitch,
  secondarySwitch,
  switchTrack,
  switchButton,
  inputCheckbox,
  inputRadio,
  checkboxBox,
  checkboxCheck,
  panelDropdownScrollBar,
  radioTrack,
  radioButton,
  secondaryRadio,
} from './components';

export interface ThemeDefault {
  [key: string]: string | number;
}

// THEME COLOR
export const themeColor = {
  primaryColor: '#000000',
  secondaryColor: '#FFFFFF',
  greyDark: '#464646',
  greyMedium: '#CECECE',
  greyLight: '#D9D9D9',
  greyExtraLight: '#F4F4F4',
  blueDark: '#07689F',
  blueLight: '#5AB6EB',
  yellow: '#FFC93C',
};

// FONT SIZE
export const themeFontSize = {
  xsText: '10px',
  sText: '12px',
  smText: '14px',
  mText: '16px',
  lText: '24px',
  xlText: '36px',
};

export const transition = 'all .4s ease';
export const transitionFast = 'all .2s ease';
export const transitionSlow = 'all .8s ease';

export const boxShadow = '0 1px 2px 0 rgba(0,0,0,0.10)';
export const boxSizing = 'border-box';
export const borderRadius = '1px';
export const borderColor = themeColor.primaryColor;
export const borderColorLT = themeColor.greyMedium;

// TEXT
export const fontWeight = 400;
export const fontSize = themeFontSize.sText;
export const fontFamily = `Verdana, 'Helvetica Neue', Helvetica, sans-serif`;
export const lineHeight = 1.71429;
export const labelColor = themeColor.primaryColor;
export const labelHoverColor = themeColor.primaryColor;
export const labelColorLT = themeColor.greyDark;

export const textColor = themeColor.primaryColor;
export const textColorLT = textColor;
export const dataTableTextColor = textColorLT;
export const titleColorLT = textColor;

export const subtextColor = themeColor.primaryColor;
export const subtextColorLT = themeColor.greyMedium;
export const subtextColorActive = themeColor.primaryColor;
export const panelToggleBorderColor = subtextColorActive;
export const panelTabWidth = '30px';
export const titleTextColor = themeColor.primaryColor;
export const textColorHl = themeColor.primaryColor;
export const textColorHlLT = themeColor.primaryColor;
export const activeColor = themeColor.primaryColor;
export const activeColorLT = themeColor.greyMedium;
export const activeColorHover = themeColor.primaryColor;
export const errorColor = '#F9042C';
export const logoColor = activeColor;

// Button
export const btnFontFamily = fontFamily;
export const primaryBtnBgd = themeColor.primaryColor;
export const primaryBtnActBgd = themeColor.blueDark;
export const primaryBtnColor = themeColor.secondaryColor;
export const primaryBtnActColor = themeColor.secondaryColor;
export const primaryBtnBgdHover = themeColor.blueDark;
export const primaryBtnRadius = '90px';
export const primaryBtnFontSizeDefault = themeFontSize.sText;
export const primaryBtnFontSizeSmall = themeFontSize.xsText;
export const primaryBtnFontSizeLarge = themeFontSize.mText;
export const primaryBtnBorder = '0';

export const secondaryBtnBgd = themeColor.primaryColor;
export const secondaryBtnActBgd = themeColor.greyMedium;
export const secondaryBtnColor = themeColor.secondaryColor;
export const secondaryBtnActColor = themeColor.secondaryColor;
export const secondaryBtnBgdHover = themeColor.blueDark;
export const secondaryBtnBorder = '0';

export const ctaBtnBgd = themeColor.primaryColor;
export const ctaBtnBgdHover = themeColor.blueDark;
export const ctaBtnActBgd = themeColor.greyMedium;
export const ctaBtnColor = themeColor.secondaryColor;
export const ctaBtnActColor = themeColor.secondaryColor;

export const linkBtnBgd = 'transparent';
export const linkBtnActBgd = linkBtnBgd;
export const linkBtnColor = themeColor.blueDark;
export const linkBtnActColor = themeColor.greyDark;
export const linkBtnActBgdHover = linkBtnBgd;
export const linkBtnBorder = `0`;

export const negativeBtnBgd = errorColor;
export const negativeBtnActBgd = themeColor.yellow;
export const negativeBtnBgdHover = themeColor.yellow;
export const negativeBtnBorder = '0';
export const negativeBtnColor = themeColor.primaryColor;
export const negativeBtnActColor = themeColor.primaryColor;

export const floatingBtnBgd = themeColor.greyExtraLight;
export const floatingBtnActBgd = themeColor.greyMedium;
export const floatingBtnBgdHover = themeColor.greyMedium;
export const floatingBtnBorder = '0';
export const floatingBtnBorderHover = '0';
export const floatingBtnColor = subtextColor;
export const floatingBtnActColor = subtextColorActive;

export const selectionBtnBgd = 'transparent';
export const selectionBtnActBgd = 'transparent';
export const selectionBtnColor = themeColor.primaryColor;
export const selectionBtnActColor = themeColor.blueDark;
export const selectionBtnBgdHover = themeColor.blueDark;
export const selectionBtnBorder = '1';
export const selectionBtnBorderColor = themeColor.primaryColor;
export const selectionBtnBorderActColor = themeColor.blueDark;
// Scrollbar
export const scrollbarThumbColorLT = labelColorLT;
export const scrollbarThumbColorHoverLT = textColorHlLT;
// Input
export const inputBoxHeight = '30px';
export const inputBoxHeightSmall = '25px';
export const inputBoxHeightTiny = '18px';
export const inputPadding = '4px 10px';
export const inputPaddingSmall = '4px 6px';
export const inputPaddingTiny = '2px 4px';
export const inputFontSize = themeFontSize.sText;
export const inputFontSizeSmall = themeFontSize.xsText;
export const inputFontWeight = 400;
export const inputBgd = themeColor.greyExtraLight;
export const inputBgdHover = themeColor.greyExtraLight;
export const inputBgdActive = themeColor.greyExtraLight;
export const inputBgdActiveLT = themeColor.secondaryColor;

export const inputBorderColor = themeColor.greyMedium;
export const inputBorderHoverColor = themeColor.greyDark;
export const inputBorderActiveColor = inputBorderHoverColor;

export const inputColor = themeColor.primaryColor;
export const inputBorderRadius = '3px';
export const inputPlaceholderColor = themeColor.greyLight;
export const inputPlaceholderColorLT = themeColor.greyLight;
export const inputPlaceholderFontWeight = 400;
export const inputBoxShadow = 'none';
export const inputBoxShadowActive = 'none';
export const inputBoxShadowActiveLT = 'none';
export const secondaryInputBgd = themeColor.greyExtraLight;
export const secondaryInputBgdHover = themeColor.secondaryColor;
export const secondaryInputBgdActive = themeColor.greyExtraLight;
export const secondaryInputColor = themeColor.primaryColor;
export const secondaryInputBorderColor = themeColor.greyLight;
export const secondaryInputBorderActiveColor = themeColor.greyMedium;
export const dropdownSelectHeight = 30;

// Select
export const selectColor = inputColor;
export const selectColorLT = titleColorLT;

export const selectActiveBorderColor = themeColor.primaryColor;
export const selectFontSize = '11px';
export const selectFontWeight = 400;
export const selectFontWeightBold = 500;

export const selectColorPlaceHolder = themeColor.secondaryColor;
export const selectColorPlaceHolderLT = selectColorLT;
export const selectBackground = inputBgd;
export const selectBackgroundHover = inputBgdHover;
export const selectBackgroundLT = themeColor.greyExtraLight;
export const selectBackgroundHoverLT = themeColor.greyExtraLight;
export const selectBorderColor = 'transparent';
export const selectBorderColorLT = 'transparent';
export const selectBorderRadius = '1px';
export const selectBorder = 0;
export const panelTabColor = themeColor.greyMedium;
export const dropdownListHighlightBg = themeColor.greyExtraLight;
export const dropdownListHighlightBgLT = themeColor.greyExtraLight;
export const dropdownListShadow = '0 6px 12px 0 rgba(0,0,0,0.16)';
export const dropdownListBgd = themeColor.secondaryColor;
export const toolbarItemBgdHover = themeColor.greyLight;
export const toolbarItemIconHover = textColorHl;
export const toolbarItemBorderHover = 'transparent';
export const toolbarItemBorderRaddius = '0px';
export const dropdownListBgdLT = themeColor.secondaryColor;
export const dropdownListBorderTop = themeColor.greyMedium;
export const dropdownListBorderTopLT = themeColor.greyLight;
export const dropdownListLineHeight = 20;
export const dropdownWrapperZ = 100;
export const dropdownWapperMargin = 4;

// Switch
export const switchWidth = 24;
export const switchHeight = 12;
export const switchLabelMargin = 12;

export const switchTrackBgd = themeColor.secondaryColor;
export const switchTrackBgdActive = activeColor;
export const switchTrackBorderRadius = '1px';
export const switchBtnBgd = themeColor.secondaryColor;
export const switchBtnBgdActive = themeColor.secondaryColor;
export const switchBtnBoxShadow = '0 2px 4px 0 rgba(0,0,0,0.40)';
export const switchBtnBorderRadius = '0';
export const switchBtnWidth = 12;
export const switchBtnHeight = 12;

export const secondarySwitchTrackBgd = themeColor.greyMedium;
export const secondarySwitchBtnBgd = themeColor.secondaryColor;

// Checkbox
export const checkboxWidth = 16;
export const checkboxHeight = 16;
export const checkboxMargin = 12;
export const checkboxBorderColor = themeColor.greyLight;
export const checkboxBorderRadius = '2px';
export const checkboxBorderColorLT = themeColor.greyLight;
export const checkboxBoxBgd = themeColor.secondaryColor;
export const checkboxBoxBgdChecked = primaryBtnBgd;

// Radio
export const radioRadius = 8;
export const radioBorderRadius = 100;
export const radioBorderColor = 'transparent';
export const radioButtonRadius = 4;
export const radioButtonBgdColor = themeColor.greyLight;

// Side Panel
export const sidePanelHeaderBg = themeColor.greyExtraLight;
export const sidePanelHeaderBorder = 'transparent';
export const layerConfigGroupMarginBottom = 12;
export const layerConfigGroupPaddingLeft = 18;

export const sidePanelInnerPadding = 16;
export const sidePanelBorder = 0;
export const sidePanelBorderColor = 'transparent';
export const sidePanelBg = themeColor.secondaryColor;
export const sidePanelScrollBarWidth = 10;
export const sidePanelScrollBarHeight = 10;
export const sideBarCloseBtnBgd = themeColor.greyExtraLight;
export const sideBarCloseBtnColor = themeColor.greyDark;
export const sideBarCloseBtnBgdHover = themeColor.secondaryColor;
export const sidePanelTitleFontsize = themeFontSize.lText;
export const sidePanelTitleLineHeight = '1.71429';
export const panelBackground = themeColor.secondaryColor;
export const panelContentBackground = themeColor.secondaryColor;
export const panelBackgroundHover = themeColor.greyLight;
export const panelHeaderBorderRadius = '0px';
export const chickletBgd = themeColor.secondaryColor;
export const chickletBgdLT = themeColor.secondaryColor;
export const panelHeaderIcon = themeColor.primaryColor;
export const panelHeaderIconActive = themeColor.primaryColor;
export const panelHeaderIconHover = textColorHl;
export const panelHeaderHeight = 48;
export const layerPanelHeaderHeight = 48;
export const panelBoxShadow = '0 6px 12px 0 rgba(0,0,0,0.16)';
export const panelBorderRadius = '2px';
export const panelBackgroundLT = themeColor.secondaryColor;
export const panelToggleMarginRight = 12;
export const panelToggleBottomPadding = 6;

export const panelBorderColor = themeColor.greyDark;
export const panelBorder = `1px solid ${borderColor}`;
export const panelBorderLT = `1px solid ${borderColorLT}`;
export const mapPanelBackgroundColor = themeColor.blueDark;
export const mapPanelHeaderBackgroundColor = themeColor.greyLight;
export const tooltipBg = themeColor.primaryColor;
export const tooltipBgLT = themeColor.greyExtraLight;
export const tooltipColor = themeColor.secondaryColor;
export const tooltipColorLT = themeColor.secondaryColor;
export const tooltipBoxShadow = boxShadow;
export const tooltipFontSize = themeFontSize.xsText;

export const layerTypeIconSizeL = 50;
export const layerTypeIconPdL = 12;
export const layerTypeIconSizeSM = 28;

export const layerPanelToggleOptionColor = '#6A7485';
export const layerPanelToggleOptionColorActive = '#F0F0F0';

// Sidepanel divider
export const sidepanelDividerBorder = '1px';
export const sidepanelDividerMargin = 12;
export const sidepanelDividerHeight = 12;

// Bottom Panel
export const bottomInnerPdSide = 32;
export const bottomInnerPdVert = 6;
export const bottomPanelGap = 20;
export const bottomPanelGapPalm = 20;
export const bottomWidgetPaddingTop = 20;
export const bottomWidgetPaddingRight = 20;
export const bottomWidgetPaddingBottom = 30;
export const bottomWidgetPaddingLeft = 20;
export const bottomWidgetBgd = 'red';
// Modal
export const modalTitleColor = textColor;
export const modalTitleFontSize = themeFontSize.lText;
export const modalTitleFontSizeSmaller = themeFontSize.mText;
export const modalFooterBgd = themeColor.secondaryColor;
export const modalImagePlaceHolder = themeColor.greyLight;
export const modalPadding = '10px 0';
export const modalLateralPadding = '72px';
export const modalPortableLateralPadding = '36px';

export const modalOverLayZ = 1001;
export const modalOverlayBgd = 'rgba(0, 0, 0, 0.5)';
export const modalContentZ = 10002;
export const modalFooterZ = 10001;
export const modalTitleZ = 10003;
export const modalButtonZ = 10005;
export const modalDropdownBackground = themeColor.secondaryColor;

// Modal Dialog (Dark)
export const modalDialogBgd = themeColor.secondaryColor;
export const modalDialogColor = textColorHl;

// Slider
export const sliderBarColor = themeColor.greyDark;
export const sliderBarBgd = themeColor.greyDark;
export const sliderBarHoverColor = themeColor.greyMedium;
export const sliderBarRadius = '1px';
export const sliderBarHeight = 4;
export const sliderHandleHeight = 12;
export const sliderHandleWidth = 12;
export const sliderHandleColor = themeColor.greyDark;
export const sliderHandleTextColor = sliderHandleColor;
export const sliderInactiveBorderColor = sliderHandleColor;
export const sliderBorderRadius = '0';

export const sliderHandleHoverColor = sliderBarHoverColor;
export const sliderHandleAfterContent = '';
export const sliderHandleShadow = '0 2px 4px 0 rgba(0,0,0,0.40)';
export const sliderInputHeight = 24;
export const sliderInputWidth = 56;
export const sliderInputFontSize = '10px';
export const sliderInputPadding = '4px 6px';
export const sliderMarginTopIsTime = -12;
export const sliderMarginTop = 12;
export const sliderMarginBottom = 12;

// Geocoder
export const geocoderWidth = 360;
export const geocoderTop = 20;
export const geocoderRight = 12;
export const geocoderInputHeight = 36;

// Map Control
export const mapControlTop = 52;

// Plot
export const rangeBrushBgd = '#3A414C';
export const histogramFillInRange = activeColor;
export const histogramFillOutRange = sliderBarColor;
export const axisFontSize = '10px';
export const axisFontColor = textColor;
export const timeTitleFontSize = '10px';
export const rangePlotMargin = { top: 12, bottom: 0, left: 0, right: 0 };
export const rangePlotMarginLarge = { top: 18, bottom: 0, left: 0, right: 0 };
export const rangePlotH = 62;
export const rangePlotContainerH = 78;
export const rangePlotHLarge = 102;
export const rangePlotHLargePalm = 102;
export const rangePlotContainerHLarge = 120;
export const rangePlotContainerHLargePalm = 120;

// Notification
export const notificationColors = {
  info: themeColor.yellow,
  error: '#f25138',
  success: '#47b275',
  warning: '#ffc043',
};

export const notificationPanelWidth = 240;
export const notificationPanelItemWidth = notificationPanelWidth - 60;
export const notificationPanelItemHeight = 60;

// Data Table
const headerRowHeight = 70;
const headerStatsControlHeight = 32;
const headerRowWStatsHeight = 364;
const rowHeight = 32;
const headerPaddingTop = 6;
const headerPaddingBottom = 8;
const cellPaddingSide = 10;
const edgeCellPaddingSide = 10;
const cellFontSize = 10;
const gridPaddingSide = 24;
const headerCellBackground = themeColor.secondaryColor;
const headerCellBorderColor = themeColor.primaryColor;
const headerCellStatsBackground = themeColor.secondaryColor;
const headerCellStatsControlBackground = themeColor.greyMedium;
const headerCellIconColor = themeColor.greyDark;
const cellBorderColor = themeColor.greyLight;
const evenRowBackground = themeColor.secondaryColor;
const oddRowBackground = themeColor.greyExtraLight;
const optionButtonColor = themeColor.primaryColor;
const pinnedGridBorderColor = themeColor.greyLight;

// Floating Time display
const timeDisplayBorderRadius = 32;
const timeDisplayHeight = 64;
const timeDisplayMinWidth = 176;
const timeDisplayOpacity = 0.8;
const timeDisplayPadding = '0 24px';

// Export map modal
const exportIntraSectionMargin = '8';

// progress bar
const progressBarColor = primaryBtnBgd;
const progressBarTrackColor = themeColor.blueLight;
// Action Panel
export const actionPanelWidth = 110;
export const actionPanelHeight = 32;

// Styled Token
export const fieldTokenRightMargin = 4;
export const fieldTokenHeight = 20;
export const fieldTokenWidth = 40;

export const textTruncate = {
  maxWidth: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  wordWrap: 'normal',
};

// layerConfigGroupLabel
export const layerConfigGroupLabelBorderLeft = '2px';
export const layerConfigGroupLabelMargin = '-12px';
export const layerConfigGroupLabelPadding = '10px';
export const layerConfigGroupColor = 'transparent';

// layerConfigGroupLabel label
export const layerConfigGroupLabelLabelMargin = '0';
export const layerConfigGroupLabelLabelFontSize = '12px';

// styledConfigGroupHeader
export const styledConfigGroupHeaderBorder = '2px';

// layerConfigurator

export const layerConfiguratorBorder = '0';
export const layerConfiguratorBorderColor = '';
export const layerConfiguratorMargin = '12px';
export const layerConfiguratorPadding = '12px 0 8px 0';
// This breakpoints are used for responsive design
export const breakPoints = {
  palm: 588,
  desk: 768,
};

export const themeKepler = {
  ...DIMENSIONS,
  // templates
  input,
  inputLT,
  inlineInput,
  chickletedInput,
  chickletedInputLT,
  chickletedInputContainer,
  secondaryChickletedInput,

  borderColor,
  borderColorLT,

  secondaryInput,
  dropdownScrollBar,
  dropdownScrollBarLT,
  dropdownList,
  dropdownListLT,
  dropdownListItem,
  dropdownListItemLT,
  dropdownListAnchor,
  dropdownListAnchorLT,
  dropdownListHeader,
  dropdownListSection,
  dropdownListShadow,
  dropdownWrapperZ,
  dropdownWapperMargin,
  modalScrollBar,
  scrollBar,
  sidePanelScrollBar,
  inputSwitch,
  secondarySwitch,
  switchTrack,
  switchButton,
  inputCheckbox,
  inputRadio,
  checkboxBox,
  checkboxCheck,

  // Transitions
  transition,
  transitionFast,
  transitionSlow,

  // styles
  activeColor,
  activeColorHover,
  borderRadius,
  boxShadow,
  errorColor,
  dropdownListHighlightBg,
  dropdownListHighlightBgLT,
  dropdownListBgd,
  toolbarItemBgdHover,
  toolbarItemBorderHover,
  toolbarItemIconHover,
  toolbarItemBorderRaddius,
  dropdownListBgdLT,
  dropdownListBorderTop,
  dropdownListBorderTopLT,
  dropdownListLineHeight,

  labelColor,
  labelColorLT,
  labelHoverColor,
  mapPanelBackgroundColor,
  mapPanelHeaderBackgroundColor,

  // Select
  selectActiveBorderColor,
  selectBackground,
  selectBackgroundLT,
  selectBackgroundHover,
  selectBackgroundHoverLT,
  selectBorder,
  selectBorderColor,
  selectBorderRadius,
  selectBorderColorLT,
  selectColor,
  selectColorPlaceHolder,
  selectColorPlaceHolderLT,
  selectFontSize,
  selectFontWeight,
  selectColorLT,
  selectFontWeightBold,
  panelTabColor,

  // Input
  inputBgd,
  inputBgdHover,
  inputBgdActive,
  inputBgdActiveLT,
  inputBoxHeight,
  inputBoxHeightSmall,
  inputBoxHeightTiny,
  inputBorderColor,
  inputBorderActiveColor,
  inputBorderHoverColor,
  inputBorderRadius,
  inputColor,
  inputPadding,
  inputPaddingSmall,
  inputPaddingTiny,
  inputFontSize,
  inputFontSizeSmall,
  inputFontWeight,
  inputPlaceholderColor,
  inputPlaceholderColorLT,
  inputPlaceholderFontWeight,
  inputBoxShadow,
  inputBoxShadowActive,
  inputBoxShadowActiveLT,
  secondaryInputBgd,
  secondaryInputBgdHover,
  secondaryInputBgdActive,
  secondaryInputColor,
  secondaryInputBorderColor,
  secondaryInputBorderActiveColor,
  dropdownSelectHeight,

  // Switch
  switchWidth,
  switchHeight,
  switchTrackBgd,
  switchTrackBgdActive,
  switchTrackBorderRadius,
  switchBtnBgd,
  switchBtnBgdActive,
  switchBtnBoxShadow,
  switchBtnBorderRadius,
  switchBtnWidth,
  switchBtnHeight,
  switchLabelMargin,

  secondarySwitchTrackBgd,
  secondarySwitchBtnBgd,

  // Checkbox
  checkboxWidth,
  checkboxHeight,
  checkboxMargin,
  checkboxBorderColor,
  checkboxBorderRadius,
  checkboxBorderColorLT,
  checkboxBoxBgd,
  checkboxBoxBgdChecked,

  // Radio
  radioRadius,
  radioBorderRadius,
  radioBorderColor,
  radioButtonRadius,
  radioButtonBgdColor,
  radioTrack,
  radioButton,
  secondaryRadio,

  // Button
  btnFontFamily,
  primaryBtnBgd,
  primaryBtnActBgd,
  primaryBtnColor,
  primaryBtnActColor,
  primaryBtnBgdHover,
  primaryBtnRadius,
  primaryBtnFontSizeDefault,
  primaryBtnFontSizeSmall,
  primaryBtnFontSizeLarge,
  primaryBtnBorder,

  secondaryBtnBgd,
  secondaryBtnActBgd,
  secondaryBtnBgdHover,
  secondaryBtnColor,
  secondaryBtnActColor,
  secondaryBtnBorder,

  negativeBtnBgd,
  negativeBtnActBgd,
  negativeBtnBgdHover,
  negativeBtnBorder,
  negativeBtnColor,
  negativeBtnActColor,

  linkBtnBgd,
  linkBtnActBgd,
  linkBtnColor,
  linkBtnActColor,
  linkBtnActBgdHover,
  linkBtnBorder,

  floatingBtnBgd,
  floatingBtnActBgd,
  floatingBtnBgdHover,
  floatingBtnBorder,
  floatingBtnBorderHover,
  floatingBtnColor,
  floatingBtnActColor,

  ctaBtnBgd,
  ctaBtnBgdHover,
  ctaBtnActBgd,
  ctaBtnColor,
  ctaBtnActColor,

  selectionBtnBgd,
  selectionBtnActBgd,
  selectionBtnColor,
  selectionBtnActColor,
  selectionBtnBgdHover,
  selectionBtnBorder,
  selectionBtnBorderColor,
  selectionBtnBorderActColor,

  scrollbarThumbColorLT,
  scrollbarThumbColorHoverLT,

  // Modal
  modalTitleColor,
  modalTitleFontSize,
  modalTitleFontSizeSmaller,
  modalFooterBgd,
  modalImagePlaceHolder,
  modalPadding,

  modalDialogBgd,
  modalDialogColor,

  modalLateralPadding,
  modalPortableLateralPadding,
  modalOverLayZ,
  modalOverlayBgd,
  modalContentZ,
  modalFooterZ,
  modalTitleZ,
  modalButtonZ,
  modalDropdownBackground,

  // Side Panel
  sidePanelBg,
  sidePanelInnerPadding,
  sideBarCloseBtnBgd,
  sideBarCloseBtnColor,
  sideBarCloseBtnBgdHover,
  sidePanelHeaderBg,
  sidePanelHeaderBorder,
  sidePanelScrollBarWidth,
  sidePanelScrollBarHeight,
  sidePanelTitleFontsize,
  sidePanelTitleLineHeight,
  panelHeaderBorderRadius,
  sidePanelBorder,
  sidePanelBorderColor,

  layerConfigGroupLabelLabelFontSize,
  layerConfigGroupMarginBottom,
  layerConfigGroupPaddingLeft,

  // Side Panel Panel
  chickletBgd,
  chickletBgdLT,
  panelBackground,
  panelContentBackground,
  panelBackgroundHover,
  panelBackgroundLT,
  panelToggleMarginRight,
  panelToggleBottomPadding,
  panelBoxShadow,
  panelBorderRadius,
  panelBorder,
  panelBorderColor,
  panelBorderLT,
  panelHeaderIcon,
  panelHeaderIconActive,
  panelHeaderIconHover,
  panelHeaderHeight,
  layerPanelHeaderHeight,
  panelDropdownScrollBar,

  layerTypeIconSizeL,
  layerTypeIconPdL,
  layerTypeIconSizeSM,

  layerPanelToggleOptionColor,
  layerPanelToggleOptionColorActive,

  // Text
  fontFamily,
  fontWeight,
  fontSize,
  lineHeight,
  textColor,
  textColorLT,
  dataTableTextColor,
  textColorHl,
  titleTextColor,
  subtextColor,
  subtextColorLT,
  subtextColorActive,
  panelToggleBorderColor,
  panelTabWidth,
  textTruncate,
  titleColorLT,
  tooltipBg,
  tooltipBgLT,
  tooltipColor,
  tooltipColorLT,
  tooltipBoxShadow,
  tooltipFontSize,
  logoColor,

  // Sidepanel divider
  sidepanelDividerBorder,
  sidepanelDividerMargin,
  sidepanelDividerHeight,

  // Bottom Panel
  bottomInnerPdSide,
  bottomInnerPdVert,
  bottomPanelGap,
  bottomPanelGapPalm,
  bottomWidgetPaddingTop,
  bottomWidgetPaddingRight,
  bottomWidgetPaddingBottom,
  bottomWidgetPaddingLeft,
  bottomWidgetBgd,

  // Slider
  sliderBarColor,
  sliderBarBgd,
  sliderBarHoverColor,
  sliderBarRadius,
  sliderBarHeight,
  sliderHandleHeight,
  sliderHandleWidth,
  sliderHandleColor,
  sliderHandleTextColor,
  sliderInactiveBorderColor,
  sliderBorderRadius,
  sliderHandleHoverColor,
  sliderHandleAfterContent,
  sliderHandleShadow,
  sliderInputHeight,
  sliderInputWidth,
  sliderMarginTopIsTime,
  sliderMarginTop,
  sliderMarginBottom,

  // Geocoder
  geocoderWidth,
  geocoderTop,
  geocoderRight,
  geocoderInputHeight,

  // Map Control
  mapControlTop,

  // Plot
  rangeBrushBgd,
  histogramFillInRange,
  histogramFillOutRange,
  axisFontSize,
  axisFontColor,
  timeTitleFontSize,
  rangePlotMargin,
  rangePlotMarginLarge,
  rangePlotH,
  rangePlotHLarge,
  rangePlotHLargePalm,
  rangePlotContainerH,
  rangePlotContainerHLarge,
  rangePlotContainerHLargePalm,

  // Notifications
  notificationColors,
  notificationPanelWidth,
  notificationPanelItemWidth,
  notificationPanelItemHeight,

  // Data Table
  headerRowHeight,
  headerRowWStatsHeight,
  headerStatsControlHeight,
  rowHeight,
  headerPaddingTop,
  headerPaddingBottom,
  cellPaddingSide,
  edgeCellPaddingSide,
  cellFontSize,
  gridPaddingSide,
  optionButtonColor,
  headerCellBackground,
  headerCellBorderColor,
  headerCellStatsBackground,
  headerCellStatsControlBackground,
  headerCellIconColor,
  cellBorderColor,
  evenRowBackground,
  oddRowBackground,
  pinnedGridBorderColor,
  // time display
  timeDisplayBorderRadius,
  timeDisplayHeight,
  timeDisplayMinWidth,
  timeDisplayOpacity,
  timeDisplayPadding,

  // export map
  exportIntraSectionMargin,

  // Action Panel
  actionPanelWidth,
  actionPanelHeight,

  // Breakpoints
  breakPoints,

  // progressbar
  progressBarColor,
  progressBarTrackColor,

  // layerConfigGroupLabel
  layerConfigGroupLabelBorderLeft,
  layerConfigGroupLabelMargin,
  layerConfigGroupLabelPadding,
  layerConfigGroupColor,

  // layerConfigGroupLabel label
  layerConfigGroupLabelLabelMargin,

  // StyledConfigGroupHeader
  styledConfigGroupHeaderBorder,

  // layerConfigurator
  layerConfiguratorBorder,
  layerConfiguratorBorderColor,
  layerConfiguratorMargin,
  layerConfiguratorPadding,

  // Styled token
  fieldTokenRightMargin,
  fieldTokenHeight,
  fieldTokenWidth,
};
// Here you can add custom style variable
export const theme: ThemeDefault = {
  ...themeKepler,

  // TEXT
  textLink: themeFontSize.xsText,

  // CHECKBOX
  checkboxWidth: 16,
  checkboxHeight: 16,
  checkboxMargin: 12,
  checkboxBorderColor: themeColor.greyLight,
  checkboxBorderRadius: '2px',
  checkboxBorderColorLT: themeColor.greyLight,
  checkboxBoxBgd: 'white',
  checkboxBoxBgdChecked: themeColor.primaryColor,

  // RADIO
  radioRadius: 8,
  radioBorderRadius: 100,
  radioBorderColor: 'transparent',
  radioBnnRadius: 4,
  radioBtnBgdColor: themeColor.greyLight,

  // BOX CONTAINER
  borderBox: boxSizing,
  layoutsBoxContainerMargin: '40px 0',
  layoutsBoxContainer: '40px 20px',
  cardBoxContainer: '10px',

  // NAV
  navBackgroundColor: themeColor.secondaryColor,

  // CARD
  cardHeight: '20vh',
  cardWidth: '33vw',

  // LAYOUT
  layoutBGColor: themeColor.greyExtraLight,

  // SIDEBAR PROJECT
  sidebarProjectBG: themeColor.blueLight,
};
