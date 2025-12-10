"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowSelectionState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IGetSuccessResponse } from "@/helpers/dtos/response.dto";
import { isDecimalNumber } from "@/helpers/shared/numberOperations.shared";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Columns,
  GripVertical,
  Minus,
  Plus,
} from "lucide-react";
import React, {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "../ui/pagination";
import { camelToPascalWithSpaces } from "@/helpers/shared/stringOperations.helper";
import { motion } from "motion/react";

interface DataTableProps<TData, TValue> {
  expandedRowContent?: (entity: TData) => React.ReactNode;
  columnSizing?: {
    size?: number;
    minSize?: number;
    maxSize?: number;
  };
  showColumnsButton?: boolean;
  entitiesCashName: string;
  columns: ColumnDef<TData, TValue>[];
  data: IGetSuccessResponse<TData>;
  limits: Readonly<number[]>;
  numberPagesToShow: number;
  createButtonAction: React.ReactNode; // You need to use one of these components: CreateUpdateEntitySheetButton || CreateUpdateEntityGoToPageButton || CreateUpdateEntityDialogButton
  extraButtonsActions?: (() => React.ReactNode)[]; // (they are beside create button) You need to use these components as list : CreateUpdateEntitySheetButton || CreateUpdateEntityGoToPageButton || CreateUpdateEntityDialogButton
  states: {
    limitStates: {
      selectedLimit: number;
      setSelectedLimit: React.Dispatch<SetStateAction<Readonly<number>>>;
    };
    pagesStates: {
      selectedPage: number;
      setSelectedPage: React.Dispatch<SetStateAction<number>>;
    };
    columnVisibilityStates?: {
      columnVisibility: VisibilityState;
      setColumnVisibility: React.Dispatch<SetStateAction<VisibilityState>>;
    };
    columnFiltersStates?: {
      columnFilters: ColumnFiltersState;
      setColumnFilters: React.Dispatch<SetStateAction<ColumnFiltersState>>;
    };
    sortingStates?: {
      sorting: SortingState;
      setSorting: React.Dispatch<SetStateAction<SortingState>>;
    };
  };
  isDraggable?: boolean;
}

export function DataTable<TData, TValue>({
  isDraggable = true,
  showColumnsButton = true,
  entitiesCashName,
  columns,
  data,
  limits,
  states,
  numberPagesToShow,
  createButtonAction,
  extraButtonsActions,
  columnSizing,
  expandedRowContent,
}: DataTableProps<TData, TValue>) {
  const { setSelectedLimit, selectedLimit } = states.limitStates;
  const { setSelectedPage, selectedPage } = states.pagesStates;

  const queryClient = useQueryClient();

  const table = useReactTable<TData>({
    data: data?.data,
    columns,
    initialState: { pagination: { pageSize: selectedLimit } },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    ...(states?.sortingStates && {
      onSortingChange: states.sortingStates.setSorting,
      getSortedRowModel: getSortedRowModel(),
    }),
    ...(states?.columnVisibilityStates && {
      onColumnVisibilityChange:
        states?.columnVisibilityStates.setColumnVisibility,
    }),
    ...(states?.columnFiltersStates && {
      onColumnFiltersChange: states.columnFiltersStates.setColumnFilters,
    }),
    getExpandedRowModel: getExpandedRowModel(),

    state: {
      ...(states?.sortingStates && { sorting: states?.sortingStates.sorting }),
      ...(states?.columnVisibilityStates && {
        columnVisibility: states?.columnVisibilityStates.columnVisibility,
      }),
      ...(states?.columnFiltersStates && {
        columnFilters: states?.columnFiltersStates.columnFilters,
      }),
    },

    ...(columnSizing
      ? {
          defaultColumn: {
            ...(columnSizing?.size && { size: columnSizing?.size }),
            ...(columnSizing?.minSize && { minSize: columnSizing?.minSize }),
            ...(columnSizing?.maxSize && { maxSize: columnSizing?.maxSize }),
          },
        }
      : {
          defaultColumn: { maxSize: 30 },
        }),
  });

  const limitSelectClick = (value: string) => {
    setSelectedLimit(Number.parseInt(value));

    queryClient.removeQueries({ queryKey: [entitiesCashName, 1] });
    queryClient.refetchQueries({ queryKey: [entitiesCashName, 1] });

    setSelectedPage(1);
    table.setPageSize(Number.parseInt(value));
  };

  const calculatePages = data ? data?.meta.count / selectedLimit : 1;
  const pages = isDecimalNumber(calculatePages)
    ? Math.floor(calculatePages) + 1
    : calculatePages;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="mb-2 flex w-full flex-row items-center justify-end gap-4">
        {extraButtonsActions && (
          <div className="flex flex-row justify-center items-center gap-4">
            {extraButtonsActions.map((actionButton, i) => (
              <Fragment key={i}>{actionButton()}</Fragment>
            ))}
          </div>
        )}
        {createButtonAction && createButtonAction}
        {showColumnsButton && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Columns</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value: any) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {camelToPascalWithSpaces(column.id)}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <Card className="p-0 shadow-lg scroll-auto overflow-x-auto">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <Fragment key={row.id}>
                    <TableRow data-state={row.getIsSelected() && "selected"}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>

                    {row.getIsExpanded() && expandedRowContent && (
                      <TableRow>
                        <TableCell colSpan={row.getVisibleCells().length + 1}>
                          <div>{expandedRowContent(row.original)}</div>
                        </TableCell>
                      </TableRow>
                    )}
                  </Fragment>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="my-4 flex flex-1 flex-row justify-between pb-6 text-sm text-muted-foreground">
        <p>
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </p>

        <div className="flex flex-row gap-3">
          {/** Limits */}
          <Select
            onValueChange={(val) => limitSelectClick(val)}
            defaultValue={selectedLimit.toString()}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {limits.map((limit) => (
                <SelectItem key={limit} value={limit.toString()}>
                  Items: {limit.toString()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/** Pages */}
          <Select
            value={selectedPage.toString()}
            defaultValue={selectedPage.toString()}
            onValueChange={(val) => {
              setSelectedPage(Number.parseInt(val));
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array(pages)
                .fill(0)
                .map((_, i, __) => {
                  i++;
                  return (
                    <SelectItem key={i} value={i.toString()}>
                      Page: {i.toString()}
                    </SelectItem>
                  );
                })}
            </SelectContent>
          </Select>

          {/** < */}
          <Button
            onClick={() => {
              setSelectedPage(1);
              // setValueToPagesHistory(1);
            }}
            variant={"outline"}
            disabled={selectedPage === 1 || pages === 1}
            size={"sm"}
          >
            <ChevronsLeft />
          </Button>

          {/** << */}
          <Button
            onClick={() => {
              setSelectedPage(selectedPage - 1);
              // setValueToPagesHistory(selectedPage - 1);
            }}
            disabled={pages === 1 || selectedPage === 1}
            variant={"outline"}
            size={"sm"}
          >
            <ChevronLeft />
          </Button>

          {/** Pagination section */}
          <Pagination>
            <PaginationContent>
              {pages > numberPagesToShow && selectedPage > 3 && (
                <>
                  <PaginationItem>
                    <PaginationLink
                      className="cursor-pointer"
                      onClick={() => {
                        setSelectedPage(1);
                        // setValueToPagesHistory(1);
                      }}
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => {
                        setSelectedPage(2);
                        // setValueToPagesHistory(2);
                      }}
                    >
                      2
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}

              {pages > numberPagesToShow && selectedPage > 1 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {Array(pages < numberPagesToShow ? pages : numberPagesToShow)
                .fill(0)
                .map((_, i, __) => {
                  const start =
                    pages > numberPagesToShow
                      ? selectedPage < pages - numberPagesToShow + 1
                        ? selectedPage
                        : pages - numberPagesToShow + 1
                      : 1;
                  i++;
                  return (
                    <PaginationItem key={start + i - 1}>
                      <PaginationLink
                        className={
                          selectedPage === start + i - 1 ? cn("border") : ""
                        }
                        onClick={() => {
                          setSelectedPage(start + i - 1);
                          // setValueToPagesHistory(start + i - 1);
                        }}
                      >
                        {start + i - 1}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

              {pages > numberPagesToShow &&
                selectedPage < numberPagesToShow + 1 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

              {pages > numberPagesToShow &&
                selectedPage < numberPagesToShow + 1 && (
                  <>
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => {
                          setSelectedPage(pages - 1);
                          // setValueToPagesHistory(pages - 1);
                        }}
                      >
                        {pages - 1}
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => {
                          setSelectedPage(pages);
                          // setValueToPagesHistory(pages);
                        }}
                      >
                        {pages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}
            </PaginationContent>
          </Pagination>

          {/** > */}
          <Button
            onClick={() => {
              setSelectedPage(selectedPage + 1);
              // setValueToPagesHistory(selectedPage + 1);
            }}
            disabled={selectedPage === pages || pages === 1}
            variant={"outline"}
            size={"sm"}
          >
            <ChevronRight />
          </Button>

          {/** >> */}
          <Button
            onClick={() => setSelectedPage(pages)}
            variant={"outline"}
            disabled={pages === selectedPage || pages === 1}
            size={"sm"}
          >
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
