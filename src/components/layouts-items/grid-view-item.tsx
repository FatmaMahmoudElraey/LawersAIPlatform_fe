"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { motion } from "motion/react";
import { Padding, Rounded, Shadow } from "../shared/common-props";
import { CheckedState } from "@radix-ui/react-checkbox";

interface IGridViewItemProps {
  padding?: Padding;
  shadow?: Shadow;
  content: any;
  actionsButtons?: (() => React.ReactNode)[]; // They must return one of these components (CreateUpdateReadEntitySheetButton | CreateUpdateReadEntityDialogButton | CreateUpdateReadEntityGoToPageButton | DeleteEntityPopoverButton | DeleteEntityAlertDialogButton)
  dropDown?: () => React.ReactNode; // Must be a custom {DropDown} component

  rounded?: Rounded;
  // isSelected?: boolean;
}

export function GridViewItem({
  content,
  padding = "p-2",
  shadow = "shadow-sm",
  actionsButtons,
  dropDown,
  isSelectableItem = false,
  onCheckedChange,
  rounded = "rounded-md",
}: // isSelected,
IGridViewItemProps & {
  onCheckedChange?: (checked: CheckedState) => void;
  isSelectableItem?: boolean;
}) {
  // const [parentIsHovered, setParentIsHovered] = useState<boolean>();

  let ActionsSectionComponent;
  if (actionsButtons && actionsButtons.length > 0) {
    ActionsSectionComponent = () => (
      <motion.div
        className={cn(
          "absolute w-[100%] bottom-0 left-0 bg-black-gradient-bottom-top px-2 pb-1",
          rounded
        )}
      >
        <ul className="flex flex-row gap-1 items-center justify-start">
          {actionsButtons.map((actionButton, i) => (
            <li key={i}>{actionButton()}</li>
          ))}
        </ul>
      </motion.div>
    );
  }

  let DropDownSectionComponent;
  if (dropDown || isSelectableItem) {
    DropDownSectionComponent = () => (
      <motion.div
        className={cn(
          "absolute w-[100%] top-0 left-0 flex flex-row gap-1 items-center justify-between px-2 pt-1"
        )}
      >
        {isSelectableItem && (
          <motion.div
            initial={{ opacity: 100 }}
            // animate={{ opacity: parentIsHovered ? 100 : 0 }}
          >
            <Checkbox onCheckedChange={onCheckedChange} />
          </motion.div>
        )}

        {dropDown && dropDown()}
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
        "relative w-full border bg-card text-card-foreground group",
        // isSelected ? 'border-dashed border-2' : '',
        padding,
        shadow,
        rounded
      )}
    >
      {ActionsSectionComponent && ActionsSectionComponent()}
      {content}
      {DropDownSectionComponent && DropDownSectionComponent()}
    </motion.div>
  );
}

export function GridViewItemSkeleton({
  content,
  padding = "p-2",
  shadow = "shadow-sm",
  actionsButtons,
  dropDown,
  rounded = "rounded-md",
}: IGridViewItemProps) {
  let ActionsSectionComponent;
  if (actionsButtons && actionsButtons.length > 0) {
    ActionsSectionComponent = () => (
      <div
        className={cn(
          "absolute w-[100%] bottom-0 left-0 bg-black-gradient-bottom-top px-2 pb-1",
          rounded
        )}
      >
        <ul className="flex flex-row gap-1 items-center justify-start">
          {actionsButtons.map((actionButton, i) => (
            <li key={i}>{actionButton()}</li>
          ))}
        </ul>
      </div>
    );
  }

  let DropDownSectionComponent;
  if (dropDown) {
    DropDownSectionComponent = () => (
      <div
        className={cn(
          "absolute w-[100%] top-0 left-0 flex flex-row gap-1 items-center justify-between px-2 pt-1"
        )}
      >
        {dropDown && dropDown()}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 100 }}
      className={cn(
        "relative w-full border text-card-foreground group",
        padding,
        shadow,
        rounded
      )}
    >
      {ActionsSectionComponent && ActionsSectionComponent()}
      {content}
      {DropDownSectionComponent && DropDownSectionComponent()}
    </motion.div>
  );
}
