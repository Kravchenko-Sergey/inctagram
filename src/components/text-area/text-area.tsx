import { ComponentPropsWithoutRef, forwardRef } from 'react'

import { Typography } from '../typography'

import s from './text-area.module.scss'

export type TextFieldProps = {
  error?: string
  label?: string
  className?: string
  onClearClick?: () => void
  errorMessage?: string
} & ComponentPropsWithoutRef<'input'>

const TextArea = forwardRef<HTMLTextAreaElement, TextFieldProps>((props, ref) => {
  const { label, disabled, error, onClearClick, ...rest } = props

  return (
    <div className={s.root}>
      <Typography
        variant={'regular_text_14'}
        as={'label'}
        className={`${s.label} ${disabled && s.disabled}`}
      >
        {label}
      </Typography>
      <div className={`${s.container} ${error ? s.error : ''} ${disabled && s.disabled}`}>
        <textarea
          ref={ref}
          className={`${s.textarea} ${error ? s.error : ''}`}
          disabled={disabled}
          {...rest}
        />
      </div>
      <Typography variant={'regular_text_14'} as={'div'} className={s.error}>
        {error}
      </Typography>
    </div>
  )
})

export default TextArea
