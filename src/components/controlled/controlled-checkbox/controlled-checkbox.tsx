import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { CheckboxItem } from '../../checkbox'

import { CheckboxProps } from '@/components/checkbox/checkbox'

export type ControlledCheckboxProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<CheckboxProps, 'onChange' | 'onBlur' | 'value' | 'id'>

export const ControlledCheckbox = <T extends FieldValues>({
  name,
  rules,
  shouldUnregister,
  control,
  defaultValue,
  ...checkboxProps
}: ControlledCheckboxProps<T>) => {
  const {
    field: { onChange, onBlur, value },
  } = useController({
    name,
    rules,
    shouldUnregister,
    control,
    defaultValue,
  })

  return (
    <CheckboxItem
      {...{
        onChange,
        checked: value,
        id: name,
        ...checkboxProps,
        onBlur,
      }}
    />
  )
}
