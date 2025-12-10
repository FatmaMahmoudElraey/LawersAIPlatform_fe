"use client";

import {
  Control,
  ControllerRenderProps,
  FieldValues,
  Path,
  UseFormRegisterReturn,
  UseFormReturn,
} from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { ISelectProps } from "../select/select";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "../ui/select";
import { IRadioGroupProps } from "../radio-group/radio-group";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { cn } from "@/lib/utils";
import { ICheckboxProps } from "../checkbox/checkbox";
import { Checkbox } from "../ui/checkbox";
import { IInput } from "../input/input";
import {
  GapX,
  GapY,
  LargeScreenCol,
  MediumScreenCol,
  SmallScreenCol,
} from "../shared/grid-props";
import {
  ButtonWidth as ButtonStretch,
  RoundedButton,
} from "../shared/button-props";
import { Button } from "../ui/button";
import { LogicError } from "@/helpers/errors/exceptions/login.exception";
import {
  act,
  ChangeEvent,
  ChangeEventHandler,
  Fragment,
  useState,
} from "react";
import React, { Dispatch, SetStateAction } from "react";
import { Spinner } from "../ui/spinner";
import {
  IActualWidthScreenSizes,
  useActualWidth,
} from "@/hooks/use-actual-width";
import { Textarea } from "../ui/textarea";
import { CheckedState } from "@radix-ui/react-checkbox";
import { IDatePicker } from "../date-picker/date-picker";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon, UploadIcon, X } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { SelectSingleEventHandler } from "react-day-picker";
import { LabelLocated } from "../shared/input";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "../dropzone/dropzone";
import Image, { StaticImageData } from "next/image";
import fileImage from "@/assets/images/file-image.png";

interface IBaseFormProps<T extends FieldValues> {
  control: Control<T>;
  name: string;
  // label: string;
  required?: boolean;
  description?: string | React.ReactNode;
  errors?: string[];
}

interface IFormInput<T extends FieldValues> extends IBaseFormProps<T> {
  input: Omit<IInput, "value" | "id" | "onChange"> &
    IActualWidthScreenSizes & {
      onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    };
}
export function FormInput<T extends FieldValues>({
  control,
  name,
  required = true,
  description,
  errors,
  input: {
    onChange,
    type = "text",
    label,
    labelLocated = "above",
    width,
    largeScreenWidth,
    smallScreenWidth,
    placeholder,
    defaultValue,
  },
}: IFormInput<T>) {
  const defaultInputValue = defaultValue ? { defaultValue: defaultValue } : {};
  const { actualWidth } = useActualWidth({
    width,
    largeScreenWidth,
    smallScreenWidth,
  });
  const inputWidth = width ? { style: { width: actualWidth } } : {};
  const [actualErrors, setActualErrors] = useState<string[] | undefined>(
    errors
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const { onChange: onChangeField, ...restField } = field;

        return (
          <FormItem>
            <div
              className={cn(
                "flex",
                labelLocated === "aside"
                  ? "flex-row gap-1 items-center justify-start"
                  : "flex-col gap-1 justify-start items-start"
              )}
            >
              <FormLabel required={required} className="text-nowrap">
                {label}
              </FormLabel>
              <FormControl>
                <Input
                  type={type}
                  placeholder={placeholder}
                  onChange={(val) => {
                    if (onChange) onChange(val);
                    onChangeField(val);
                    setActualErrors(undefined);
                  }}
                  {...restField}
                  {...defaultInputValue}
                  {...inputWidth}
                />
              </FormControl>
            </div>

            <div className="flex flex-col gap-1">
              {description && <FormDescription>{description}</FormDescription>}
              {actualErrors && actualErrors?.length > 0 ? (
                <ul>
                  {actualErrors.map((err, i) => (
                    <p key={i} className="text-sm text-red-500">
                      {err}
                    </p>
                  ))}
                </ul>
              ) : (
                <FormMessage />
              )}
            </div>
          </FormItem>
        );
      }}
    />
  );
}

