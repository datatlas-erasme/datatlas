import { createContext, RefObject } from 'react';

export const MapControlRefContext = createContext<RefObject<HTMLDivElement> | null | undefined>(null);
