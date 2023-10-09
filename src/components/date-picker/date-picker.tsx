import React, { ComponentProps, forwardRef } from 'react'

import { clsx } from 'clsx'
import { format, ru } from 'date-fns'
import * as RDP from 'react-datepicker'
import { ReactDatePickerCustomHeaderProps } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.min.css'
import Link from 'next/link'
import { PATH } from '@/consts/route-paths'
import textFieldStyles from './../text-field/text-field.module.scss'

import { ArrowLeft } from '@/assets/icons/arrow-left'
import { ArrowRight } from '@/assets/icons/arrow-right'
import { CalendarIcon } from '@/assets/icons/calendar'
import { Label } from '@/components/label-radix/Label'
import { Typography } from '@/components/typography'
import s from './data-picker.module.scss'
import { FieldValues } from 'react-hook-form'
import { useTranslation } from '@/hooks/use-translation'

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

export const DataPicker = forwardRef<FieldValues, DatePickerProps>(
  (
    {
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
    },
    ref
  ) => {
    const isRange = endDate !== undefined
    const showError = !!errorMessage && errorMessage.length > 0
    const { t } = useTranslation()

    const classNames = {
      root: clsx(s.root, className),
      inputContainer: s.inputContainer,
      input: clsx(s.input, textFieldStyles.input, showError && s.error, isRange && s.range),
      calendar: s.calendar,
      popper: s.popper,
      errorText: s.errorText,
      day: () => s.day,
    }

    const DatePickerHandler = (dates: [Date | null, Date | null] | Date) => {
      if (Array.isArray(dates)) {
        const [start, end] = dates

        setStartDate(start)
        setEndDate?.(end)
      } else {
        setStartDate(dates)
      }
    }
    const isError =
      errorMessage?.includes('A user under 13 cannot create a profile.') ||
      errorMessage?.includes('Возраст пользователя должен быть старше 13 лет.')

    return (
      <div className={classNames.root} {...rest}>
        <RDPC
          startDate={startDate}
          endDate={endDate}
          onChange={DatePickerHandler}
          selected={startDate}
          selectsRange={isRange}
          formatWeekDay={formatWeekDay}
          placeholderText={placeholder}
          renderCustomHeader={CustomHeader}
          customInput={<CustomInput error={errorMessage} disabled={disabled} label={label} />}
          calendarClassName={classNames.calendar}
          className={classNames.input}
          popperClassName={classNames.popper}
          dayClassName={classNames.day}
          locale={ru}
          dateFormat={'dd/MM/yyyy'}
          showPopperArrow={false}
          calendarStartDay={1}
          disabled={disabled}
          popperModifiers={[
            {
              name: 'offset',
              options: {
                offset: [0, -11],
              },
            },
          ]}
        />
        <div className={s.errorContainer}>
          {showError && (
            <div style={{ display: 'flex' }}>
              <Typography variant="error" color="error">
                {errorMessage}
              </Typography>
              {isError && (
                <Typography
                  style={{ textDecoration: 'underline', marginLeft: '3px' }}
                  variant="error"
                  as="a"
                  href={`${PATH.POLICY}?referrer=data-picker`}
                >
                  {t.auth.termsOfService}
                </Typography>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
)
type CustomInputProps = {
  disabled?: boolean
  label?: string
  error?: string
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ label, error, disabled, ...rest }, ref) => {
    const classNames = {
      inputContainer: clsx(s.inputContainer, error && s.error),
      icon: clsx(s.icon, disabled && s.disabled),
    }

    return (
      <Label className={s.label} label={label}>
        <div className={classNames.inputContainer}>
          <input ref={ref} disabled={disabled} {...rest} />
          <div className={classNames.icon}>
            <CalendarIcon />
          </div>
        </div>
      </Label>
    )
  }
)

const CustomHeader = ({ date, decreaseMonth, increaseMonth }: ReactDatePickerCustomHeaderProps) => {
  const classNames = {
    header: s.header,
    buttonBox: s.buttonBox,
    button: s.button,
  }

  const headerText = capitalizeFirstLetter(format(date, 'LLLL Y', { locale: ru }))

  return (
    <div className={classNames.header}>
      <Typography variant="bold_text_16">{headerText}</Typography>
      <div className={classNames.buttonBox}>
        <button className={classNames.button} type={'button'} onClick={decreaseMonth}>
          <ArrowLeft />
        </button>

        <button className={classNames.button} onClick={increaseMonth}>
          <ArrowRight />
        </button>
      </div>
    </div>
  )
}

const formatWeekDay = (day: string) => capitalizeFirstLetter(day.substring(0, 2))

const capitalizeFirstLetter = (text: string) => {
  return text[0].toUpperCase() + text.slice(1)
}
