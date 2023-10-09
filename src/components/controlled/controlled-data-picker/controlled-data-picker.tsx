import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { DataPicker } from '@/components/date-picker'
import { DatePickerProps } from '@/components/date-picker/data-picker'

export type ControlledDataPickerProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<DatePickerProps, 'ref' | 'startDate' | 'setStartDate'>

export const ControlledDataPicker = <T extends FieldValues>({
  name,
  rules,
  shouldUnregister,
  control,
  defaultValue,
  ...rest
}: ControlledDataPickerProps<T>) => {
  const {
    field: { onChange, value, ...restField },
  } = useController({
    name,
    rules,
    shouldUnregister,
    control,
    defaultValue,
  })

  return (
    <div>
      <DataPicker
        errorMessage={rest.errorMessage}
        setStartDate={onChange}
        startDate={value}
        {...restField}
        {...rest}
      />
    </div>
  )
}
