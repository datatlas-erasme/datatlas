import { ColorFactory } from './ColorFactory';

describe('ColorFactory.createRandomRGBArray()', () => {
  it('should return an RGB color object"', () => {
    const rgbColor = ColorFactory.createRandomRGBArray();
    expect(typeof rgbColor[0]).toBe('number');
    expect(typeof rgbColor[1]).toBe('number');
    expect(typeof rgbColor[2]).toBe('number');
  });
});
