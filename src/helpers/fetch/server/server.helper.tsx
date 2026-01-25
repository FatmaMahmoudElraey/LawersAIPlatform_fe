"use client";
import { Spinner } from "@/components/ui/spinner";
import { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { IErrorResponse, IGetSuccessResponse } from "../../dtos/response.dto";
import { HttpError } from "../../errors/exceptions/http.exception";

export function errorValidationInputToast(shadcnUiToast: any, err: any) {
  console.log(err);
  shadcnUiToast({
    className: "p-4 pb-6",
    duration: Infinity,
    title: "Details:",
    description: (
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(err)}</code>
      </pre>
    ),
  });
}

export function errorToast(err: HttpError<IErrorResponse | string> | null) {
  if (!!err) {
    const isValidationError =
      typeof err.fullMessage !== "string" &&
      Array.isArray(err.fullMessage.message);
    // isValidationError &&
    //   errorValidationInputToast(
    //     shadcnUiToast,
    //     (err.fullMessage as IErrorResponse).message
    //   );

    const showErrorMessage = () => {
      if (isValidationError) {
        return "Validation  Error";
      } else {
        if (typeof err.fullMessage === "string") {
          return err.fullMessage;
        } else {
          return err.fullMessage.message;
        }
      }
    };

    toast.error("Failed", {
      description: showErrorMessage(),
      className: "rounded-md",
    });
  } else {
    toast.error("Unknown error");
  }
}

export function successToast(description: string) {
  toast.success("Success", {
    description,
    className: "rounded-md",
  });
}

type TLoadingToast = {
  message: string;
  buttonActionProps?: { label?: string; action: () => void };
};
export function loadingToast({ message, buttonActionProps }: TLoadingToast) {
  return toast.info(message, {
    ...(buttonActionProps && {
      action: {
        label: buttonActionProps.label ?? "cancel",
        onClick: buttonActionProps.action,
      },
    }),
    closeButton: true,
    duration: Infinity,
    icon: <Spinner color={`#509CE7`} size={"extraSmall"} />,
    className: "rounded-md",
  }) as number;
}

export function checkIfCashedData<T>(
  queryClient: QueryClient,
  modelNameAsPlural: string,
  page: number
) {
  return queryClient.getQueryData<T[]>(
    page !== 0 ? [modelNameAsPlural, page] : [modelNameAsPlural]
  );
}
