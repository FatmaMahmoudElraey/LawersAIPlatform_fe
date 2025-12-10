'use client';

import { cn } from '@/lib/utils';
import { RadioGroup as RadioGroupCom, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import React, { Dispatch, SetStateAction } from 'react';
import {
  AlignItems,
  Direction,
  Gap,
  JustifyContent,
} from '../shared/flex-props';
import { LabelLocated } from '../shared/input';

interface IRadioGroupItem {
  content: string | React.ReactNode;
  value: string;
}
export interface IRadioGroupProps {
  defaultValue?: string;
  items: IRadioGroupItem[];
  direction?: Direction;
  value: string; // Accept object as stringify object
  onValueChange: (value: string) => void;
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
  gap?: Gap;
  label: string;
  labelLocated?: LabelLocated;
}
export function RadioGroup({
  defaultValue,
  onValueChange,
  value,
  direction = 'horizontal',
  items,
  alignItems = 'items-center',
  justifyContent = 'justify-start',
  label,
  labelLocated = 'above',
  gap = 'gap-1',
}: IRadioGroupProps) {
  const defaultRadioGroupValue = defaultValue ? { defaultValue } : {};

  return (
    <div
      className={cn(
        'flex',
        labelLocated === 'aside'
          ? 'flex-row gap-3 items-center'
          : 'flex-col gap-3 justify-start items-start',
      )}
    >
      <Label>{label}</Label>
      <RadioGroupCom
        className={cn(
          'flex flex-wrap',
          direction === 'horizontal' ? 'flex-row' : 'flex-col',
          justifyContent,
          alignItems,
          gap,
        )}
        onValueChange={onValueChange}
        value={value}
        {...defaultRadioGroupValue}
      >
        {items.map((item, i) => (
          <div className="flex flex-row items-center gap-2" key={i}>
            <RadioGroupItem value={item.value} id={item.value} />
            <Label htmlFor={item.value}>{item.content}</Label>
          </div>
        ))}
      </RadioGroupCom>
    </div>
  );
}
