import { DIMENSIONS } from 'kepler.gl/dist/constants/default-settings';
import {
  Input,
  InputLT,
  SecondaryInput,
  ChickletedInput,
  ChickletedInputLT,
  ChickletedInputContainer,
  SecondaryChickletedInput,
  InlineInput,
  SwitchTrack,
  SwitchButton,
  InputSwitch,
  CheckboxBox,
  CheckboxCheck,
  InputCheckbox,
  RadioTrack,
  RadioButton,
  InputRadio,
  SecondaryRadio,
  SecondarySwitch,
  DropdownScrollBar,
  DropdownScrollBarLT,
  DropdownListAnchor,
  DropdownListAnchorLT,
  DropdownListItem,
  DropdownListItemLT,
  DropdownListHeader,
  DropdownListSection,
  DropdownList,
  DropdownListLT,
  ModalScrollBar,
  ScrollBar,
  SidePanelScrollBar,
  PanelDropdownScrollBar,
} from '../components/keplerGl/base';
import {
  themeCheckbox,
  themeGeocoder,
  mapControlTop,
  themeDataTable,
  themeTooltip,
  themeBottomPanel,
  themeSidePanel,
  themeSidePanelDivider,
  themePlot,
  themeSlider,
  themeModal,
  themeRadio,
  themeBtn,
  themeTransisions,
  themeInput,
  themeSelect,
  themeSwitch,
  themeText,
  themeBoxBorder,
  themeColors,
  themeFontSize,
  themeFloatingTimeDisplay,
  themeActionPanel,
  themeFieldToken,
  themeLayerConfigGroupLabel,
  themeLayerConfigurator,
  themeProgressBar,
  notificationPanelWidth,
  notificationPanelItemWidth,
  notificationPanelItemHeight,
  textTruncate,
  notificationColors,
  scrollbarThumbColorLT,
  scrollbarThumbColorHoverLT,
  styledConfigGroupHeaderBorder,
  breakPoints,
  exportIntraSectionMargin,
} from './constants';
import { ThemeProps } from 'styled-components';

export const theme = {
  ...DIMENSIONS,
  ...themeColors,
  ...themeFontSize,
  ...themeBoxBorder,

  // templates
  input: Input,
  inputLT: InputLT,
  inlineInput: InlineInput,
  chickletedInput: ChickletedInput,
  chickletedInputLT: ChickletedInputLT,
  chickletedInputContainer: ChickletedInputContainer,
  secondaryChickletedInput: SecondaryChickletedInput,

  secondaryInput: SecondaryInput,
  dropdownScrollBar: DropdownScrollBar,
  dropdownScrollBarLT: DropdownScrollBarLT,
  dropdownList: DropdownList,
  dropdownListLT: DropdownListLT,
  dropdownListItem: DropdownListItem,
  dropdownListItemLT: DropdownListItemLT,
  dropdownListAnchor: DropdownListAnchor,
  dropdownListAnchorLT: DropdownListAnchorLT,
  dropdownListHeader: DropdownListHeader,
  dropdownListSection: DropdownListSection,
  modalScrollBar: ModalScrollBar,
  scrollBar: ScrollBar,
  sidePanelScrollBar: SidePanelScrollBar,
  inputSwitch: InputSwitch,
  secondarySwitch: SecondarySwitch,
  switchTrack: SwitchTrack,
  switchButton: SwitchButton,
  inputCheckbox: InputCheckbox,
  inputRadio: InputRadio,
  checkboxBox: CheckboxBox,
  checkboxCheck: CheckboxCheck,

  // Transitions
  ...themeTransisions,

  // Text
  ...themeText,
  ...textTruncate,
  textLink: themeFontSize.xsText,

  // Select
  ...themeSelect,

  // Input
  ...themeInput,

  // Switch
  ...themeSwitch,

  // Checkbox
  ...themeCheckbox,

  // Radio
  ...themeRadio,
  radioTrack: RadioTrack,
  radioButton: RadioButton,
  secondaryRadio: SecondaryRadio,

  // Button
  ...themeBtn,

  scrollbarThumbColorLT,
  scrollbarThumbColorHoverLT,

  // Modal
  ...themeModal,

  // Side Panel
  ...themeSidePanel,
  panelDropdownScrollBar: PanelDropdownScrollBar,

  // Tooltip
  ...themeTooltip,

  // Sidepanel divider
  ...themeSidePanelDivider,

  // Bottom Panel
  ...themeBottomPanel,

  // Slider
  ...themeSlider,

  // Geocoder
  ...themeGeocoder,

  // Map Control
  mapControlTop,

  // Plot
  ...themePlot,

  // Notifications
  notificationColors,
  notificationPanelWidth,
  notificationPanelItemWidth,
  notificationPanelItemHeight,

  // Data Table
  ...themeDataTable,

  // time display
  ...themeFloatingTimeDisplay,

  // export map
  exportIntraSectionMargin,

  // Action Panel
  ...themeActionPanel,

  // Breakpoints
  breakPoints,

  // progressbar
  ...themeProgressBar,

  // layerConfigGroupLabel & layerConfigGroupLabel label
  ...themeLayerConfigGroupLabel,

  // StyledConfigGroupHeader
  styledConfigGroupHeaderBorder,

  // layerConfigurator
  ...themeLayerConfigurator,

  // Styled token
  ...themeFieldToken,

  // CHECKBOX
  checkboxWidth: 16,
  checkboxHeight: 16,
  checkboxMargin: 12,
  checkboxBorderColor: themeColors.greyLight,
  checkboxBorderRadius: '2px',
  checkboxBorderColorLT: themeColors.greyLight,
  checkboxBoxBgd: 'white',
  checkboxBoxBgdChecked: themeColors.primaryColor,

  // RADIO
  radioRadius: 8,
  radioBorderRadius: 100,
  radioBorderColor: 'transparent',
  radioBnnRadius: 4,
  radioBtnBgdColor: themeColors.greyLight,

  // BOX CONTAINER
  borderBox: themeBoxBorder.boxSizing,
  layoutsBoxContainerMargin: '40px 0',
  layoutsBoxContainer: '40px 20px',
  cardBoxContainer: '10px',

  // NAV
  navBackgroundColor: themeColors.secondaryColor,

  // CARD
  cardHeight: '20vh',
  cardWidth: '33vw',

  // LAYOUT
  layoutBGColor: themeColors.greyExtraLight,

  // SIDEBAR PROJECT
  sidebarProjectBG: themeColors.blueLight,
};

export type DatatlasTheme = typeof theme;
export type DatatlasThemeProps = ThemeProps<DatatlasTheme>;
