'use client';

import React, { Dispatch, SetStateAction } from 'react';
import { Checkbox as CheckboxComp } from '../ui/checkbox';
import { CheckedState } from '@radix-ui/react-checkbox';

export interface ICheckboxProps {
  id: string;
  content: string;
  description?: string | React.ReactNode;
  isDisabled?: boolean;
  onCheckedChange: (checked: CheckedState) => void;
  value: boolean | undefined;
  defaultChecked?: boolean;
}
export function Checkbox({
  content,
  description,
  id,
  isDisabled = false,
  value,
  onCheckedChange,
  defaultChecked,
}: ICheckboxProps) {
  return (
    <div className="flex flex-row items-top gap-2">
      <CheckboxComp
        id={id}
        disabled={isDisabled}
        onCheckedChange={onCheckedChange}
        checked={value}
        defaultChecked={defaultChecked}
      />
      <div className="flex flex-col gap-1.5 leading-none items-top">
        <label
          htmlFor={id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {content}
        </label>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}
