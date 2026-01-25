"use client";

import {
  QueryFunction,
  QueryKey,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { HttpError } from "@/helpers/errors/exceptions/http.exception";
import {
  checkIfCashedData,
  errorToast,
  loadingToast,
  successToast,
} from "./server.helper";
import { toast } from "sonner";
import {
  DecoupledCreateUpdateDeleteFetch,
  DecoupledReadFetch,
  IUseOperationAPI,
  ShowToastOptions,
  TGetOneOperationAPI,
  TGetOperationAPI,
  TOperationAPI,
} from "./server.types";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { IUserAuth } from "@/helpers/security/auth/user.auth";
import { LocalStorageKeys } from "@/helpers/constants/local-storage.constant";
import { TOrderAPI, TRestoreAPI, TUpdateAPI } from "../types/fetch.types";
import {
  IErrorResponse,
  IGetSuccessResponse,
} from "@/helpers/dtos/response.dto";
import { IEntityFilter } from "@/helpers/dtos/pagination.dto";

export const sharedShowToastOptions: ShowToastOptions = {
  loadingMessage: "Working Progress ...",
  failedToast: true,
  loadingToast: true,
  successToast: true,
};

//#region CRUD operations

export function useCreateAPI<TCreateDto, TResponse>({
  page = 0,
  showToastOptions = sharedShowToastOptions,
  onCancelRequest,
  metaInfo,
  afterFailed,
  afterSuccess,
}: IUseOperationAPI<TResponse> & {
  metaInfo: DecoupledCreateUpdateDeleteFetch<TResponse, TCreateDto>;
}) {
  const {
    mutationFn,
    modelNameAsPlural,
    enableRequestCancelation,
    modelNameAsSingular,
  } = metaInfo;
  const queryClient = useQueryClient();

  let loadingToastId: number;
  const controller = new AbortController();
  const mutation = useMutation<
    TResponse,
    HttpError<IErrorResponse | string>,
    TCreateDto
  >({
    mutationFn: mutationFn,
    onSuccess: (createdEntity: TResponse, _, __) => {
      showToastOptions.loadingToast && toast.dismiss(loadingToastId);
      const cashedData = checkIfCashedData<TResponse>(
        queryClient,
        modelNameAsPlural,
        page
      );
      if (cashedData) {
        queryClient.setQueryData(
          page ? [modelNameAsPlural, page] : [modelNameAsPlural],
          (
            oldEntities?:
              | IGetSuccessResponse<TResponse>
              | {
                  pageParams: number[];
                  pages: IGetSuccessResponse<TResponse>[];
                }
          ) => {
            if (typeof oldEntities === "undefined") return [];

            let specificOldEntities;
            if (page !== 0) {
              queryClient.removeQueries({
                queryKey: [modelNameAsPlural, page],
              });
              queryClient.refetchQueries({
                queryKey: [modelNameAsPlural, page],
              });
            } else {
              specificOldEntities = oldEntities as {
                pageParams: number[];
                pages: IGetSuccessResponse<TResponse>[];
              };

              specificOldEntities?.pages[
                specificOldEntities?.pages?.length - 1
              ].data.push(createdEntity);
            }

            return specificOldEntities;
          }
        );
      }

      showToastOptions.successToast &&
        successToast(`${modelNameAsSingular} has created successfully`);

      if (afterSuccess) afterSuccess(createdEntity);
    },
    onError: (error, _, __) => {
      showToastOptions.loadingToast && toast.dismiss(loadingToastId);
      showToastOptions.failedToast && errorToast(error);
      if (afterFailed) afterFailed(error);
    },
  });

  if (mutation.isPending && showToastOptions.loadingToast)
    loadingToastId = loadingToast({
      message: showToastOptions.loadingMessage,
      ...(enableRequestCancelation && {
        buttonActionProps: {
          action: () => {
            controller.abort();
            if (onCancelRequest) onCancelRequest();
          },
        },
      }),
    });
  return mutation;
}

export function useUpdateAPI<TUpdateDto, TResponse>({
  page = 0,
  showToastOptions = sharedShowToastOptions,
  onCancelRequest,
  metaInfo,
  afterFailed,
  afterSuccess,
}: IUseOperationAPI<TResponse> & {
  metaInfo: DecoupledCreateUpdateDeleteFetch<TResponse, TUpdateDto>;
}) {
  const {
    mutationFn,
    modelNameAsPlural,
    enableRequestCancelation,
    modelNameAsSingular,
  } = metaInfo;
  const queryClient = useQueryClient();

  let loadingToastId: number;
  const controller = new AbortController();
  const mutation = useMutation<
    TResponse,
    HttpError<IErrorResponse | string>,
    TUpdateDto
  >({
    mutationFn: mutationFn,
    onSuccess: (updatedEntity: TResponse, _, __) => {
      showToastOptions.loadingToast && toast.dismiss(loadingToastId);
      const cashedData = checkIfCashedData<TResponse>(
        queryClient,
        modelNameAsPlural,
        page
      );

      if (cashedData) {
        queryClient.setQueryData(
          page ? [modelNameAsPlural, page] : [modelNameAsPlural],
          (
            oldEntities?:
              | IGetSuccessResponse<TResponse>
              | {
                  pageParams: number[];
                  pages: IGetSuccessResponse<TResponse>[];
                }
          ) => {
            if (typeof oldEntities === "undefined") return [];

            let specificOldEntities;
            if (page !== 0) {
              specificOldEntities =
                oldEntities as IGetSuccessResponse<TResponse>;
              specificOldEntities.data = specificOldEntities.data.map(
                (entity: any) =>
                  entity.id === (updatedEntity as any).id
                    ? updatedEntity
                    : entity
              );
            } else {
              specificOldEntities = oldEntities as {
                pageParams: number[];
                pages: IGetSuccessResponse<TResponse>[];
              };
              specificOldEntities?.pages.forEach((page) => {
                page!.data =
                  page?.data.map((entity: any) =>
                    entity.id === (updatedEntity as any).id
                      ? updatedEntity
                      : entity
                  ) || [];
              });
            }

            return specificOldEntities;
          }
        );
      }

      showToastOptions.successToast &&
        successToast(`${modelNameAsSingular} has updated successfully`);
      if (afterSuccess) afterSuccess(updatedEntity);
    },
    onError: (error, _, __) => {
      showToastOptions.loadingToast && toast.dismiss(loadingToastId);
      showToastOptions.failedToast && errorToast(error);
      if (afterFailed) afterFailed(error);
    },
  });

  if (mutation.isPending && showToastOptions.loadingToast)
    loadingToastId = loadingToast({
      message: showToastOptions.loadingMessage,
      ...(enableRequestCancelation && {
        buttonActionProps: {
          action: () => {
            controller.abort();
            if (onCancelRequest) onCancelRequest();
          },
        },
      }),
    });
  return mutation;
}

export function useDeleteAPI<TResponse>({
  page = 0,
  showToastOptions = sharedShowToastOptions,
  onCancelRequest,
  metaInfo,
  afterFailed,
  afterSuccess,
}: IUseOperationAPI<TResponse> & {
  metaInfo: DecoupledCreateUpdateDeleteFetch<TResponse, number>;
}) {
  const {
    mutationFn,
    modelNameAsPlural,
    enableRequestCancelation,
    modelNameAsSingular,
  } = metaInfo;
  const queryClient = useQueryClient();

  let loadingToastId: number;
  const controller = new AbortController();
  const mutation = useMutation<
    TResponse,
    HttpError<IErrorResponse | string>,
    number
  >({
    mutationFn: mutationFn,
    onSuccess: (deletedEntity: TResponse, _, __) => {
      showToastOptions.loadingToast && toast.dismiss(loadingToastId);
      const cashedData = checkIfCashedData<TResponse>(
        queryClient,
        modelNameAsPlural,
        page
      );

      if (cashedData) {
        queryClient.setQueryData(
          page ? [modelNameAsPlural, page] : [modelNameAsPlural],
          (
            oldEntities?:
              | IGetSuccessResponse<TResponse>
              | {
                  pageParams: number[];
                  pages: IGetSuccessResponse<TResponse>[];
                }
          ) => {
            if (typeof oldEntities === "undefined") return [];

            if (page !== 0) {
              queryClient.removeQueries({
                queryKey: [modelNameAsPlural, page],
              });
              queryClient.refetchQueries({
                queryKey: [modelNameAsPlural, page],
              });
            } else {
              const specificOldEntities = oldEntities as {
                pageParams: number[];
                pages: IGetSuccessResponse<TResponse>[];
              };

              specificOldEntities?.pages.forEach((page) => {
                page!.data =
                  page?.data.filter(
                    (entity: any) => entity.id !== (deletedEntity as any).id
                  ) || [];
              });
            }

            return oldEntities;
          }
        );
      }

      showToastOptions.successToast &&
        successToast(`${modelNameAsSingular} has deleted successfully`);

      if (afterSuccess) afterSuccess(deletedEntity);
    },
    onError: (error, _, __) => {
      showToastOptions.failedToast && toast.dismiss(loadingToastId);
      showToastOptions.failedToast && errorToast(error);
      if (afterFailed) afterFailed(error);
    },
  });

  if (mutation.isPending && showToastOptions.loadingToast)
    loadingToastId = loadingToast({
      message: showToastOptions.loadingMessage,
      ...(enableRequestCancelation && {
        buttonActionProps: {
          action: () => {
            controller.abort();
            if (onCancelRequest) onCancelRequest();
          },
        },
      }),
    });
  return mutation;
}

export function useGet<TReadDto, TResponse>(
  infoPagination: IEntityFilter<TReadDto>,
  isEnabled = true,
  metaInfo: DecoupledReadFetch<IGetSuccessResponse<TResponse>>
) {
  const { queryFn, modelNameAsPlural } = metaInfo;

  const page = infoPagination?.pagination?.page ?? 1;

  const query = useQuery<
    IGetSuccessResponse<TResponse>,
    HttpError<IErrorResponse | string>
  >({
    queryKey: [
      modelNameAsPlural,
      page,
      //  { ...infoPagination.filter }
    ],
    queryFn: queryFn,
    enabled: isEnabled,
  });
  return query;
}

export function useInfiniteGetAPI<TReadDto, TResponse>(
  infoPagination: IEntityFilter<TReadDto>,
  isEnabled = true,
  metaInfo: DecoupledReadFetch<IGetSuccessResponse<TResponse>>
) {
  const { queryFn, modelNameAsPlural } = metaInfo;
  const query = useInfiniteQuery<
    IGetSuccessResponse<TResponse>,
    HttpError<IErrorResponse | string>
  >({
    queryKey: [
      modelNameAsPlural,
      // { ...infoPagination.filter }
    ],
    queryFn: queryFn as any,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      let totalPages = lastPage.meta.count / infoPagination!.pagination!.limit!;
      totalPages =
        totalPages % 1 != 0 ? Math.floor(totalPages) + 1 : totalPages;
      const currentPage = lastPage!.meta?.page;

      currentPage < totalPages ? currentPage + 1 : null;
    },
    enabled: isEnabled,
    //   maxPages:
    //     entityAPIs
    //       .get(pagination, userAuth.token)
    //       .then((response) => response.meta.count) || undefined,
  });

  return query;
}