interface IFormFileInput<T extends FieldValues> extends IBaseFormProps<T> {
  input: Omit<IInput, "value" | "id" | "onChange" | "defaultValue" | "type">;
}
export function FormFileInput<T extends FieldValues>({
  control,
  name,
  required = true,
  description,
  errors,
  input: { labelLocated = "above", placeholder, label },
}: IFormFileInput<T>) {
  const [actualErrors, setActualErrors] = useState<string[] | undefined>(
    errors
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div
            className={cn(
              "flex",
              labelLocated === "aside" ? "flex-row gap-1" : "flex-col gap-1"
            )}
          >
            <FormLabel required={required}>{label}</FormLabel>
            <FormControl>
              <Input
                type="file"
                placeholder={placeholder}
                onChange={(event) => {
                  setActualErrors(undefined);
                  field.onChange(
                    event.target?.files?.item(0)
                      ? event.target?.files?.item(0)
                      : undefined
                  );
                }}
              />
            </FormControl>
          </div>

          <div className="flex flex-col gap-1.5">
            {description && <FormDescription>{description}</FormDescription>}
            {actualErrors && actualErrors?.length > 0 ? (
              <ul>
                {actualErrors.map((err, i) => (
                  <p key={i} className="text-sm text-red-500">
                    {err}
                  </p>
                ))}
              </ul>
            ) : (
              <FormMessage />
            )}
          </div>
        </FormItem>
      )}
    />
  );
}

