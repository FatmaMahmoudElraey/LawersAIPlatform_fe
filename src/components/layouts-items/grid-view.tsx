'use client';

import { cn } from '@/lib/utils';
import { ClassValue } from 'clsx';
import {
  GapX,
  GapY,
  LargeScreenCol,
  MediumScreenCol,
  SmallScreenCol,
} from '../shared/grid-props';

export interface IGridViewProp {
  children: any;
  gapX: GapX;
  gapY: GapY;
  smallScreenCol: SmallScreenCol;
  mediumScreenCol: MediumScreenCol;
  LargeScreenCol: LargeScreenCol;
}

function GridView({
  children,
  gapX = 'gap-x-1',
  gapY = 'gap-y-1',
  LargeScreenCol,
  mediumScreenCol,
  smallScreenCol,
}: IGridViewProp) {
  return (
    <div
      className={cn(
        'grid',
        LargeScreenCol,
        mediumScreenCol,
        smallScreenCol,
        gapX,
        gapY,
      )}
    >
      {children}
    </div>
  );
}

export default GridView;
