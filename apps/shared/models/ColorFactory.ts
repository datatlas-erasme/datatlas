import { DataVizColors } from 'kepler.gl/dist/constants';
import { RGBColor } from 'kepler.gl/reducers';
import { hexToRgb } from 'kepler.gl/dist/utils';

export class ColorFactory {
  public static createRandomRGBArray(): RGBColor {
    return hexToRgb(ColorFactory.createRandomHex());
  }

  public static createRandomHex() {
    const dataVizColorValues = Object.values(DataVizColors);
    return dataVizColorValues[Math.floor(Math.random() * dataVizColorValues.length)];
  }
}
