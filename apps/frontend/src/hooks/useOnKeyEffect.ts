import { useEffect } from 'react';
import { KeyEvent } from '@kepler.gl/constants';

export const useOnKeyEffect = <T>(keyCodeToListenTo: string, callback: (arg0: T) => void, callbackValue: T) =>
  useEffect(() => {
    const onKeyUp = (e: typeof KeyEvent) => {
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
