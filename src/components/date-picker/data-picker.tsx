import React, { ComponentProps, memo, useState } from 'react'

import { clsx } from 'clsx'
import { format } from 'date-fns'
// import { ru } from 'date-fns/locale'
import { ReactDatePickerCustomHeaderProps, registerLocale } from 'react-datepicker'
import * as RDP from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.min.css'
import textFieldStyles from './../text-field/text-field.module.scss'
import s from './data-picker.module.scss'

export type DatePickerProps = {
  placeholder?: string
  startDate: Date | null
  setStartDate: (date: Date | null) => void
  label?: string
  errorMessage?: string
  disabled?: boolean
  endDate?: Date | null
  setEndDate?: (date: Date | null) => void
} & ComponentProps<'div'>

const RDPC = (((RDP.default as any).default as any) ||
  (RDP.default as any) ||
  (RDP as any)) as typeof RDP.default

export const DataPicker = memo(
  ({
    startDate,
    setStartDate,
    placeholder,
    label,
    errorMessage,
    endDate,
    setEndDate,
    disabled,
    className,
    ...rest
  }: DatePickerProps) => {
    const isRange = endDate !== undefined
    const showError = !!errorMessage && errorMessage.length > 0

    const classNames = {
      root: clsx(s.root, className),
      container: s.inputContainer,
      input: clsx(s.input, textFieldStyles.input, showError && s.error, isRange && s.range),
      calendar: s.calendar,
      popper: s.popper,
      error: s.errorText,
      day: () => s.day,
    }

    return <RDPC selected={startDate} onChange={date => setStartDate(date)} />
  }
)
