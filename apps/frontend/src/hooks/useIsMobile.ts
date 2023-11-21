import { useEffect, useState } from 'react';

export function useIsMobile(initialState = false) {
  const [isMobile, setIsMobile] = useState<boolean>(initialState);
  useEffect(() => {
    setIsMobile(/mobile|tablet|ip(ad|hone|od)|android/i.test(navigator.userAgent));
  }, []);

  return [isMobile, setIsMobile];
}
