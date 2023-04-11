import { ReactNode } from 'react';

export interface LayerTypeOptionInterface {
  id: string;
  label: string;
  icon: ReactNode;
  requireData: boolean;
}
