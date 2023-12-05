import { useState, useEffect, useMemo, RefObject } from 'react';
import debounce from 'lodash.debounce';

interface Dimensions {
  height: number;
  width: number;
}

const getEntryOuterHeight = (entry: ResizeObserverEntry) =>
  entry.borderBoxSize?.[0].blockSize || entry.contentRect.height;

export const useMapAutoSizer = <E extends HTMLElement>(
  containerRef: RefObject<E | undefined>,
  mapControlRef: RefObject<HTMLDivElement> | undefined | null
): Dimensions => {
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 });
  const [mapControlHeight, setMapControlHeight] = useState<Dimensions['height']>(0);
  const observer = useMemo(
    () =>
      new ResizeObserver(
        debounce(
          (entries: ResizeObserverEntry[]) => {
            for (const entry of entries) {
              if (entry.target.classList.contains('map-control')) {
                setMapControlHeight(getEntryOuterHeight(entry));
              } else if (entry.target.classList.contains('map-container')) {
                const { width, height } = entry.contentRect;
                setDimensions({ width, height });
              }
            }
          },
          300,
          { leading: true, trailing: true }
        )
      ),
    []
  );

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    observer.observe(containerRef.current);

    if (mapControlRef?.current) {
      observer.observe(mapControlRef.current);
    }

    return () => observer.disconnect();
  }, [containerRef, mapControlRef, observer]);

  return { ...dimensions, height: mapControlHeight > dimensions.height ? mapControlHeight : dimensions.height };
};
