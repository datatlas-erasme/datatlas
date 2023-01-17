import { themeLT } from 'kepler.gl/dist/styles';

interface DatatlasTheme {
  [key: string]: string | number;
}

export const fontFamily = `Verdana, 'Helvetica Neue', Helvetica, sans-serif`;

// THEME COLOR
export const primaryColor = '#000000';
export const secondaryColor = '#FFFFFF';
export const greyDark = '#464646';
export const greyMedium = '#CECECE';
export const greyLight = '#D9D9D9';
export const greyExtraLight = '#EAEAEA';
export const blueDark = '#07689F';
export const blueLight = '#5AB6EB';
export const yellow = '#FFC93C';

export const datatlasTheme: DatatlasTheme = {
  ...themeLT,

  //TEXT
  fontWeight: 400,
  fontSize: '10px',
  lineHeight: '14px',

  textColor: primaryColor,
  subtextColor: primaryColor,
  subtextColorActive: primaryColor,
  dataTableTextColor: primaryColor,
  panelToggleBorderColor: primaryColor,
  panelTabWidth: '30px',
  labelColor: primaryColor,
  labelHoverColor: greyDark,
  labelColorLT: greyLight,

  titleTextColor: primaryColor,
  textColorHl: greyMedium,
  textColorHlLT: primaryColor,
  activeColor: yellow,
  activeColorLT: yellow,
  activeColorHover: primaryColor,
  errorColor: yellow,
  logoColor: primaryColor,

  // Button
  btnFontFamily: fontFamily,
  primaryBtnBgd: primaryColor,
  primaryBtnActBgd: greyDark,
  primaryBtnColor: secondaryColor,
  primaryBtnActColor: greyLight,
  primaryBtnBgdHover: greyDark,
  primaryBtnRadius: '90px',
  primaryBtnFontSizeDefault: '12px',
  primaryBtnFontSizeSmall: '10px',
  primaryBtnFontSizeLarge: '14px',

  secondaryBtnBgd: primaryColor,
  secondaryBtnActBgd: greyDark,
  secondaryBtnColor: secondaryColor,
  secondaryBtnActColor: secondaryColor,
  secondaryBtnBgdHover: greyDark,
  secondaryBtnBorder: '0',

  ctaBtnBgd: blueDark,
  ctaBtnBgdHover: blueLight,
  ctaBtnActBgd: blueLight,
  ctaBtnColor: secondaryColor,
  ctaBtnActColor: secondaryColor,

  linkBtnBgd: 'transparent',
  linkBtnActBgd: 'linkBtnBgd',
  linkBtnColor: primaryColor,
  linkBtnActColor: greyDark,
  linkBtnActBgdHover: greyMedium,
  linkBtnBorder: '0',

  negativeBtnBgd: 'errorColor',
  negativeBtnActBgd: greyLight,
  negativeBtnBgdHover: greyExtraLight,
  negativeBtnBorder: '0',
  negativeBtnColor: secondaryColor,
  negativeBtnActColor: secondaryColor,

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
  inputFontSize: '10px',
  inputFontSizeSmall: '8px',
  inputFontWeight: 400,
  inputBgd: greyLight,
  inputBgdHover: greyExtraLight,
  inputBgdActive: greyExtraLight,
  inputBgdActiveLT: secondaryColor,

  inputBorderColor: 'none',
  inputBorderHoverColor: greyDark,
  inputBorderHoverColorLT: greyLight,
  inputBorderActiveColor: greyLight,
  inputBorderActiveColorLT: greyExtraLight,

  inputColor: primaryColor,
  inputBorderRadius: '1px',
  inputPlaceholderColor: greyLight,
  inputPlaceholderColorLT: greyExtraLight,
  inputPlaceholderFontWeight: 400,
  inputBoxShadow: 'none',
  inputBoxShadowActive: 'none',
  inputBoxShadowActiveLT: 'none',
  // secondaryInputBgd: '#242730',
  // secondaryInputBgdHover: '#3A414C',
  // secondaryInputBgdActive: '#3A414C',
  // secondaryInputColor: '#A0A7B4',
  // secondaryInputBorderColor: '#242730',
  // secondaryInputBorderActiveColor: '#D3D8E0',
  dropdownSelectHeight: 30,

  // Side Panel
  sidePanelHeaderBg: greyExtraLight,
  sidePanelHeaderBorder: 'transparent',
  layerConfigGroupMarginBottom: 12,
  layerConfigGroupPaddingLeft: 18,

  sidePanelInnerPadding: 16,
  sidePanelBorder: 0,
  sidePanelBorderColor: 'transparent',
  sidePanelBg: greyExtraLight,
  sidePanelScrollBarWidth: 10,
  sidePanelScrollBarHeight: 10,
  sideBarCloseBtnBgd: secondaryColor,
  sideBarCloseBtnColor: '#29323C',
  sideBarCloseBtnBgdHover: secondaryColor,
  sidePanelTitleFontsize: '20px',
  sidePanelTitleLineHeight: '1.71429',
  panelBackground: greyLight,
  panelContentBackground: greyLight,
  panelBackgroundHover: '',
  panelHeaderBorderRadius: '0px',
  chickletBgd: 'red',
  chickletBgdLT: 'red',
  panelHeaderIcon: primaryColor,
  panelHeaderIconActive: greyDark,
  panelHeaderIconHover: greyMedium,
  panelHeaderHeight: 48,
  layerPanelHeaderHeight: 48,
  panelBoxShadow: '0 6px 12px 0 rgba(0,0,0,0.16)',
  panelBorderRadius: '2px',
  panelBackgroundLT: secondaryColor,
  panelToggleMarginRight: 12,
  panelToggleBottomPadding: 6,

  panelBorderColor: '',
  panelBorder: `1px solid ${greyDark}`,
  panelBorderLT: `1px solid ${greyLight}`,

  mapPanelBackgroundColor: 'red',
  mapPanelHeaderBackgroundColor: 'green',
  tooltipBg: 'green',
  tooltipColor: secondaryColor,
  tooltipBoxShadow: greyLight,
  tooltipFontSize: '10px',

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
