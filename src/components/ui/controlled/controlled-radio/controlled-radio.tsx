import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { RadioButton, RadioGroupProps } from '@/components/ui/radio-button/radio-button'

type ControlledRadioButtonProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> & Omit<RadioGroupProps, 'onChange' | 'value' | 'id'>

export const ControlledRadioButton = <TFieldValues extends FieldValues>({
  control,
  name,
  ...restProps
}: ControlledRadioButtonProps<TFieldValues>) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  })

  return <RadioButton onValueChange={onChange} value={value} {...restProps} />
}
