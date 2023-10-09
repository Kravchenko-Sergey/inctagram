import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { Select } from '@/components/select'
import { SelectProps } from '@/components/select/select'

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
    field: { value, onChange, ...restField },
  } = useController({
    name,
    rules,
    shouldUnregister,
    control,
    defaultValue,
  })

  return <Select value={value} onChange={onChange} {...restField} {...rest} />
}
