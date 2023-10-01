import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import { TextField } from '@/components/text-field'
import { InputPropsType } from '@/components/text-field/text-field'

type Props<T extends FieldValues> = {
  errorMessage?: string
  control: Control<T>
  name: FieldPath<T>
} & Omit<InputPropsType, 'onChange' | 'value'>

export const ControlledTextField = <T extends FieldValues>({
  control,
  name,
  className,
  ...rest
}: Props<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control })

  return <TextField error={error?.message} className={className} {...field} {...rest} />
}
