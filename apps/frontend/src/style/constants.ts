// THEME COLOR
export const themeColors = {
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

// THEME FONT SIZE
export const themeFontSize = {
  xsText: '10px',
  sText: '12px',
  smText: '14px',
  mText: '16px',
  lText: '24px',
  xlText: '36px',
};

// THEME TRANSITIONS
export const themeTransisions = {
  transition: 'all .4s ease',
  transitionFast: 'all .2s ease',
  transitionSlow: 'all .8s ease',
};

// THEME BOX & BORDER
export const themeBoxBorder = {
  boxShadow: '0 1px 2px 0 rgba(0,0,0,0.10)',
  boxSizing: 'border-box',
  borderRadius: '1px',
  borderColor: themeColors.primaryColor,
  borderColorLT: themeColors.greyMedium,
};

// THEME TEXT STYLE
export const themeText = {
  fontWeight: 400,
  fontSize: themeFontSize.sText,
  fontSizeMedium: themeFontSize.smText,
  fontSizeXsmall: themeFontSize.xsText,
  fontFamily: `Verdana, 'Helvetica Neue', Helvetica, sans-serif`,
  lineHeight: 1.71429,
  labelColor: themeColors.primaryColor,
  labelHoverColor: themeColors.primaryColor,
  labelColorLT: themeColors.greyDark,
  textColor: themeColors.primaryColor,
  textColorLT: themeColors.primaryColor,
  dataTableTextColor: themeColors.primaryColor,
  titleColorLT: themeColors.primaryColor,
  subtextColor: themeColors.primaryColor,
  subtextColorLT: themeColors.greyMedium,
  subtextColorActive: themeColors.primaryColor,
  panelToggleBorderColor: themeColors.primaryColor,
  panelTabWidth: 'auto',
  titleTextColor: themeColors.primaryColor,
  textColorHl: themeColors.primaryColor,
  textColorHlLT: themeColors.primaryColor,
  activeColor: themeColors.primaryColor,
  activeColorLT: themeColors.greyMedium,
  activeColorHover: themeColors.primaryColor,
  errorColor: '#F9042C',
  logoColor: themeColors.primaryColor,
  hintTextFontSize: themeFontSize.xsText,
  hintTextColor: themeColors.greyMedium,
};

// THEME BUTTON
export const themeBtn = {
  btnFontFamily: themeText.fontFamily,
  primaryBtnBgd: themeColors.primaryColor,
  primaryBtnActBgd: themeColors.blueDark,
  primaryBtnColor: themeColors.secondaryColor,
  primaryBtnActColor: themeColors.secondaryColor,
  primaryBtnBgdHover: themeColors.blueDark,
  primaryBtnRadius: '90px',
  primaryBtnFontSizeDefault: themeFontSize.sText,
  primaryBtnFontSizeSmall: themeFontSize.xsText,
  primaryBtnFontSizeLarge: themeFontSize.mText,
  primaryBtnBorder: '0',

  secondaryBtnBgd: themeColors.primaryColor,
  secondaryBtnActBgd: themeColors.greyMedium,
  secondaryBtnColor: themeColors.secondaryColor,
  secondaryBtnActColor: themeColors.secondaryColor,
  secondaryBtnBgdHover: themeColors.blueDark,
  secondaryBtnBorder: '0',

  ctaBtnBgd: themeColors.primaryColor,
  ctaBtnBgdHover: themeColors.blueDark,
  ctaBtnActBgd: themeColors.greyMedium,
  ctaBtnColor: themeColors.secondaryColor,
  ctaBtnActColor: themeColors.secondaryColor,

  linkBtnBgd: 'transparent',
  linkBtnActBgd: 'transparent',
  linkBtnColor: themeColors.blueDark,
  linkBtnActColor: themeColors.greyDark,
  linkBtnActBgdHover: 'transparent',
  linkBtnBorder: `0`,

  negativeBtnBgd: themeText.errorColor,
  negativeBtnActBgd: themeColors.yellow,
  negativeBtnBgdHover: themeColors.yellow,
  negativeBtnBorder: '0',
  negativeBtnColor: themeColors.primaryColor,
  negativeBtnActColor: themeColors.primaryColor,

  floatingBtnBgd: themeColors.greyExtraLight,
  floatingBtnActBgd: themeColors.greyMedium,
  floatingBtnBgdHover: themeColors.greyMedium,
  floatingBtnBorder: '0',
  floatingBtnBorderHover: '0',
  floatingBtnColor: themeText.subtextColor,
  floatingBtnActColor: themeText.subtextColorActive,

  selectionBtnBgd: 'transparent',
  selectionBtnActBgd: 'transparent',
  selectionBtnColor: themeColors.primaryColor,
  selectionBtnActColor: themeColors.blueDark,
  selectionBtnBgdHover: themeColors.blueDark,
  selectionBtnBorder: '1',
  selectionBtnBorderColor: themeColors.primaryColor,
  selectionBtnBorderActColor: themeColors.blueDark,
};

// THEME INPUT
export const themeInput = {
  inputBoxHeight: '30px',
  inputBoxHeightSmall: '25px',
  inputBoxHeightTiny: '18px',
  inputPadding: '4px 10px',
  inputPaddingSmall: '4px 6px',
  inputPaddingTiny: '2px 4px',
  inputFontSize: themeFontSize.sText,
  inputFontSizeSmall: themeFontSize.xsText,
  inputFontWeight: 400,
  inputBgd: themeColors.greyExtraLight,
  inputBgdHover: themeColors.greyExtraLight,
  inputBgdActive: themeColors.greyExtraLight,
  inputBgdActiveLT: themeColors.secondaryColor,

  inputBorderColor: themeColors.greyMedium,
  inputBorderHoverColor: themeColors.greyDark,
  inputBorderActiveColor: themeColors.greyMedium,

  inputColor: themeColors.primaryColor,
  inputBorderRadius: '3px',
  inputPlaceholderColor: themeColors.greyMedium,
  inputPlaceholderColorLT: themeColors.greyMedium,
  inputPlaceholderFontWeight: 400,
  inputBoxShadow: 'none',
  inputBoxShadowActive: 'none',
  inputBoxShadowActiveLT: 'none',
  secondaryInputBgd: themeColors.secondaryColor,
  secondaryInputBgdHover: themeColors.greyExtraLight,
  secondaryInputBgdActive: themeColors.greyExtraLight,
  secondaryInputColor: themeColors.primaryColor,
  secondaryInputBorderColor: themeColors.greyLight,
  secondaryInputBorderActiveColor: themeColors.greyMedium,
};

// THEME SELECT
export const themeSelect = {
  selectColor: themeInput.inputColor,
  selectColorLT: themeText.titleColorLT,

  selectActiveBorderColor: themeColors.primaryColor,
  selectFontSize: '11px',
  selectFontWeight: 400,
  selectFontWeightBold: 500,

  selectColorPlaceHolder: themeColors.greyMedium,
  selectColorPlaceHolderLT: themeText.titleColorLT,
  selectBackground: themeInput.inputBgd,
  selectBackgroundHover: themeInput.inputBgdHover,
  selectBackgroundLT: themeColors.greyExtraLight,
  selectBackgroundHoverLT: themeColors.greyExtraLight,
  selectBorderColor: 'transparent',
  selectBorderColorLT: 'transparent',
  selectBorderRadius: '1px',
  selectBorder: 0,
  panelTabColor: themeColors.greyMedium,
  dropdownListHighlightBg: themeColors.greyExtraLight,
  dropdownListHighlightBgLT: themeColors.greyExtraLight,
  dropdownListShadow: '0 6px 12px 0 rgba(0,0,0,0.16)',
  dropdownListBgd: themeColors.secondaryColor,
  toolbarItemBgdHover: themeColors.greyLight,
  toolbarItemIconHover: themeText.textColorHl,
  toolbarItemBorderHover: 'transparent',
  toolbarItemBorderRaddius: '0px',
  dropdownListBgdLT: themeColors.secondaryColor,
  dropdownListBorderTop: themeColors.greyMedium,
  dropdownListBorderTopLT: themeColors.greyLight,
  dropdownListLineHeight: 20,
  dropdownWrapperZ: 100,
  dropdownWapperMargin: 4,
  dropdownSelectHeight: 30,
};

// THEME SWITCH
export const themeSwitch = {
  switchWidth: 24,
  switchHeight: 12,
  switchLabelMargin: 12,

  switchTrackBgd: themeColors.secondaryColor,
  switchTrackBgdActive: themeText.activeColor,
  switchTrackBorderRadius: '1px',
  switchBtnBgd: themeColors.secondaryColor,
  switchBtnBgdActive: themeColors.secondaryColor,
  switchBtnBoxShadow: '0 2px 4px 0 rgba(0,0,0,0.40)',
  switchBtnBorderRadius: '0',
  switchBtnWidth: 12,
  switchBtnHeight: 12,

  secondarySwitchTrackBgd: themeColors.greyMedium,
  secondarySwitchBtnBgd: themeColors.secondaryColor,
};

// THEME CHECKBOX
export const themeCheckbox = {
  checkboxWidth: 16,
  checkboxHeight: 16,
  checkboxMargin: 12,
  checkboxBorderColor: themeColors.greyLight,
  checkboxBorderRadius: '2px',
  checkboxBorderColorLT: themeColors.greyLight,
  checkboxBoxBgd: themeColors.secondaryColor,
  checkboxBoxBgdChecked: themeBtn.primaryBtnBgd,
};

// THEME RADIO
export const themeRadio = {
  radioRadius: 8,
  radioBorderRadius: 100,
  radioBorderColor: 'transparent',
  radioButtonRadius: 4,
  radioButtonBgdColor: themeColors.greyLight,
};

// THEME SIDE PANEL
export const themeSidePanel = {
  sidePanelHeaderBg: themeColors.greyExtraLight,
  sidePanelHeaderBorder: 'transparent',
  layerConfigGroupMarginBottom: 12,
  layerConfigGroupPaddingLeft: 18,

  sidePanelInnerPadding: 0,
  sidePanelBorder: 0,
  sidePanelBorderColor: 'transparent',
  sidePanelBg: themeColors.secondaryColor,
  sidePanelScrollBarWidth: 10,
  sidePanelScrollBarHeight: 10,
  sideBarCloseBtnBgd: themeColors.greyExtraLight,
  sideBarCloseBtnColor: themeColors.greyDark,
  sideBarCloseBtnBgdHover: themeColors.secondaryColor,
  sidePanelTitleFontsize: themeFontSize.lText,
  sidePanelTitleLineHeight: '1.71429',
  panelBackground: themeColors.secondaryColor,
  panelContentBackground: themeColors.secondaryColor,
  panelBackgroundHover: themeColors.greyLight,
  panelHeaderBorderRadius: '0px',
  chickletBgd: themeColors.secondaryColor,
  chickletBgdLT: themeColors.secondaryColor,
  panelHeaderIcon: themeColors.primaryColor,
  panelHeaderIconActive: themeColors.primaryColor,
  panelHeaderIconHover: themeText.textColorHl,
  panelHeaderHeight: 48,
  layerPanelHeaderHeight: 52,
  panelBoxShadow: '0 6px 12px 0 rgba(0,0,0,0.16)',
  panelBorderRadius: '2px',
  panelBackgroundLT: themeColors.secondaryColor,
  panelToggleMarginRight: 0,
  panelToggleBottomPadding: 10,

  panelBorderColor: themeColors.greyDark,
  panelBorder: `1px solid ${themeBoxBorder.borderColor}`,
  panelBorderLT: `1px solid ${themeBoxBorder.borderColorLT}`,
  mapPanelBackgroundColor: themeColors.blueDark,
  mapPanelHeaderBackgroundColor: themeColors.greyLight,

  layerTypeIconSizeL: 50,
  layerTypeIconPdL: 12,
  layerTypeIconSizeSM: 28,

  layerPanelToggleOptionColor: '#6A7485',
  layerPanelToggleOptionColorActive: '#F0F0F0',
};

// THEME TOOLTIP
export const themeTooltip = {
  tooltipBg: themeColors.primaryColor,
  tooltipBgLT: themeColors.greyExtraLight,
  tooltipColor: themeColors.secondaryColor,
  tooltipColorLT: themeColors.secondaryColor,
  tooltipBoxShadow: themeBoxBorder.boxShadow,
  tooltipFontSize: themeFontSize.xsText,
};

// THEME SIDEPANEL DIVIDER
export const themeSidePanelDivider = {
  sidepanelDividerBorder: '1px',
  sidepanelDividerMargin: 12,
  sidepanelDividerHeight: 12,
};

// THEME BOTTOM PANEL
export const themeBottomPanel = {
  bottomInnerPdSide: 32,
  bottomInnerPdVert: 6,
  bottomPanelGap: 20,
  bottomPanelGapPalm: 20,
  bottomWidgetPaddingTop: 20,
  bottomWidgetPaddingRight: 20,
  bottomWidgetPaddingBottom: 30,
  bottomWidgetPaddingLeft: 20,
  bottomWidgetBgd: 'red',
};

// THEME MODAL
export const themeModal = {
  modalTitleColor: themeText.textColor,
  modalTitleFontSize: themeFontSize.lText,
  modalTitleFontSizeSmaller: themeFontSize.mText,
  modalFooterBgd: themeColors.secondaryColor,
  modalImagePlaceHolder: themeColors.greyLight,
  modalPadding: '10px 0',
  modalLateralPadding: '72px',
  modalPortableLateralPadding: '36px',

  modalOverLayZ: 1001,
  modalOverlayBgd: 'rgba(0, 0, 0, 0.5)',
  modalContentZ: 10002,
  modalFooterZ: 10001,
  modalTitleZ: 10003,
  modalButtonZ: 10005,
  modalDropdownBackground: themeColors.secondaryColor,

  // Modal Dialog (Dark)
  modalDialogBgd: themeColors.secondaryColor,
  modalDialogColor: themeText.textColorHl,
};

// THEME SLIDER
export const themeSlider = {
  sliderBarColor: themeColors.greyDark,
  sliderBarBgd: themeColors.greyDark,
  sliderBarHoverColor: themeColors.greyMedium,
  sliderBarRadius: '1px',
  sliderBarHeight: 4,
  sliderHandleHeight: 12,
  sliderHandleWidth: 12,
  sliderHandleColor: themeColors.greyDark,
  sliderHandleTextColor: themeColors.greyDark,
  sliderInactiveBorderColor: themeColors.greyDark,
  sliderBorderRadius: '0',

  sliderHandleHoverColor: themeColors.greyMedium,
  sliderHandleAfterContent: '',
  sliderHandleShadow: '0 2px 4px 0 rgba(0,0,0,0.40)',
  sliderInputHeight: 24,
  sliderInputWidth: 56,
  sliderInputFontSize: '10px',
  sliderInputPadding: '4px 6px',
  sliderMarginTopIsTime: -12,
  sliderMarginTop: 12,
  sliderMarginBottom: 12,
};

// THEME GEOCODER
export const themeGeocoder = {
  geocoderWidth: 360,
  geocoderTop: 20,
  geocoderRight: 12,
  geocoderInputHeight: 36,
};

// THEME PLOT
export const themePlot = {
  rangeBrushBgd: '#3A414C',
  histogramFillInRange: themeText.activeColor,
  histogramFillOutRange: themeSlider.sliderBarColor,
  axisFontSize: '10px',
  axisFontColor: themeText.textColor,
  timeTitleFontSize: '10px',
  rangePlotMargin: { top: 12, bottom: 0, left: 0, right: 0 },
  rangePlotMarginLarge: { top: 18, bottom: 0, left: 0, right: 0 },
  rangePlotH: 62,
  rangePlotContainerH: 78,
  rangePlotHLarge: 102,
  rangePlotHLargePalm: 102,
  rangePlotContainerHLarge: 120,
  rangePlotContainerHLargePalm: 120,
};

// THEME DATA TABLE
export const themeDataTable = {
  headerRowHeight: 70,
  headerStatsControlHeight: 32,
  headerRowWStatsHeight: 364,
  rowHeight: 32,
  headerPaddingTop: 6,
  headerPaddingBottom: 8,
  cellPaddingSide: 10,
  edgeCellPaddingSide: 10,
  cellFontSize: 10,
  gridPaddingSide: 24,
  headerCellBackground: themeColors.secondaryColor,
  headerCellBorderColor: themeColors.primaryColor,
  headerCellStatsBackground: themeColors.secondaryColor,
  headerCellStatsControlBackground: themeColors.greyMedium,
  headerCellIconColor: themeColors.greyDark,
  cellBorderColor: themeColors.greyLight,
  evenRowBackground: themeColors.secondaryColor,
  oddRowBackground: themeColors.greyExtraLight,
  optionButtonColor: themeColors.primaryColor,
  pinnedGridBorderColor: themeColors.greyLight,
};

// THEME FLOATING TIME DISPLAY
export const themeFloatingTimeDisplay = {
  timeDisplayBorderRadius: 32,
  timeDisplayHeight: 64,
  timeDisplayMinWidth: 176,
  timeDisplayOpacity: 0.8,
  timeDisplayPadding: '0 24px',
};

// THEME PROGRESS BAR
export const themeProgressBar = {
  progressBarColor: themeBtn.primaryBtnBgd,
  progressBarTrackColor: themeColors.blueLight,
};

// THEME ACTION PANEL
export const themeActionPanel = {
  actionPanelWidth: 110,
  actionPanelHeight: 32,
};

// THEME STYLED TOKEN
export const themeFieldToken = {
  fieldTokenRightMargin: 4,
  fieldTokenHeight: 20,
  fieldTokenWidth: 40,
};

export const textTruncate = {
  maxWidth: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  wordWrap: 'normal',
};

// THEME layerConfigGroupLabel
export const themeLayerConfigGroupLabel = {
  layerConfigGroupLabelBorderLeft: '2px',
  layerConfigGroupLabelMargin: '-12px',
  layerConfigGroupLabelPadding: '10px',
  layerConfigGroupColor: themeColors.secondaryColor,
  // layerConfigGroupLabel label
  layerConfigGroupLabelLabelMargin: '0',
  layerConfigGroupLabelLabelFontSize: '12px',
};

// THEME layerConfigurator
export const themeLayerConfigurator = {
  layerConfiguratorBorder: 'none',
  layerConfiguratorBorderColor: 'transparent',
  layerConfiguratorMargin: '12px',
  layerConfiguratorPadding: '10px 15px',
};

// styledConfigGroupHeader
export const styledConfigGroupHeaderBorder = '2px';

// Export map modal
export const exportIntraSectionMargin = '8';

// Scrollbar
export const scrollbarThumbColorLT = themeText.labelColorLT;
export const scrollbarThumbColorHoverLT = themeText.textColorHlLT;

// Map Control
export const mapControlTop = 52;

// Notification
export const notificationColors = {
  info: themeColors.yellow,
  error: '#f25138',
  success: '#47b275',
  warning: '#ffc043',
};
export const notificationPanelWidth = 240;
export const notificationPanelItemWidth = notificationPanelWidth - 60;
export const notificationPanelItemHeight = 60;

// This breakpoints are used for responsive design
export const breakPoints = {
  palm: 588,
  desk: 768,
};
