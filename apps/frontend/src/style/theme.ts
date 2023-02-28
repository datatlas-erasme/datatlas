import { themeLT } from 'kepler.gl/dist/styles';
import styled from 'styled-components';
import { Button } from 'kepler.gl/dist/components/common/styled-components';

export interface ThemeDefault {
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

export const theme: ThemeDefault = {
  ...themeLT,

  //TEXT
  fontWeight: 400,
  fontSizeS: themeFontSize.sText,
  fontSizeXs: themeFontSize.xsText,
  lineHeightSText: '14px',

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

  errorCardtext: themeColor.yellow,
  subtextColorCard: themeColor.greyMedium,

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

  ctaBtnBgd: themeColor.primaryColor,
  ctaBtnBgdHover: themeColor.blueLight,
  ctaBtnActBgd: themeColor.blueLight,
  ctaBtnColor: themeColor.secondaryColor,
  ctaBtnActColor: themeColor.secondaryColor,

  linkBtnBgd: themeColor.secondaryColor,
  linkBtnActBgd: themeColor.greyLight,
  linkBtnColor: themeColor.primaryColor,
  linkBtnActColor: themeColor.greyDark,
  linkBtnActBgdHover: themeColor.greyExtraLight,
  linkBtnBorder: '1px solid #000000',

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
  floatingBtnActColor: themeColor.greyExtraLight,

  selectionBtnBgd: 'transparent',
  selectionBtnActBgd: 'transparent',
  selectionBtnColor: themeColor.greyLight,
  selectionBtnActColor: themeColor.yellow,
  selectionBtnBgdHover: themeColor.yellow,
  selectionBtnBorder: '1',
  selectionBtnBorderColor: themeColor.greyLight,
  selectionBtnBorderActColor: themeColor.yellow,

  // Input
  inputBoxHeight: '30px',
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
  inputBorderRadius: '3px',
  inputPlaceholderColor: themeColor.greyLight,
  inputPlaceholderColorLT: themeColor.greyExtraLight,
  inputPlaceholderFontWeight: 400,
  inputBoxShadow: 'none',
  inputBoxShadowActive: 'none',
  inputBoxShadowActiveLT: 'none',
  secondaryInputBgd: themeColor.secondaryColor,
  secondaryInputBgdHover: themeColor.primaryColor,
  secondaryInputBgdActive: themeColor.primaryColor,
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
  panelHeaderIconActive: themeColor.primaryColor,
  panelHeaderIconHover: themeColor.primaryColor,
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
  tooltipBg: themeColor.greyMedium,
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

  selectActiveBorderColor: themeColor.primaryColor,
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
  panelTabColor: themeColor.greyMedium,
  dropdownListHighlightBg: themeColor.greyMedium,
  dropdownListHighlightBgLT: themeColor.greyExtraLight,
  dropdownListShadow: '0 6px 12px 0 rgba(0,0,0,0.16)',
  dropdownListBgd: themeColor.greyDark,
  toolbarItemBgdHover: themeColor.greyDark,
  toolbarItemIconHover: themeColor.primaryColor,
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
  radioBnnRadius: 4,
  radioBtnBgdColor: themeColor.greyLight,

  // BOX CONTAINER
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
export const StyledLabel = styled.label`
  display: flex;
  margin: 20px 0 10px 0;
  font-size: ${themeFontSize.sText};
  font-weight: 700;
`;

export const FormBtn = styled(Button).attrs({ as: 'input' })`
  margin: 20px auto;
  padding: 15px 40px;
  font-size: ${themeFontSize.mText};
  font-weight: 700;
  opacity: 1;
`;

export const VerticalLine = styled.div`
  border-left: 3px solid ${themeColor.greyMedium};
  align-self: stretch;
  width: 1px;
  display: block;
`;

export const BadgeOutlines = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border: 1.5px solid #000000;
  border-radius: 50%;
  margin-left: 2px;
  font-size: ${(props) => props.theme.fontSizeXs};
`;
