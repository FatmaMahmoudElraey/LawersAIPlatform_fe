import {
  QueryFunction,
  QueryKey,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { ShowToastOptions, TUseOperationAPI } from "./server.types";
import { IErrorResponse } from "@/helpers/dtos/response.dto";
import { HttpError } from "@/helpers/errors/exceptions/http.exception";
import { errorToast, loadingToast, successToast } from "./server.helper";
import { toast } from "sonner";

export const sharedShowToastOptions: ShowToastOptions = {
  loadingMessage: "Working Progress ...",
  failedToast: true,
  loadingToast: true,
  successToast: true,
};

export function useOperationAPI<IResponse, IOperationEntityDto>({
  fetchAPI,
  shadcnUiToast,
  showToastOptions = sharedShowToastOptions,
  successMessage,
  afterFailed,
  afterSuccess,
  enableRequestCancellation,
  onCancelRequest,
}: TUseOperationAPI<IResponse, IOperationEntityDto>) {
  let loadingToastId: number = 0;
  const controller = new AbortController();
  const mutation = useMutation<
    IResponse,
    HttpError<IErrorResponse | string>,
    IOperationEntityDto
  >({
    mutationFn: fetchAPI,
    onSuccess: (entity: IResponse, _, __) => {
      showToastOptions?.loadingToast && toast.dismiss(loadingToastId);

      if (!!afterSuccess) {
        afterSuccess(entity);
      }
      showToastOptions?.successToast && successToast(successMessage(entity));
    },
    onError: (error, _, __) => {
      showToastOptions?.loadingToast && toast.dismiss(loadingToastId);
      if (!!afterFailed) {
        afterFailed(error);
      }
      showToastOptions?.failedToast && errorToast(shadcnUiToast, error);
    },
  });

  if (mutation.isPending && showToastOptions.loadingToast) {
    loadingToastId = loadingToast({
      message: showToastOptions.loadingMessage,
      ...(enableRequestCancellation && {
        buttonActionProps: {
          action: () => {
            controller.abort();
            if (onCancelRequest) onCancelRequest();
          },
        },
      }),
    });
  }

  return mutation;
}

type TGetOperationAPI<T> = {
  queryKey: QueryKey;
  queryAPI: QueryFunction<T[], QueryKey, never>;
  isEnabled?: boolean;
};
export function useGetOperationAPI<TResponse>({
  queryKey,
  queryAPI,
  isEnabled = true,
}: TGetOperationAPI<TResponse>) {
  const query = useQuery<TResponse[], HttpError<IErrorResponse | string>>({
    queryKey,
    queryFn: queryAPI,
    enabled: isEnabled,
  });

  return query;
}

type TGetOneOperationAPI<T> = {
  queryKey: QueryKey;
  queryAPI: QueryFunction<T, QueryKey, never>;
  isEnabled?: boolean;
};
export function useGetOneOperationAPI<TResponse>({
  queryKey,
  queryAPI,
  isEnabled = true,
}: TGetOneOperationAPI<TResponse>) {
  const query = useQuery<TResponse, HttpError<IErrorResponse | string>>({
    queryKey,
    queryFn: queryAPI,
    enabled: isEnabled,
  });

  return query;
}