// export function useReorderAPI<TResponse>({
//   page = 0,
//   showToastOptions = sharedShowToastOptions,
//   onCancelRequest,
//   metaInfo,
// }: IUseReorderAPI & { metaInfo: DecoupledCRUDFetch }) {
//   const {
//     entityAPIs,
//     modelNameAsPlural,
//     modelNameAsSingular,
//     enableRequestCancelation,
//   } = metaInfo;

//   let loadingToastId: number;
//   const controller = new AbortController();
//   const queryClient = useQueryClient();
//   const shadcnUiToast = useToast();
//   const [auth, _] = useLocalStorage<IUserAuth>(LocalStorageKeys.UserAuth);

//   const mutation = useMutation<
//     TResponse,
//     HttpError<IErrorResponse | string>,
//     TOrderAPI
//   >({
//     mutationFn: ({ id, order }) =>
//       entityAPIs.reorder({
//         id,
//         order,
//         token: auth.token,
//         ...(enableRequestCancelation && { signal: controller.signal }),
//       }),
//     onSuccess: (reorderedEntity: TResponse, _, __) => {
//       showToastOptions.loadingToast && toast.dismiss(loadingToastId);

//       const cashedData = checkIfCashedData<TResponse>(
//         queryClient,
//         modelNameAsPlural,
//         page
//       );

