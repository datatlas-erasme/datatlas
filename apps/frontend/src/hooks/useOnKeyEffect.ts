import { useEffect } from 'react';
import KeyEvent from 'kepler.gl/dist/constants/keyevent';

export const useOnKeyEffect = <T>(keyCodeToListenTo: string, callback: (arg0: T) => void, callbackValue: T) =>
  useEffect(() => {
    const onKeyUp = (e: KeyEvent) => {
      const keyCode = e.keyCode;
      if (keyCode === keyCodeToListenTo) {
        callback(callbackValue);
      }
    };

    document.addEventListener('keyup', onKeyUp);

    return () => {
      document.removeEventListener('keyup', onKeyUp);
    };
  }, [keyCodeToListenTo, callback, callbackValue]);
