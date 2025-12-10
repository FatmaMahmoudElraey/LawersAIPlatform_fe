import { Skeleton } from '../ui/skeleton';

interface IButtonSkeleton {
  height: number;
  width: number;
}
export function DefaultButtonSkeleton({ height, width }: IButtonSkeleton) {
  return <Skeleton className=" rounded-md" style={{ width, height }} />;
}
export function SmallButtonSkeleton() {
  return <Skeleton className=" rounded-md w-[40px] h-[36px]" />;
}
