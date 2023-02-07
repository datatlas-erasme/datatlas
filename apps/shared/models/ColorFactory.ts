import { DataVizColors } from 'kepler.gl/dist/constants';
import { rgb, RGBColor as D3RGBColor } from 'd3-color';
import { RGBColor } from 'kepler.gl/reducers';

export class ColorFactory {
  public static createRandomRGBArray(): RGBColor {
    const rgbColor = ColorFactory.createRandomRGBObject();
    return [rgbColor.r, rgbColor.g, rgbColor.b];
  }
  public static createRandomRGBObject(): D3RGBColor {
    return rgb(ColorFactory.createRandomHex());
  }

  public static createRandomHex() {
    const dataVizColorValues = Object.values(DataVizColors);
    return dataVizColorValues[Math.floor(Math.random() * dataVizColorValues.length)];
  }
}
