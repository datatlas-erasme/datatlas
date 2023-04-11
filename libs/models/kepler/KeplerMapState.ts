import { SavedMapState } from 'kepler.gl/schemas/schema-manager';

export class KeplerMapState implements SavedMapState {
  bearing = 0;
  dragRotate = false;
  isSplit = false;
  latitude = 45.758507;
  longitude = 4.852149;
  pitch = 0;
  zoom = 9;

  public static getInitialState(): KeplerMapState {
    return {
      bearing: 0,
      dragRotate: false,
      latitude: 45.758507,
      longitude: 4.852149,
      pitch: 0,
      zoom: 9,
      isSplit: false,
    };
  }
}
