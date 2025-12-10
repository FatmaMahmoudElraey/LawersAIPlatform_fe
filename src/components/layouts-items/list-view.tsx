'use client';

import { cn } from '@/lib/utils';
import { Gap, Wrapping, Direction } from '../shared/flex-props';
import { useActualWidth } from '@/hooks/use-actual-width';

export interface IListViewProp {
  children: any;
  gap?: Gap;
  direction?: Direction;
  wrapping?: Wrapping;
  width?: number;
  smallScreenWidth?: number;
  largeScreenWidth?: number;
}

function ListView({
  children,
  gap = 'gap-1',
  direction = 'vertical',
  wrapping = 'flex-nowrap',
  width,
  largeScreenWidth,
  smallScreenWidth,
}: IListViewProp) {
  const { actualWidth } = useActualWidth({
    width,
    largeScreenWidth,
    smallScreenWidth,
  });
  const listViewActualWidth = width ? { style: { width: actualWidth } } : {};

  return (
    <div
      {...listViewActualWidth}
      className={cn(
        'flex w-full',
        direction === 'horizontal' ? 'flex-row' : 'flex-col',
        wrapping,
        gap,
      )}
    >
      {children}
    </div>
  );
}

export default ListView;
