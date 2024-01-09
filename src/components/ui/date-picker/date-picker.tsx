import { ComponentProps, forwardRef } from 'react'
import 'react-datepicker/dist/react-datepicker.min.css'
import * as RDP from 'react-datepicker'
import { clsx } from 'clsx'
// eslint-disable-next-line import/no-duplicates
import { getYear } from 'date-fns'
// eslint-disable-next-line import/no-duplicates
import { enUS, ru } from 'date-fns/locale'

import { PATH } from '@/consts/route-paths'
import { CalendarIcon } from '@/assets/icons'
import { Label, Typography } from '@/components'
import { FieldValues } from 'react-hook-form'
import { useTranslation } from '@/hooks'

import textFieldStyles from '@/components/ui/text-field/text-field.module.scss'
import s from './date-picker.module.scss'
import { useRouter } from 'next/router'
import { CustomHeader } from '@/components/ui/date-picker/custom-header/custom-header'
import { formatWeekDay } from '@/helpers'
import { range } from '@/helpers/range'

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

export const DatePicker = forwardRef<FieldValues, DatePickerProps>(
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
    const { locale } = useRouter()
    const years = range(1937, getYear(new Date()) + 1)

    const months = [
      t.months.january,
      t.months.february,
      t.months.march,
      t.months.april,
      t.months.may,
      t.months.june,
      t.months.july,
      t.months.august,
      t.months.september,
      t.months.october,
      t.months.november,
      t.months.december,
    ]
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
          renderCustomHeader={params => (
            <CustomHeader
              {...params}
              years={years}
              months={months}
              locale={locale === 'ru' ? ru : enUS}
            />
          )}
          customInput={<CustomInput error={errorMessage} disabled={disabled} label={label} />}
          calendarClassName={classNames.calendar}
          className={classNames.input}
          popperClassName={classNames.popper}
          dayClassName={classNames.day}
          locale={locale === 'ru' ? ru : enUS}
          dateFormat="dd/MM/yyyy"
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
                  {t.auth.termsOfServiceTitle}
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
