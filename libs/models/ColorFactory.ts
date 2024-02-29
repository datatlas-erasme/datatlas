import { RGBColor } from '@kepler.gl/types';
import { DataVizColors } from '@kepler.gl/constants';
import { hexToRgb } from '@kepler.gl/utils';

export class ColorFactory {
  public static createRandomRGBArray(): RGBColor {
    return hexToRgb(ColorFactory.createRandomHex());
  }

  public static createRandomHex() {
    const dataVizColorValues = Object.values(DataVizColors);
    return dataVizColorValues[Math.floor(Math.random() * dataVizColorValues.length)];
  }
}
