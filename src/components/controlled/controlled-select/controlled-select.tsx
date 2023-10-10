import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { Select, SelectProps } from '@/components/select'

export type ControlledSelectProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<SelectProps, 'onChange' | 'value'>

export const ControlledSelect = <T extends FieldValues>({
  name,
  rules,
  shouldUnregister,
  control,
  defaultValue,
  ...rest
}: ControlledSelectProps<T>) => {
  const {
    field: { value, onBlur, onChange, ...restField },
    fieldState: { error },
  } = useController({
    name,
    rules,
    shouldUnregister,
    control,
    defaultValue,
  })

  return (
    <Select
      value={value}
      errorMessage={error?.message}
      onBlur={onBlur}
      onChange={onChange}
      {...restField}
      {...rest}
    />
  )
}
