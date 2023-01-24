import { themeLT } from 'kepler.gl/dist/styles';

interface DatatlasTheme {
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

export const themeFontSize = {
  xsText: '10px',
  sText: '12px',
  mText: '12px',
  lText: '24px',
  xlText: '36px',
};

export const datatlasTheme: DatatlasTheme = {
  ...themeLT,

  cardHeight: '20vh',
  cardWidth: '30vw',
  cardPadding: '15px',

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

  // Button
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
  secondaryBtnActBgd: themeColor.greyDark,
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

  floatingBtnBgd: '#29323C',
  floatingBtnActBgd: '#3A4552',
  floatingBtnBgdHover: '#3A4552',
  floatingBtnBorder: '0',
  floatingBtnBorderHover: '0',
  floatingBtnColor: 'subtextColor',
  floatingBtnActColor: 'subtextColorActive',

  selectionBtnBgd: 'transparent',
  selectionBtnActBgd: 'transparent',
  selectionBtnColor: '#D3D8E0',
  selectionBtnActColor: '#0F9668',
  selectionBtnBgdHover: '#0F9668',
  selectionBtnBorder: '1',
  selectionBtnBorderColor: '#D3D8E0',
  selectionBtnBorderActColor: '#0F9668',

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
  secondaryInputBgd: '#242730',
  secondaryInputBgdHover: '#3A414C',
  secondaryInputBgdActive: '#3A414C',
  secondaryInputColor: '#A0A7B4',
  secondaryInputBorderColor: '#242730',
  secondaryInputBorderActiveColor: '#D3D8E0',
  dropdownSelectHeight: 30,

  // Side Panel
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
  sideBarCloseBtnColor: '#29323C',
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
  panelBoxShadow: '0 6px 12px 0 rgba(0,0,0,0.16)',
  panelBorderRadius: '2px',
  panelBackgroundLT: themeColor.secondaryColor,
  panelToggleMarginRight: 12,
  panelToggleBottomPadding: 6,

  panelBorderColor: '',
  panelBorder: `1px solid ${themeColor.greyDark}`,
  panelBorderLT: `1px solid ${themeColor.greyLight}`,

  mapPanelBackgroundColor: 'red',
  mapPanelHeaderBackgroundColor: 'green',
  tooltipBg: 'green',
  tooltipColor: themeColor.secondaryColor,
  tooltipBoxShadow: themeColor.greyLight,
  tooltipFontSize: themeFontSize.xsText,

  layerTypeIconSizeL: 50,
  layerTypeIconPdL: 12,
  layerTypeIconSizeSM: 28,

  layerPanelToggleOptionColor: 'green',
  layerPanelToggleOptionColorActive: '#F0F0F0',

  // Sidepanel divider
  sidepanelDividerBorder: '1px',
  sidepanelDividerMargin: 12,
  sidepanelDividerHeight: 12,
};
