export const paginationDefaultValues = {
  offset: 0,
  limit: 10,
} as const;

export const limitDefaultValues = [10, 20, 30, 40, 50] as const;

export interface IPaginationParams {
  page: number;
  limit: number;
}

export interface IOrderParams {
  field: string;
  direction: direction;
}

export type direction = "asc" | "desc";

export interface IEntityFilter<TReadDto> {
  filter?: TReadDto;
  pagination: IPaginationParams;
  order?: IOrderParams;
}

export interface IReadDto {
  isDeleted?: boolean;
}
