import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import { TextArea, TextAreaProps } from '@/components'

export type ControlledTextFieldProps<T extends FieldValues> = {
  name: FieldPath<T>
  control: Control<T>
  counter?: boolean
} & Omit<TextAreaProps, 'onChange' | 'value' | 'id'>

export const ControlledTextArea = <T extends FieldValues>({
  control,
  name,
  counter,
  className,
  ...rest
}: ControlledTextFieldProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control })

  return (
    <TextArea
      error={error?.message}
      counter={counter}
      className={className ? className : ''}
      {...field}
      {...rest}
    />
  )
}
