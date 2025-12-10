'use client';

import * as React from 'react';
import { addDays, format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { SelectSingleEventHandler } from 'react-day-picker';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from '../ui/select';
import { ISelectItem } from '../select/select';
import { LabelLocated } from '../shared/input';
import { Label } from '../ui/label';

export interface IDatePicker {
  placeholder?: string;
  date: Date | undefined;
  onSelect: SelectSingleEventHandler;
  labelLocated?: LabelLocated;
  label: string;
  defaultValue?: Date;
  disabled?: (data: Date) => boolean;
  fromMonth?: Date;
  toMonth?: Date;
  fromYear?: Date;
  toYear?: Date;
  presetSelect?: {
    placeholder: string;
    items: ISelectItem[];
    onValueChange: (value: string) => void; // You should put this statement in the body of this function  """" setDate(addDays(new Date(), parseInt(value))) ** addDays function from date-fns lib ** """"
  };
}
export function DatePicker({
  date,
  placeholder = 'Pick a date',
  presetSelect,
  fromMonth,
  fromYear,
  toMonth,
  toYear,
  defaultValue,
  labelLocated = 'above',
  label,
  onSelect,
  disabled,
}: IDatePicker) {
  const defaultDatePickerValue = defaultValue ? { defaultValue } : {};
  const datePicketProps =
    disabled || fromMonth || fromYear || toMonth || toYear
      ? {
          ...(disabled && { disabled }),
          ...(fromMonth && { fromMonth }),
          ...(fromYear && { fromYear }),
          ...(toMonth && { toMonth }),
          ...(toYear && { toYear }),
        }
      : {};

  return (
    <div
      className={cn(
        'flex',
        labelLocated === 'aside' ? 'flex-row gap-1' : 'flex-col gap-1',
      )}
    >
      <Label>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-[280px] justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon />
            {date ? format(date, 'PPP') : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
          {presetSelect && (
            <Select onValueChange={presetSelect.onValueChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent position="popper">
                {presetSelect.items.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.content}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <div className={cn(presetSelect ? 'rounded-md border' : '')}>
            <Calendar
              mode="single"
              selected={date}
              onSelect={onSelect}
              disabled={(date) =>
                date > new Date() || date < new Date('1900-01-01')
              }
              {...datePicketProps}
              {...defaultDatePickerValue}
              // disabled={(date) =>
              //   date > new Date() || date < new Date('1900-01-01')
              // }
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
