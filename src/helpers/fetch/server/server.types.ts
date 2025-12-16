import { IEntityFilter, IReadDto } from "@/helpers/dtos/pagination.dto";
import { IErrorResponse } from "@/helpers/dtos/response.dto";
import { HttpError } from "@/helpers/errors/exceptions/http.exception";
import { MutationFunction } from "@tanstack/react-query";
import { EntityAPIs } from "../axios/axios.entity";
export interface ShowToastOptions {
  loadingMessage: string;
  loadingToast: boolean;
  successToast: boolean;
  failedToast: boolean;
}

export type IUseOperationAPI = {
  page: number;
  showToastOptions: ShowToastOptions;
  onCancelRequest?: () => void;
};

export type IUseCreateAPI = {
  page: number;
  showToastOptions?: ShowToastOptions;
  onCancelRequest?: () => void;
};

export type IUseUpdateAPI = {
  page: number;
  showToastOptions?: ShowToastOptions;
  onCancelRequest?: () => void;
};

export type IUseDeleteAPI = {
  page: number;
  showToastOptions?: ShowToastOptions;
  onCancelRequest?: () => void;
};

export type IUseGetAPI<T extends IReadDto> = {
  infoPagination: IEntityFilter<T>;
  isEnabled?: boolean;
  onCancelRequest?: () => void;
};

export type IUseInfiniteGetAPI<T extends IReadDto> = {
  infoPagination: IEntityFilter<T>;
  isEnabled?: boolean;
  onCancelRequest?: () => void;
};

export type IUseGetOneAPI = {
  id: number;
  isEnabled: boolean;
  onCancelRequest?: () => void;
};

export type IUseCreateManyAPI = {
  page: number;
  showToastOptions: ShowToastOptions;
  onCancelRequest?: () => void;
};

export type IUseUpdateManyAPI = {
  page: number;
  showToastOptions: ShowToastOptions;
  onCancelRequest?: () => void;
};

export type IUseDeleteManyAPI = {
  page: number;
  showToastOptions: ShowToastOptions;
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

export type TUseOperationAPI<T, U> = {
  fetchAPI: MutationFunction<T, U>;
  shadcnUiToast: any;
  successMessage: (entity: T) => string;
  showToastOptions?: ShowToastOptions;
  enableRequestCancellation?: boolean;
  afterSuccess?: (entity: T) => void;
  afterFailed?: (error: HttpError<IErrorResponse | string>) => void;
  onCancelRequest?: () => void;
};

export type DecoupledCRUDFetch = {
  modelNameAsPlural: string;
  modelNameAsSingular: string;
  entityAPIs: any;
  enableRequestCancelation?: boolean;
};