interface IFormSelect<T extends FieldValues> extends IBaseFormProps<T> {
  select: Omit<ISelectProps, "value" | "onValueChange"> & {
    onValueChange?: (val: string) => void;
  };
}
export function FormSelect<T extends FieldValues>({
  control,
  name,
  select,
  description,
  errors,
  required = true,
}: IFormSelect<T>) {
  const defaultSelectValue = select.defaultValue
    ? { defaultValue: select.defaultValue }
    : {};
  const selectWidth = select?.width ? { style: { width: select?.width } } : {};
  const [actualErrors, setActualErrors] = useState<string[] | undefined>(
    errors
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div>
          <FormItem
            className={cn(
              "relative w-fit flex",
              select.labelLocated === "aside"
                ? "flex-row gap-1 items-center"
                : "flex-col gap-1"
            )}
          >
            <div className="flex flex-row gap-3">
              <FormLabel required={required}>{select.label}</FormLabel>

              {select?.isLoading && (
                <Spinner
                  // className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
                  size={"extraSmall"}
                />
              )}
            </div>
            <Select
              {...defaultSelectValue}
              onValueChange={(val) => {
                setActualErrors(undefined);
                field.onChange(val);
                if (select.onValueChange) select.onValueChange(val);
              }}
            >
              <FormControl>
                <SelectTrigger {...selectWidth} className="w-fit">
                  <SelectValue placeholder={select.placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {select.groups.map((group, i) => (
                  <SelectGroup key={i}>
                    {group?.label && <SelectLabel>{group.label}</SelectLabel>}
                    {group.items.map((item, j) => (
                      <SelectItem key={j} value={item.value}>
                        {item.content}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
            <div className="flex flex-col gap-1.5">
              {description && <FormDescription>{description}</FormDescription>}
              {actualErrors && actualErrors?.length > 0 ? (
                <ul>
                  {actualErrors.map((err, i) => (
                    <p key={i} className="text-sm text-red-500">
                      {err}
                    </p>
                  ))}
                </ul>
              ) : (
                <FormMessage />
              )}
            </div>
          </FormItem>

          {select.isLoading && (
            <Spinner
              className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
              size={"extraSmall"}
            />
          )}
        </div>
      )}
    />
  );
}

interface IFormRadioGroup<T extends FieldValues> extends IBaseFormProps<T> {
  radioGroup: Omit<IRadioGroupProps, "onValueChange" | "value"> & {
    onValueChange?: (value: string) => void;
  };
}
export function FormRadioGroup<T extends FieldValues>({
  control,
  name,
  required = true,
  description,
  errors,
  radioGroup: {
    direction = "horizontal",
    items,
    alignItems = "items-center",
    justifyContent = "justify-start",
    gap = "gap-1",
    label,
    defaultValue,
    onValueChange,
    labelLocated = "above",
  },
}: IFormRadioGroup<T>) {
  const defaultRadioGroupValue = defaultValue
    ? { defaultValue: defaultValue }
    : {};
  const [actualErrors, setActualErrors] = useState<string[] | undefined>(
    errors
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            "flex",
            labelLocated === "aside"
              ? "flex-row gap-1 items-center"
              : "flex-col gap-1 justify-start items-start"
          )}
        >
          <FormLabel required={required}>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={(val) => {
                setActualErrors(undefined);
                field.onChange(val);
                if (onValueChange) onValueChange(val);
              }}
              className={cn(
                "flex gap-1",
                direction === "horizontal"
                  ? "flex-row items-center"
                  : "flex-col  justify-start items-start",
                alignItems,
                justifyContent,
                gap
              )}
              {...defaultRadioGroupValue}
            >
              {items.map((item, i) => (
                <FormItem className="flex flex-row items-end gap-2" key={i}>
                  <FormControl>
                    <RadioGroupItem value={item.value} />
                  </FormControl>
                  <FormLabel className="font-normal">{item.content}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <div className="flex flex-col gap-1.5">
            {description && <FormDescription>{description}</FormDescription>}
            {actualErrors && actualErrors?.length > 0 ? (
              <ul>
                {actualErrors.map((err, i) => (
                  <p key={i} className="text-sm text-red-500">
                    {err}
                  </p>
                ))}
              </ul>
            ) : (
              <FormMessage />
            )}
          </div>
        </FormItem>
      )}
    />
  );
}

interface IFormCheckbox<T extends FieldValues>
  extends Omit<IBaseFormProps<T>, "label" | "description"> {
  checkbox: Omit<ICheckboxProps, "onCheckedChange" | "value" | "id"> & {
    onCheckedChange?: (checked: CheckedState) => void;
  };
}
export function FormCheckbox<T extends FieldValues>({
  control,
  checkbox: { isDisabled = false, ...restCheckboxProps },
  name,
  errors,
  required = true,
}: IFormCheckbox<T>) {
  const [actualErrors, setActualErrors] = useState<string[] | undefined>(
    errors
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="items-top flex flex-row gap-2">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={(val) => {
                setActualErrors(undefined);
                field.onChange(val);
                if (restCheckboxProps.onCheckedChange)
                  restCheckboxProps.onCheckedChange(val);
              }}
              disabled={isDisabled}
              defaultChecked={restCheckboxProps.defaultChecked}
            />
          </FormControl>
          <div className="flex flex-col gap-1.5 leading-none">
            <FormLabel required={required}>
              {restCheckboxProps.content}
            </FormLabel>
            {restCheckboxProps?.description && (
              <FormDescription>
                {restCheckboxProps?.description}
              </FormDescription>
            )}
            {actualErrors && actualErrors?.length > 0 ? (
              <ul>
                {actualErrors.map((err, i) => (
                  <p key={i} className="text-sm text-red-500">
                    {err}
                  </p>
                ))}
              </ul>
            ) : (
              <FormMessage />
            )}
          </div>
        </FormItem>
      )}
    />
  );
}

export interface ICheckBoxItemValue {
  value: string;
  checkState: CheckedState;
}
interface ICheckBoxItem {
  value: string;
  content: string;
  isChecked?: boolean;
  onCheckChange?: (checked: CheckedState) => void;
}
interface IFormCheckboxes<T extends FieldValues> extends IBaseFormProps<T> {
  label: string;
  checkBox: {
    items: ICheckBoxItem[];
    gapX?: GapX;
    gapY?: GapY;
    smallScreenCol?: SmallScreenCol;
    mediumScreenCol?: MediumScreenCol;
    LargeScreenCol?: LargeScreenCol;
  };
}
export function FormCheckboxes<T extends FieldValues>({
  control,
  name,
  description,
  label,
  required = true,
  errors,
  checkBox: {
    items,
    gapX = "gap-x-1",
    gapY = "gap-y-1",
    LargeScreenCol = "lg:grid-cols-1",
    smallScreenCol = "sm:grid-cols-1",
    mediumScreenCol = "md:grid-cols-1",
  },
}: IFormCheckboxes<T>) {
  const [actualErrors, setActualErrors] = useState<string[] | undefined>(
    errors
  );

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel className="text-base" required={required}>
            {label}
          </FormLabel>
          <div
            className={cn(
              "grid",
              gapX,
              gapY,
              LargeScreenCol,
              smallScreenCol,
              mediumScreenCol
            )}
          >
            {items.map((item, i) => (
              <FormField
                key={i}
                control={control}
                name={name}
                render={({ field }) => {
                  return (
                    <FormItem
                      key={i}
                      className="flex flex-row items-end gap-2 justify-left"
                    >
                      <FormControl className="align-top">
                        <Checkbox
                          defaultChecked={item?.isChecked}
                          onCheckedChange={(checked) => {
                            setActualErrors(undefined);

                            if (field.value && field.value?.length > 0) {
                              const isItemAlreadyExist = (
                                field.value as ICheckBoxItemValue[]
                              ).find((val) => val.value === item.value);

                              if (isItemAlreadyExist) {
                                field.onChange([
                                  ...(
                                    field.value as ICheckBoxItemValue[]
                                  ).filter((val) => val.value !== item.value),
                                  {
                                    value: item.value,
                                    checkState: checked as boolean,
                                  } as ICheckBoxItemValue,
                                ]);
                              } else {
                                field.onChange([
                                  ...field.value,
                                  {
                                    value: item.value,
                                    checkState: checked as boolean,
                                  } as ICheckBoxItemValue,
                                ]);
                              }
                            } else {
                              field.onChange([
                                {
                                  value: item.value,
                                  checkState: checked as boolean,
                                } as ICheckBoxItemValue,
                              ]);
                            }
                            if (item.onCheckChange) {
                              item.onCheckChange(checked);
                            }
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {item.content}
                      </FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
          <div className="flex flex-col gap-1.5">
            {description && <FormDescription>{description}</FormDescription>}
            {actualErrors && actualErrors?.length > 0 ? (
              <ul>
                {actualErrors.map((err, i) => (
                  <p key={i} className="text-sm text-red-500">
                    {err}
                  </p>
                ))}
              </ul>
            ) : (
              <FormMessage />
            )}
          </div>
        </FormItem>
      )}
    />
  );
}

interface ITextArea {
  labelLocated?: LabelLocated;
  label: string;
  placeholder: string;
  defaultValue?: string;
  onChange?: (val: ChangeEvent<HTMLTextAreaElement>) => void;
  height: number;
  maxHeight: number;
}
interface IFormTextArea<T extends FieldValues> extends IBaseFormProps<T> {
  textArea: ITextArea & IActualWidthScreenSizes;
}
export function FormTextArea<T extends FieldValues>({
  control,
  required,
  description,
  name,
  errors,
  textArea: {
    label,
    height,
    maxHeight,
    labelLocated = "above",
    placeholder,
    largeScreenWidth,
    smallScreenWidth,
    width,
    defaultValue,
    onChange,
  },
}: IFormTextArea<T>) {
  const defaultInputValue = defaultValue ? { defaultValue: defaultValue } : {};
  const { actualWidth } = useActualWidth({
    width,
    largeScreenWidth,
    smallScreenWidth,
  });
  const inputStyle = {
    style: {
      ...(width && { width: actualWidth }),
      height,
      maxHeight,
    },
  };

  const [actualErrors, setActualErrors] = useState<string[] | undefined>(
    errors
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const { onChange: onChangeField, ...restField } = field;

        return (
          <FormItem
            className={cn(
              "flex",
              labelLocated === "aside"
                ? "flex-row gap-1 items-center justify-start"
                : "flex-col gap-1 justify-start items-start"
            )}
          >
            <FormLabel required={required}>{label}</FormLabel>
            <FormControl>
              <Textarea
                // className="resize-none"
                onChange={(val) => {
                  setActualErrors(undefined);
                  onChangeField(val);
                  if (onChange) onChange(val);
                }}
                placeholder={placeholder}
                {...defaultInputValue}
                {...inputStyle}
                {...restField}
              />
            </FormControl>
            <div className="flex flex-col gap-1.5">
              {description && <FormDescription>{description}</FormDescription>}
              <FormMessage />
            </div>
            {actualErrors && actualErrors?.length > 0 ? (
              <ul>
                {actualErrors.map((err, i) => (
                  <p key={i} className="text-sm text-red-500">
                    {err}
                  </p>
                ))}
              </ul>
            ) : (
              <FormMessage />
            )}
          </FormItem>
        );
      }}
    />
  );
}

export type mediaFileAcceptType = "images/*" | "video/*" | "audio/*";

interface IFormFileDropZone<T extends FieldValues> extends IBaseFormProps<T> {
  minSize?: number;
  maxSize?: number;
  maxFiles?: number;
  acceptFiles?: { [mediaFileType: string]: string[] };
  errors?: string[];
  label: string;
  emptyStateContent?: React.ReactNode;
  onError: ((err: Error) => void) | undefined;
}
export function DefaultEmptyStateDropZone({
  defaultImageUrl,
  allowedFiles,
  maxFileSizeInMB,
  minFileSizeInMB,
}: {
  defaultImageUrl?: any;
  allowedFiles?: string[];
  maxFileSizeInMB?: number;
  minFileSizeInMB?: number;
}) {
  return (
    <div className="flex flex-col w-full items-center justify-center gap-4 p-8">
      <div className="text-center">
        {defaultImageUrl ? (
          <div className="flex flex-row justify-center">
            <Image
              src={defaultImageUrl}
              alt="default_image"
              width={100}
              height={100}
              className="self-center"
            />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="flex size-16 items-center justify-center rounded-lg bg-muted text-muted-foreground">
              <UploadIcon size={24} />
            </div>
            <p className="font-medium text-sm">Upload a file</p>
          </div>
        )}

        <p className="text-muted-foreground text-xs mt-3">
          Drag and drop or click to upload
        </p>
        {allowedFiles && allowedFiles.length > 0 && (
          <p className="text-muted-foreground text-xs">
            Allowed Files' Types: {allowedFiles.join(", ")}
          </p>
        )}
        {minFileSizeInMB && (
          <p className="text-muted-foreground text-xs">
            Min File Size: {minFileSizeInMB} (MB)
          </p>
        )}
        {maxFileSizeInMB && (
          <p className="text-muted-foreground text-xs">
            Max File Size: {maxFileSizeInMB} (MB)
          </p>
        )}
      </div>
    </div>
  );
}
export function FormFileDropZone<T extends FieldValues>({
  errors,
  name,
  control,
  description,
  required,
  label,

  emptyStateContent,
  acceptFiles,
  maxFiles = 1,
  minSize = 1024 * 1024 * 1024, // 1 GB (To allow any min file size)
  maxSize = 1024 * 1024 * 20, // 20 MG
  onError,
}: IFormFileDropZone<T>) {
  const [actualErrors, setActualErrors] = useState<string[] | undefined>(
    errors
  );

  // const acceptedMediaFiles = acceptFiles ? { accept: acceptFiles } : {};

  const [files, setFiles] = useState<File[] | undefined>();
  const [filePreview, setFilePreview] = useState<string | undefined>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel required={required}>{label}</FormLabel>
            <FormControl>
              <div className="relative">
                {files && files.length > 0 && (
                  <Button
                    className="rounded-full absolute top-0 right-0 z-50 w-[30px] h-[30px]"
                    onClick={() => {
                      field.onChange(undefined);
                      setFiles(undefined);
                      setFilePreview(undefined);
                    }}
                  >
                    <X />
                  </Button>
                )}
                <Dropzone
                  className="border-dashed bg-gray-300 border-primary"
                  // {...acceptedMediaFiles}
                  maxFiles={maxFiles}
                  accept={acceptFiles}
                  maxSize={maxSize}
                  minSize={minSize}
                  onDrop={(files) => {
                    setActualErrors(undefined);
                    setFiles(files);

                    if (files.length > 0) {
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        if (typeof e.target?.result === "string") {
                          setFilePreview(e.target?.result);
                        }
                      };
                      reader.readAsDataURL(files[0]);
                    }

                    field.onChange(files[0]);
                  }}
                  onError={onError}
                  src={files}
                >
                  {emptyStateContent && (
                    <DropzoneEmptyState>{emptyStateContent}</DropzoneEmptyState>
                  )}
                  <DropzoneContent>
                    {filePreview && (
                      <div className="h-[102px] w-full">
                        <img
                          alt="Preview"
                          className="absolute top-0 left-0 h-full w-full object-contain"
                          src={filePreview}
                        />
                      </div>
                    )}
                  </DropzoneContent>
                </Dropzone>
              </div>
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            {actualErrors && actualErrors?.length > 0 ? (
              <ul>
                {actualErrors.map((err, i) => (
                  <p key={i} className="text-sm text-red-500">
                    {err}
                  </p>
                ))}
              </ul>
            ) : (
              <FormMessage />
            )}
          </FormItem>
        );
      }}
    />
  );
}