//       if (cashedData) {
//         queryClient.setQueryData(
//           page ? [modelNameAsPlural, page] : [modelNameAsPlural],
//           (
//             oldEntities?:
//               | IGetSuccessResponse<TResponse>
//               | {
//                   pageParams: number[];
//                   pages: IGetSuccessResponse<TResponse>[];
//                 }
//           ) => {
//             if (typeof oldEntities === "undefined") return [];

//             let specificOldEntities;
//             if (page !== 0) {
//               specificOldEntities =
//                 oldEntities as IGetSuccessResponse<TResponse>;
//               specificOldEntities.data = specificOldEntities.data.map(
//                 (entity: any) =>
//                   entity.id === (reorderedEntity as any).id
//                     ? reorderedEntity
//                     : entity
//               );
//             } else {
//               specificOldEntities = oldEntities as {
//                 pageParams: number[];
//                 pages: IGetSuccessResponse<TResponse>[];
//               };
//               specificOldEntities?.pages.forEach((page) => {
//                 page!.data =
//                   page?.data.map((entity: any) =>
//                     entity.id === (reorderedEntity as any).id
//                       ? reorderedEntity
//                       : entity
//                   ) || [];
//               });
//             }

//             return specificOldEntities;
//           }
//         );
//       }

//       showToastOptions.successToast &&
//         successToast(`${modelNameAsSingular} has restored successfully`);
//     },
//     onError: (error, _, __) => {
//       showToastOptions.failedToast && toast.dismiss(loadingToastId);
//       errorToast(shadcnUiToast, error);
//     },
//   });

