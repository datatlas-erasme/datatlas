import { ColorFactory } from './ColorFactory';

describe('ColorFactory.createRandomRGB()', () => {
  it('should return an RGB color object"', () => {
    const rgbColor = ColorFactory.createRandomRGBObject();
    expect(typeof rgbColor.r).toBe('number');
    expect(typeof rgbColor.g).toBe('number');
    expect(typeof rgbColor.b).toBe('number');
  });
});