interface IFormFormMultiFiles<T extends FieldValues> extends IBaseFormProps<T> {
  acceptedFiles?: string;
  label: string;
}
export function FormMultiFiles<T extends FieldValues>({
  control,
  label,
  name,
  description,
  errors,
  required,
  acceptedFiles = "",
}: IFormFormMultiFiles<T>) {
  const [actualErrors, setActualErrors] = useState<string[] | undefined>(
    errors
  );
  const [filesPreview, setFilesPreview] = useState<
    { url: StaticImageData | string; id: number }[] | undefined
  >(undefined);
  const [files, setFiles] = useState<
    { id: number; file: File }[] | undefined
  >();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel required={required}>{label}</FormLabel>
            <FormControl>
              <Fragment>
                <label
                  htmlFor="file-input"
                  className="bg-primary p-2 text-white dark:text-black rounded-md text-sm flex flex-row gap-2 w-fit cursor-pointer m-0"
                >
                  <UploadIcon size={16} />
                  Select File
                </label>
                <input
                  id="file-input"
                  type="file"
                  style={{ display: "none" }}
                  accept={acceptedFiles}
                  onChange={(e) => {
                    setActualErrors(undefined);
                    setFiles((old) => [
                      ...(old ?? []),
                      {
                        id: files ? files.length + 1 : 1,
                        file: e.target.files![0],
                      },
                    ]);

                    console.log(e.target.files);

                    if (e.target.files![0].type.split("/")[0] !== "image") {
                      setFilesPreview((old) => [
                        ...(old ?? []),
                        {
                          id: filesPreview ? filesPreview?.length + 1 : 1,
                          url: fileImage,
                        },
                      ]);
                    } else if (e.target.files!.length > 0) {
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        if (typeof e.target?.result === "string") {
                          setFilesPreview((old) => [
                            ...(old ?? []),
                            {
                              id: filesPreview ? filesPreview?.length + 1 : 1,
                              url: e.target?.result as any,
                            },
                          ]);
                        }
                      };
                      reader.readAsDataURL(e.target.files![0]);
                    }

                    field.onChange([
                      ...(files
                        ? files?.map((item) => ({
                            id: item.id,
                            file: item.file,
                          }))
                        : []),
                      {
                        id: files ? files?.length + 1 : 1,
                        file: e.target.files![0],
                      },
                    ]);
                  }}
                />

                {filesPreview && filesPreview.length > 0 && (
                  <div className="flex flex-row gap-2 flex-wrap">
                    {filesPreview.map((filePreview) => (
                      <div
                        className="border p-3 relative rounded-md"
                        key={filePreview.id}
                      >
                        <Button
                          className="rounded-full absolute top-0 right-0 z-50 w-[30px] h-[30px] scale-75"
                          onClick={() => {
                            field.onChange(
                              files?.filter(
                                (item) => item.id !== filePreview.id
                              )
                            );
                            setFiles((old) => [
                              ...old!.filter(
                                (item) => item.id !== filePreview.id
                              ),
                            ]);
                            setFilesPreview((old) => [
                              ...old!.filter(
                                (item) => item.id !== filePreview.id
                              ),
                            ]);
                          }}
                        >
                          <X size={8} />
                        </Button>
                        <Image
                          width={80}
                          height={160}
                          src={filePreview.url}
                          alt=""
                        />
                      </div>
                    ))}
                  </div>
                )}
              </Fragment>
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            {actualErrors && actualErrors?.length > 0 ? (
              <ul>
                {actualErrors.map((err, i) => (
                  <p key={i} className="text-sm text-red-500">
                    {err}
                  </p>
                ))}
              </ul>
            ) : (
              <FormMessage />
            )}
          </FormItem>
        );
      }}
    />
  );
}

