import { HttpError } from "@/helpers/errors/exceptions/http.exception";
import {
  MutationFunction,
  QueryFunction,
  QueryKey,
} from "@tanstack/react-query";
import { EntityAPIs } from "../axios/axios.entity";
import { IErrorResponse } from "@/helpers/dtos/response.dto";
import { IEntityFilter } from "@/helpers/dtos/pagination.dto";
export interface ShowToastOptions {
  loadingMessage: string;
  loadingToast: boolean;
  successToast: boolean;
  failedToast: boolean;
}

export type IUseOperationAPI<TResponse> = {
  page: number;
  showToastOptions: ShowToastOptions;
  onCancelRequest?: () => void;
  afterSuccess?: (entity: TResponse) => void;
  afterFailed?: (error: HttpError<string | IErrorResponse>) => void;
};

export type IUseGetAPI<IReadDto> = {
  infoPagination: IEntityFilter<IReadDto>;
  isEnabled?: boolean;
  onCancelRequest?: () => void;
};

export type IUseInfiniteGetAPI<IReadDto> = {
  infoPagination: IEntityFilter<IReadDto>;
  isEnabled?: boolean;
  onCancelRequest?: () => void;
};

export type IUseGetOneAPI = {
  id: number;
  isEnabled: boolean;
  onCancelRequest?: () => void;
};

export type IUseReorderAPI = {
  page: number;
  showToastOptions: ShowToastOptions;
  onCancelRequest?: () => void;
};

// export type IUseOperationAPI = {
//   page: number;
//   showToastOptions: ShowToastOptions;
//   onCancelRequest?: () => void;
// };

export type TOperationAPI<T, U> = {
  operationAPI: MutationFunction<T, U>;
  // shadcnUiToast: any;
  successMessage: (entity: T) => string;
  showToastOptions?: ShowToastOptions;
  enableRequestCancellation?: boolean;
  afterSuccess?: (entity: T) => void;
  afterFailed?: (error: HttpError<IErrorResponse | string>) => void;
  onCancelRequest?: () => void;
};

export type TGetOperationAPI<T> = {
  queryKey: QueryKey;
  queryAPI: QueryFunction<T[], QueryKey, never>;
  isEnabled?: boolean;
};

export type TGetOneOperationAPI<T> = {
  queryKey: QueryKey;
  queryAPI: QueryFunction<T, QueryKey, never>;
  isEnabled?: boolean;
};

export type DecoupledReadFetch<TResponse> = {
  modelNameAsPlural: string;
  queryFn: QueryFunction<TResponse, readonly unknown[], never>;
};

export type DecoupledCreateUpdateDeleteFetch<TResponse, TOperation> = {
  modelNameAsPlural: string;
  modelNameAsSingular: string;
  mutationFn: MutationFunction<TResponse, TOperation>;
  enableRequestCancelation?: boolean;
};
