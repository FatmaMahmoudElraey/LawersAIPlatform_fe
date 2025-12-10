import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { Fragment, ReactNode } from "react";
import {
  camelToPascalWithSpaces,
  getGridColumns,
} from "@/helpers/shared/stringOperations.helper";
import { DefaultButtonSkeleton } from "../skeleton/buttons-skeleton";

interface RowItem {
  header: string;
  content: any;
}

interface DataTableSkeletonProps {
  showColumnsButton?: boolean;
  columnsNames: string[];
  customColumns?: {
    header: string; // camelCase string
    cellContent: () => React.ReactNode;
  }[];
  isSelectionRowsEnable?: boolean;
  createButtonAction?: boolean;
  extraButtonsActions?: (() => React.ReactNode)[];
  actionColumns?: {
    header: string;
    actions: (() => React.ReactNode)[];
  }[];
  dropDownColumn?: {
    header: string;
    action: () => React.ReactNode;
  };
  rowsNumber?: number;
  cellContent: ReactNode;
}

export function DataTableSkeleton({
  columnsNames,
  cellContent,
  customColumns,
  actionColumns,
  extraButtonsActions,
  dropDownColumn,
  createButtonAction = true,
  isSelectionRowsEnable = true,
  showColumnsButton = true,
  rowsNumber = 10,
}: DataTableSkeletonProps) {
  const rowData: RowItem[] = columnsNames.map((colName) => ({
    header: camelToPascalWithSpaces(colName),
    content: cellContent,
  }));
  if (customColumns) {
    customColumns.map((cusColumn) => {
      rowData.push({
        header: cusColumn.header,
        content: cusColumn.cellContent(),
      });
    });
  }
  if (actionColumns) {
    actionColumns.map(({ header, actions }) => {
      rowData.push({
        header: header,
        content: (
          <ul className="flex gap-3">
            {actions &&
              actions.length > 0 &&
              actions?.map((action, i) => <li key={i}>{action()}</li>)}
          </ul>
        ),
      });
    });
  }

  if (dropDownColumn) {
    rowData.push({
      header: dropDownColumn.header,
      content: dropDownColumn.action(),
    });
  }

  const gridColumnsNum = () => {
    let gridString = isSelectionRowsEnable ? "grid-cols-[60px" : "grid-cols-[";

    rowData.map((_, i) => {
      gridString += "_1fr";
    });

    gridString += "]";
    return gridString;
  };

  return (
    <div className="flex flex-col justify-start items-stretch">
      {/** Create Entity Button Action - Show columns - Extra Buttons Actions */}
      <div className="mb-2 flex w-full flex-row items-center justify-end gap-4">
        {extraButtonsActions?.map((_, i) => (
          <Fragment key={i}>
            {DefaultButtonSkeleton({ width: 140, height: 40 })}
          </Fragment>
        ))}
        {createButtonAction && (
          <Fragment key="create_button_action">
            {DefaultButtonSkeleton({ width: 140, height: 40 })}
          </Fragment>
        )}
        {showColumnsButton && (
          <Fragment key="show_button_columns">
            {DefaultButtonSkeleton({ width: 90, height: 40 })}
          </Fragment>
        )}
      </div>

      {/** Data Table */}
      <div
        className={cn(
          "border grid rounded-md shadow-lg items-center",
          // 'grid-cols-[60px_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr]',
          gridColumnsNum()
        )}
      >
        {new Array(isSelectionRowsEnable ? rowData.length + 1 : rowData.length)
          .fill(0)
          .map((val, i) => (
            <div key={i} className="p-4">
              {isSelectionRowsEnable && i === 0 ? (
                <Skeleton className="h-4 w-4" />
              ) : (
                <p className="text-sm text-muted-foreground">
                  {rowData[i - 1].header}
                </p>
              )}
            </div>
          ))}

        {new Array(rowsNumber).fill(0).map((_, i) => {
          return new Array(
            isSelectionRowsEnable ? rowData.length + 1 : rowData.length
          )
            .fill(0)
            .map((val, j) => (
              <div key={j} className="p-4">
                {isSelectionRowsEnable && j === 0 ? (
                  <Skeleton className="h-4 w-4" />
                ) : (
                  <Fragment>{rowData[j - 1].content}</Fragment>
                )}
              </div>
            ));
        })}
      </div>
    </div>
  );
}