interface IFormDatePicker<T extends FieldValues> extends IBaseFormProps<T> {
  datePicker: Omit<IDatePicker, "onSelect" | "date"> & {
    onSelect?: SelectSingleEventHandler;
  };
}
export function FormDatePicker<T extends FieldValues>({
  control,
  name,
  description,
  required,
  datePicker,
  errors,
}: IFormDatePicker<T>) {
  const defaultDatePickerValue = datePicker.defaultValue
    ? { defaultValue: datePicker.defaultValue }
    : {};
  const datePicketProps =
    datePicker.disabled ||
    datePicker.fromMonth ||
    datePicker.fromYear ||
    datePicker.toMonth ||
    datePicker.toYear
      ? {
          ...(datePicker.disabled && { disabled: datePicker.disabled }),
          ...(datePicker.fromMonth && { fromMonth: datePicker.fromMonth }),
          ...(datePicker.fromYear && { fromYear: datePicker.fromYear }),
          ...(datePicker.toMonth && { toMonth: datePicker.toMonth }),
          ...(datePicker.toYear && { toYear: datePicker.toYear }),
        }
      : {};

  const [actualErrors, setActualErrors] = useState<string[] | undefined>(
    errors
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            "flex",
            datePicker.labelLocated === "aside"
              ? "flex-row gap-1 items-center justify-start"
              : "flex-col gap-1 justify-start items-start"
          )}
        >
          <FormLabel required={required}>{datePicker.label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "DD-MM-YYYY")
                  ) : (
                    <span>{datePicker.placeholder}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto flex flex-col space-y-2 p-2"
              align="start"
            >
              {datePicker?.presetSelect && (
                <Select onValueChange={datePicker?.presetSelect.onValueChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {datePicker.presetSelect.items.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.content}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              <div
                className={cn(
                  datePicker?.presetSelect ? "rounded-md border" : ""
                )}
              >
                <Calendar
                  // initialFocus
                  mode="single"
                  selected={field.value}
                  onSelect={(val, selectedDate, activeModifiers, e) => {
                    setActualErrors(undefined);
                    field.onChange(val);
                    if (datePicker.onSelect)
                      datePicker.onSelect(
                        val,
                        selectedDate,
                        activeModifiers,
                        e
                      );
                  }}
                  {...datePicketProps}
                  {...defaultDatePickerValue}
                  // disabled={(date) =>
                  //   date > new Date() || date < new Date('1900-01-01')
                  // }
                />
              </div>
            </PopoverContent>
          </Popover>
          <div className="flex flex-col gap-1.5">
            {description && <FormDescription>{description}</FormDescription>}
            {actualErrors && actualErrors?.length > 0 ? (
              <ul>
                {actualErrors.map((err, i) => (
                  <p key={i} className="text-sm text-red-500">
                    {err}
                  </p>
                ))}
              </ul>
            ) : (
              <FormMessage />
            )}
          </div>
        </FormItem>
      )}
    />
  );
}

