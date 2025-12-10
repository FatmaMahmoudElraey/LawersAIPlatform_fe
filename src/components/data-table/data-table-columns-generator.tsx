"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column";
import { Checkbox } from "@/components/ui/checkbox";
import { LogicError } from "@/helpers/errors/exceptions/login.exception";
import { camelToPascalWithSpaces } from "@/helpers/shared/stringOperations.helper";
import { CheckedState } from "@radix-ui/react-checkbox";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";

//Note: The Dropdown functionality
// When you want to use dropdown that have multiple button actions,
// they should all of them controls the visibility of one single dialog or sheet
// so you need two states in the page/view :
// 1. One for showing or hiding the dialog or sheet
// 2. Second one for storing the appropriate "CreateUpdateForm" component

interface ICustomColumn<T> {
  accessorKey: string; // camelCase string
  cellContent: (entity: T) => string | React.ReactNode;
}
interface IActionButtonColumn<T> {
  id: string; // prefer to be equals to header but in camelCase form
  header: string;
  actions: ((entity: T) => React.ReactNode)[]; // They must return one of these components (CreateUpdateReadEntitySheetButton | CreateUpdateReadEntityDialogButton | CreateUpdateReadEntityGoToPageButton | DeleteEntityPopoverButton | DeleteEntityAlertDialogButton)
}
interface IEntityColumns<T> {
  isSelectionRowsEnable?: boolean;
  isSortableColumns?: boolean;
  isHidableColumns?: boolean;
  onRowSelection?: (entity: T, checked: CheckedState) => void;
  onAllRowsSelection?: (entities: T[], checked: CheckedState) => void;
  entityProperties: string[];
  customColumns?: ICustomColumn<T>[];
  cellCustomization?: (ctx: CellContext<T, unknown>) => any;
  actionColumns: IActionButtonColumn<T>[];
  dropDownActions?: {
    id: string;
    header: string;
    dropDownComponent: (entity: T) => React.ReactNode; // You must use this custom component (DropDown) !!!!
  };
  isExpandedRow?: boolean;
}
export function entityColumns<T>({
  entityProperties,
  customColumns,
  cellCustomization,
  actionColumns,
  dropDownActions,
  onRowSelection,
  onAllRowsSelection,
  isSortableColumns = true,
  isHidableColumns = true,
  isSelectionRowsEnable = true,
  isExpandedRow = false,
}: IEntityColumns<T>) {
  const columns: ColumnDef<T>[] = [];

  if (!isSelectionRowsEnable && isExpandedRow) {
    columns.push({
      id: "select",
      cell: ({ row }) => (
        <Button
          variant={"outline"}
          size={"sm"}
          className="mr-2 rounded-md scale-75"
          onClick={() => {
            row.toggleExpanded();
          }}
        >
          {row.getIsExpanded() ? <Minus /> : <Plus />}{" "}
        </Button>
      ),
      enableSorting: false,
      enableHiding: false,
    });
  }

  if (isSelectionRowsEnable) {
    columns.push({
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            table.getIsSomePageRowsSelected()
          }
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
            if (onAllRowsSelection)
              onAllRowsSelection(
                table.getRowModel().rows.map((row) => row.original),
                value
              );
          }}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <div className="flex flex-row items-center">
          {isExpandedRow && (
            <Button
              variant={"outline"}
              size={"sm"}
              className="mr-2 rounded-md scale-75"
              onClick={() => {
                row.toggleExpanded();
              }}
            >
              {row.getIsExpanded() ? <Minus /> : <Plus />}{" "}
            </Button>
          )}
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
              row.toggleSelected(!!value);
              if (onRowSelection) onRowSelection(row.original, value);
            }}
            aria-label="Select row"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    });
  }

  entityProperties.forEach((property) => {
    columns.push({
      accessorKey: property,
      header: ({ column }) => (
        <DataTableColumnHeader
          isSortable={isSortableColumns}
          isHidable={isHidableColumns}
          column={column}
          title={camelToPascalWithSpaces(property)}
        />
      ),
      ...(cellCustomization && { cell: cellCustomization }),
    });
  });

  if (customColumns) {
    customColumns.forEach(({ accessorKey, cellContent }) => {
      columns.push({
        accessorKey,
        header: ({ column }) => (
          <DataTableColumnHeader
            isSortable={isSortableColumns}
            isHidable={isHidableColumns}
            column={column}
            title={camelToPascalWithSpaces(accessorKey)}
          />
        ),
        cell: ({ row }) => cellContent(row.original),
      });
    });
  }

  if (actionColumns && actionColumns.length > 0) {
    actionColumns.forEach(({ id, header, actions }) => {
      columns.push({
        id,
        header,
        cell: ({ row }) => (
          <ul className="flex list-none flex-row items-center justify-start gap-2">
            {actions &&
              actions.length > 0 &&
              actions?.map((action, i) => (
                <li key={i}>{action(row.original)}</li>
              ))}
          </ul>
        ),
      });
    });
  }

  if (dropDownActions) {
    const { dropDownComponent, ...restData } = dropDownActions;
    columns.push({
      ...restData,
      cell: ({ row }) => <div>{dropDownComponent(row.original)}</div>,
    });
  }

  return columns;
}
