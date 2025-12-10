"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { motion } from "motion/react";
import { Padding, Rounded, Shadow } from "../shared/common-props";
import { CheckedState } from "@radix-ui/react-checkbox";

interface IListViewItemProps {
  padding?: Padding;
  shadow?: Shadow;
  content: any;
  actionsButtons?: (() => React.ReactNode)[]; // They must return one of these components (CreateUpdateReadEntitySheetButton | CreateUpdateReadEntityDialogButton | CreateUpdateReadEntityGoToPageButton | DeleteEntityPopoverButton | DeleteEntityAlertDialogButton)
  dropDown?: () => React.ReactNode; // Must be a custom {DropDown} component
  rounded?: Rounded;
  // isSelected?: boolean;
}

export function ListViewItem({
  content,
  padding = "p-2",
  shadow = "shadow-sm",
  actionsButtons,
  dropDown,
  isSelectableItem = false,
  onCheckedChange,
  rounded = "rounded-md",
}: // isSelected
IListViewItemProps & {
  isSelectableItem?: boolean;
  onCheckedChange?: (checked: CheckedState) => void;
}) {
  // const [parentIsHovered, setParentIsHovered] = useState<boolean>();

  let ActionsDropDownSectionComponent;
  if ((actionsButtons && actionsButtons.length > 0) || dropDown) {
    ActionsDropDownSectionComponent = () => (
      <motion.div
        className={cn("absolute top-0 right-0 flex flex-row gap-1 px-2 pt-1")}
      >
        {actionsButtons && actionsButtons.length > 0 && (
          <ul className="flex flex-row gap-1 items-center justify-start">
            {actionsButtons.map((actionButton, i) => (
              <li key={i}>{actionButton()}</li>
            ))}
          </ul>
        )}
        {dropDown && dropDown()}
      </motion.div>
    );
  }

  let CheckBoxSectionComponent;
  if (isSelectableItem) {
    CheckBoxSectionComponent = () => (
      <motion.div className={cn("absolute top-0 left-0 px-2 pt-1")}>
        {isSelectableItem && (
          <motion.div
            initial={{ opacity: 100 }}
            // animate={{ opacity: parentIsHovered ? 100 : 0 }}
          >
            <Checkbox onCheckedChange={onCheckedChange} />
          </motion.div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      // onHoverStart={() => setParentIsHovered(true)}
      // onHoverEnd={() => setParentIsHovered(false)}
      initial={{ opacity: 0, translateY: "-20px" }}
      animate={{ opacity: 100, translateY: "0px" }}
      className={cn(
        "relative w-[100%] border text-card-foreground group",
        // isSelected ? 'border-dashed border-2' : '',
        padding,
        shadow,
        rounded
      )}
    >
      {CheckBoxSectionComponent && CheckBoxSectionComponent()}
      {content}
      {ActionsDropDownSectionComponent && ActionsDropDownSectionComponent()}
    </motion.div>
  );
}

export function ListViewItemSkeleton({
  content,
  padding = "p-2",
  shadow = "shadow-sm",
  actionsButtons,
  dropDown,
  rounded = "rounded-md",
}: IListViewItemProps) {
  let ActionsDropDownSectionComponent;
  if ((actionsButtons && actionsButtons.length > 0) || dropDown) {
    ActionsDropDownSectionComponent = () => (
      <div
        className={cn("absolute top-0 right-0 flex flex-row gap-1 px-2 pt-1")}
      >
        {actionsButtons && actionsButtons.length > 0 && (
          <ul className="flex flex-row gap-1 items-center justify-start">
            {actionsButtons.map((actionButton, i) => (
              <li key={i}>{actionButton()}</li>
            ))}
          </ul>
        )}
        {dropDown && dropDown()}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 100 }}
      className={cn(
        "relative w-[100%] border bg-card text-card-foreground group",
        padding,
        shadow,
        rounded
      )}
    >
      {content}
      {ActionsDropDownSectionComponent && ActionsDropDownSectionComponent()}
    </motion.div>
  );
}
