import { ReactDatePickerCustomHeaderProps } from 'react-datepicker'
import s from '@/components/ui/date-picker/date-picker.module.scss'
// eslint-disable-next-line import/no-duplicates
import { ru, enUS } from 'date-fns/locale'
// eslint-disable-next-line import/no-duplicates
import { format, getYear, getMonth } from 'date-fns'
import { Select, Typography } from '@/components'
import { ArrowLeft, ArrowRight } from '@/assets/icons'
import { Option } from '@/components/ui/select'
import { capitalizeFirstLetter } from '@/helpers'

export const CustomHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
  locale,
  changeYear,
  changeMonth,

  years,
  months,
}: ReactDatePickerCustomHeaderProps & {
  locale: Locale
  years: number[]
  months: string[]
}) => {
  const classNames = {
    header: s.header,
    buttonBox: s.buttonBox,
    button: s.button,
  }

  const headerText = capitalizeFirstLetter(
    format(date, 'LLLL Y', { locale: locale.code === 'ru' ? ru : enUS })
  )

  const transformYears: Option[] = years.map(year => ({ label: String(year), value: String(year) }))
  const transformMonths: Option[] = months.map(year => ({
    label: String(year),
    value: String(year),
  }))

  const yearSelectHandler = (value: string) => {
    changeYear(+value)
  }
  const monthsSelectHandler = (value: string) => {
    changeMonth(months.indexOf(value))
  }

  return (
    <div className={classNames.header}>
      <div className={s.headerFooter}>
        <Typography variant="bold_text_16">{headerText}</Typography>
        <div className={classNames.buttonBox}>
          <button className={classNames.button} type="button" onClick={decreaseMonth}>
            <ArrowLeft />
          </button>

          <button className={classNames.button} onClick={increaseMonth}>
            <ArrowRight />
          </button>
        </div>
      </div>
      <div className={s.selectsWrapper}>
        <Select
          portal={false}
          value={getYear(date).toString()}
          onChange={yearSelectHandler}
          options={transformYears}
        />
        <Select
          portal={false}
          value={months[getMonth(date)]}
          onChange={monthsSelectHandler}
          options={transformMonths}
        />
      </div>
    </div>
  )
}
