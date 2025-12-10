import { IEntityFilter } from "@/helpers/dtos/pagination.dto";
import { IErrorResponse } from "@/helpers/dtos/response.dto";
import { HttpError } from "@/helpers/errors/exceptions/http.exception";
import { MutationFunction } from "@tanstack/react-query";

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