interface IFormFields<T extends FieldValues> {
  form: UseFormReturn<T, any, undefined>;
  onSubmit: (data: T) => void;
  gapX?: GapX;
  gapY?: GapY;
  smallScreenCol?: SmallScreenCol;
  mediumScreenCol?: MediumScreenCol;
  LargeScreenCol?: LargeScreenCol;
  fields: (() => React.ReactNode)[]; //  You must use one of these components: FormInput || FormSelect || FormRadioGroup || FormCheckbox
  buttonProps: {
    rounded?: RoundedButton;
    buttonStretch?: ButtonStretch;
    content: string | React.ReactNode;
    isDisabled: boolean;
  };
}
export function FormFields<T extends FieldValues>({
  form,
  onSubmit,
  LargeScreenCol = "lg:grid-cols-1",
  mediumScreenCol = "md:grid-cols-1",
  smallScreenCol = "sm:grid-cols-1",
  gapX = "gap-x-1",
  gapY = "gap-y-1",
  fields,
  buttonProps: {
    buttonStretch: width = "w-full",
    rounded = "rounded-md",
    content,
    isDisabled = true,
  },
}: IFormFields<T>) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "grid scroll-auto relative",
          LargeScreenCol,
          mediumScreenCol,
          smallScreenCol,
          gapX,
          gapY
        )}
      >
        {fields.map((field) => field())}

        <Button
          type="submit"
          className={cn(rounded, width, "mt-4")}
          disabled={isDisabled}
        >
          {content}
        </Button>
      </form>
    </Form>
  );
}
