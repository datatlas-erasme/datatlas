import { themeLT } from 'kepler.gl/dist/styles';

interface ThemeDefault {
  [key: string]: string | number;
}

export const fontFamily = `Verdana, 'Helvetica Neue', Helvetica, sans-serif`;

// THEME COLOR
export const themeColor = {
  primaryColor: '#000000',
  secondaryColor: '#FFFFFF',
  greyDark: '#464646',
  greyMedium: '#CECECE',
  greyLight: '#D9D9D9',
  greyExtraLight: '#EAEAEA',
  blueDark: '#07689F',
  blueLight: '#5AB6EB',
  yellow: '#FFC93C',
};

// FONT SIZE
export const themeFontSize = {
  xsText: '10px',
  sText: '12px',
  mText: '12px',
  lText: '24px',
  xlText: '36px',
};

export const theme: ThemeDefault = {
  ...themeLT,

  //TEXT
  fontWeight: 400,
  fontSize: themeFontSize.sText,
  lineHeight: '14px',

  textColor: themeColor.primaryColor,
  subtextColor: themeColor.primaryColor,
  subtextColorActive: themeColor.primaryColor,
  dataTableTextColor: themeColor.primaryColor,
  panelToggleBorderColor: themeColor.primaryColor,
  panelTabWidth: '30px',
  labelColor: themeColor.primaryColor,
  labelHoverColor: themeColor.greyDark,
  labelColorLT: themeColor.greyLight,

  titleTextColor: themeColor.primaryColor,
  textColorHl: themeColor.greyMedium,
  textColorHlLT: themeColor.primaryColor,
  activeColor: themeColor.yellow,
  activeColorLT: themeColor.yellow,
  activeColorHover: themeColor.primaryColor,
  errorColor: themeColor.yellow,
  logoColor: themeColor.primaryColor,

  // BUTTON
  btnFontFamily: fontFamily,
  primaryBtnBgd: themeColor.primaryColor,
  primaryBtnActBgd: themeColor.greyDark,
  primaryBtnColor: themeColor.secondaryColor,
  primaryBtnActColor: themeColor.greyLight,
  primaryBtnBgdHover: themeColor.greyDark,
  primaryBtnRadius: '90px',
  primaryBtnFontSizeDefault: themeFontSize.sText,
  primaryBtnFontSizeSmall: themeFontSize.xsText,
  primaryBtnFontSizeLarge: themeFontSize.mText,

  secondaryBtnBgd: themeColor.primaryColor,
  secondaryBtnActBgd: themeColor.primaryColor,
  secondaryBtnColor: themeColor.secondaryColor,
  secondaryBtnActColor: themeColor.secondaryColor,
  secondaryBtnBgdHover: themeColor.greyDark,
  secondaryBtnBorder: '0',

  ctaBtnBgd: themeColor.blueDark,
  ctaBtnBgdHover: themeColor.blueLight,
  ctaBtnActBgd: themeColor.blueLight,
  ctaBtnColor: themeColor.secondaryColor,
  ctaBtnActColor: themeColor.secondaryColor,

  linkBtnBgd: 'transparent',
  linkBtnActBgd: 'linkBtnBgd',
  linkBtnColor: themeColor.primaryColor,
  linkBtnActColor: themeColor.greyDark,
  linkBtnActBgdHover: themeColor.greyMedium,
  linkBtnBorder: '0',

  negativeBtnBgd: 'errorColor',
  negativeBtnActBgd: themeColor.greyLight,
  negativeBtnBgdHover: themeColor.greyExtraLight,
  negativeBtnBorder: '0',
  negativeBtnColor: themeColor.secondaryColor,
  negativeBtnActColor: themeColor.secondaryColor,

  floatingBtnBgd: themeColor.primaryColor,
  floatingBtnActBgd: themeColor.greyDark,
  floatingBtnBgdHover: themeColor.greyDark,
  floatingBtnBorder: '0',
  floatingBtnBorderHover: '0',
  floatingBtnColor: themeColor.secondaryColor,
  floatingBtnActColor: themeColor.secondaryColor,

  selectionBtnBgd: 'transparent',
  selectionBtnActBgd: 'transparent',
  selectionBtnColor: themeColor.greyLight,
  selectionBtnActColor: themeColor.yellow,
  selectionBtnBgdHover: themeColor.yellow,
  selectionBtnBorder: '1',
  selectionBtnBorderColor: themeColor.greyLight,
  selectionBtnBorderActColor: themeColor.yellow,

  // Input
  inputBoxHeight: '35px',
  inputBoxHeightSmall: '25px',
  inputBoxHeightTiny: '18px',
  inputPadding: '4px 10px',
  inputPaddingSmall: '4px 6px',
  inputPaddingTiny: '2px 4px',
  inputFontSize: themeFontSize.sText,
  inputFontSizeSmall: themeFontSize.xsText,
  inputFontWeight: 400,
  inputBgd: themeColor.greyLight,
  inputBgdHover: themeColor.greyExtraLight,
  inputBgdActive: themeColor.greyExtraLight,
  inputBgdActiveLT: themeColor.secondaryColor,

  inputBorderColor: 'none',
  inputBorderHoverColor: themeColor.greyDark,
  inputBorderHoverColorLT: themeColor.greyLight,
  inputBorderActiveColor: themeColor.greyLight,
  inputBorderActiveColorLT: themeColor.greyExtraLight,

  inputColor: themeColor.primaryColor,
  inputBorderRadius: '1px',
  inputPlaceholderColor: themeColor.greyLight,
  inputPlaceholderColorLT: themeColor.greyExtraLight,
  inputPlaceholderFontWeight: 400,
  inputBoxShadow: 'none',
  inputBoxShadowActive: 'none',
  inputBoxShadowActiveLT: 'none',
  secondaryInputBgd: themeColor.secondaryColor,
  secondaryInputBgdHover: themeColor.greyMedium,
  secondaryInputBgdActive: themeColor.greyMedium,
  secondaryInputColor: themeColor.greyLight,
  secondaryInputBorderColor: themeColor.greyDark,
  secondaryInputBorderActiveColor: themeColor.greyLight,
  dropdownSelectHeight: 30,

  // SIDE PANEL PROJECT PAGE
  sidePanelHeaderBg: themeColor.greyExtraLight,
  sidePanelHeaderBorder: 'transparent',
  layerConfigGroupMarginBottom: 12,
  layerConfigGroupPaddingLeft: 18,

  sidePanelInnerPadding: 16,
  sidePanelBorder: 0,
  sidePanelBorderColor: 'transparent',
  sidePanelBg: themeColor.greyExtraLight,
  sidePanelScrollBarWidth: 10,
  sidePanelScrollBarHeight: 10,
  sideBarCloseBtnBgd: themeColor.secondaryColor,
  sideBarCloseBtnColor: themeColor.greyDark,
  sideBarCloseBtnBgdHover: themeColor.secondaryColor,
  sidePanelTitleFontsize: themeFontSize.lText,
  sidePanelTitleLineHeight: '1.71429',
  panelBackground: themeColor.greyLight,
  panelContentBackground: themeColor.greyLight,
  panelBackgroundHover: '',
  panelHeaderBorderRadius: '0px',
  chickletBgd: 'red',
  chickletBgdLT: 'red',
  panelHeaderIcon: themeColor.primaryColor,
  panelHeaderIconActive: themeColor.greyDark,
  panelHeaderIconHover: themeColor.greyMedium,
  panelHeaderHeight: 48,
  layerPanelHeaderHeight: 48,
  layerPanelToggleOptionColor: themeColor.yellow,
  layerPanelToggleOptionColorActive: themeColor.greyLight,
  panelBoxShadow: '0 6px 12px 0 rgba(0,0,0,0.16)',
  panelBorderRadius: '2px',
  panelBackgroundLT: themeColor.secondaryColor,
  panelToggleMarginRight: 12,
  panelToggleBottomPadding: 6,

  panelBorderColor: '',
  panelBorder: `1px solid ${themeColor.greyDark}`,
  panelBorderLT: `1px solid ${themeColor.greyLight}`,

  mapPanelBackgroundColor: themeColor.blueDark,
  mapPanelHeaderBackgroundColor: themeColor.yellow,
  tooltipBg: themeColor.blueLight,
  tooltipColor: themeColor.secondaryColor,
  tooltipBoxShadow: themeColor.greyLight,
  tooltipFontSize: themeFontSize.xsText,

  layerTypeIconSizeL: 50,
  layerTypeIconPdL: 12,
  layerTypeIconSizeSM: 28,

  sidepanelDividerBorder: '1px',
  sidepanelDividerMargin: 12,
  sidepanelDividerHeight: 12,

  // SELECT
  selectColor: themeColor.primaryColor,
  selectColorLT: themeColor.primaryColor,

  selectActiveBorderColor: themeColor.greyMedium,
  selectFontSize: '11px',
  selectFontWeight: '400',
  selectFontWeightBold: '500',

  selectColorPlaceHolder: themeColor.greyDark,
  selectColorPlaceHolderLT: themeColor.primaryColor,
  selectBackground: themeColor.greyLight,
  selectBackgroundHover: themeColor.greyExtraLight,
  selectBackgroundLT: themeColor.secondaryColor,
  selectBackgroundHoverLT: themeColor.greyExtraLight,
  selectBorderColor: themeColor.greyLight,
  selectBorderColorLT: themeColor.greyLight,
  selectBorderRadius: '1px',
  selectBorder: 0,
  panelTabColor: themeColor.primaryColor,
  dropdownListHighlightBg: themeColor.greyMedium,
  dropdownListHighlightBgLT: themeColor.greyExtraLight,
  dropdownListShadow: '0 6px 12px 0 rgba(0,0,0,0.16)',
  dropdownListBgd: themeColor.greyDark,
  toolbarItemBgdHover: themeColor.greyDark,
  toolbarItemIconHover: themeColor.greyMedium,
  toolbarItemBorderHover: 'transparent',
  toolbarItemBorderRaddius: '0px',
  dropdownListBgdLT: themeColor.secondaryColor,
  dropdownListBorderTop: themeColor.greyDark,
  dropdownListBorderTopLT: themeColor.greyLight,
  dropdownListLineHeight: 20,
  dropdownWrapperZ: 100,
  dropdownWapperMargin: 4,

  // Switch
  switchWidth: 24,
  switchHeight: 12,
  switchLabelMargin: 12,

  switchTrackBgd: themeColor.greyDark,
  switchTrackBgdActive: themeColor.yellow,
  switchTrackBorderRadius: '1px',
  switchBtnBgd: themeColor.greyMedium,
  switchBtnBgdActive: themeColor.greyLight,
  switchBtnBoxShadow: '0 2px 4px 0 rgba(0,0,0,0.40)',
  switchBtnBorderRadius: '0',
  switchBtnWidth: 12,
  switchBtnHeight: 12,

  secondarySwitchTrackBgd: themeColor.greyDark,
  secondarySwitchBtnBgd: themeColor.greyMedium,

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
  radioButtonRadius: 4,
  radioButtonBgdColor: themeColor.greyLight,

  // BOX CONTAINER
  layoutsBoxContainer: '20px 40px',
  cardBoxContainer: '15px',

  // NAV
  navBackgroundColor: themeColor.greyMedium,

  // CARD
  cardHeight: '20vh',
  cardWidth: '30vw',
};