//   if (mutation.isPending && showToastOptions.loadingToast)
//     loadingToastId = loadingToast({
//       message: showToastOptions.loadingMessage,
//       ...(enableRequestCancelation && {
//         buttonActionProps: {
//           action: () => {
//             controller.abort();
//             if (onCancelRequest) onCancelRequest();
//           },
//         },
//       }),
//     });
//   return mutation;
// }

// export function useRestoreAPI<TResponse>({
//   page = 0,
//   showToastOptions = sharedShowToastOptions,
//   onCancelRequest,
//   metaInfo,
// }: IUseUpdateAPI & { metaInfo: DecoupledCRUDFetch }) {
//   const {
//     entityAPIs,
//     modelNameAsPlural,
//     modelNameAsSingular,
//     enableRequestCancelation,
//   } = metaInfo;
//   let loadingToastId: number;
//   const [auth, _] = useLocalStorage<IUserAuth>(LocalStorageKeys.UserAuth);
//   const queryClient = useQueryClient();
//   const shadcnUiToast = useToast();
//   const controller = new AbortController();

//   const mutation = useMutation<
//     TResponse,
//     HttpError<IErrorResponse | string>,
//     TRestoreAPI
//   >({
//     mutationFn: ({ id }) =>
//       entityAPIs.restore({
//         id,
//         token: auth.token,
//         ...(enableRequestCancelation && { signal: controller.signal }),
//       }),
//     onSuccess: (restoredEntity: TResponse, _, __) => {
//       showToastOptions.loadingToast && toast.dismiss(loadingToastId);
//       const cashedData = checkIfCashedData<TResponse>(
//         queryClient,
//         modelNameAsPlural,
//         page
//       );

//       if (cashedData) {
//         queryClient.setQueryData(
//           page ? [modelNameAsPlural, page] : [modelNameAsPlural],
//           (
//             oldEntities?:
//               | IGetSuccessResponse<TResponse>
//               | {
//                   pageParams: number[];
//                   pages: IGetSuccessResponse<TResponse>[];
//                 }
//           ) => {
//             if (typeof oldEntities === "undefined") return [];

//             let specificOldEntities;
//             if (page !== 0) {
//               specificOldEntities =
//                 oldEntities as IGetSuccessResponse<TResponse>;
//               specificOldEntities.data = specificOldEntities.data.map(
//                 (entity: any) =>
//                   entity.id === (restoredEntity as any).id
//                     ? restoredEntity
//                     : entity
//               );
//             } else {
//               specificOldEntities = oldEntities as {
//                 pageParams: number[];
//                 pages: IGetSuccessResponse<TResponse>[];
//               };
//               specificOldEntities?.pages.forEach((page) => {
//                 page!.data =
//                   page?.data.map((entity: any) =>
//                     entity.id === (restoredEntity as any).id
//                       ? restoredEntity
//                       : entity
//                   ) || [];
//               });
//             }

//             return specificOldEntities;
//           }
//         );
//       }

//       showToastOptions.successToast &&
//         successToast(`${modelNameAsSingular} has restored successfully`);
//     },
//     onError: (error, _, __) => {
//       showToastOptions.loadingToast && toast.dismiss(loadingToastId);
//       showToastOptions.failedToast && errorToast(shadcnUiToast, error);
//     },
//   });

//   if (mutation.isPending && showToastOptions.loadingToast)
//     loadingToastId = loadingToast({
//       message: showToastOptions.loadingMessage,
//       ...(enableRequestCancelation && {
//         buttonActionProps: {
//           action: () => {
//             controller.abort();
//             if (onCancelRequest) onCancelRequest();
//           },
//         },
//       }),
//     });
//   return mutation;
// }

//#endregion

export function useOperationAPI<IResponse, IOperationEntityDto>({
  operationAPI,
  // shadcnUiToast,
  showToastOptions = sharedShowToastOptions,
  successMessage,
  afterFailed,
  afterSuccess,
  enableRequestCancellation,
  onCancelRequest,
}: TOperationAPI<IResponse, IOperationEntityDto>) {
  let loadingToastId: number = 0;
  const controller = new AbortController();
  const mutation = useMutation<
    IResponse,
    HttpError<IErrorResponse | string>,
    IOperationEntityDto
  >({
    mutationFn: operationAPI,
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
      showToastOptions?.failedToast && errorToast(error);
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
