import { ComponentPropsWithoutRef, forwardRef } from 'react'

import { Typography } from '../typography'

import { clsx } from 'clsx'
import s from './text-area.module.scss'

export type TextAreaProps = {
  error?: string
  label?: string
  className?: string
  classNameTextArea?: string
  onClearClick?: () => void
  errorMessage?: string
} & ComponentPropsWithoutRef<'textarea'>

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  const { label, disabled, className, classNameTextArea, error, ...rest } = props
  const classNames = {
    root: clsx(s.root, className),
    textArea: clsx(s.textarea, error && s.error, classNameTextArea),
  }

  return (
    <div className={classNames.root}>
      <Typography
        variant={'regular_text_14'}
        as={'label'}
        className={`${s.label} ${disabled && s.disabled}`}
      >
        {label}
      </Typography>
      <div className={`${s.container} ${error ? s.error : ''} ${disabled ? s.disabled : ''}`}>
        <textarea
          ref={ref}
          disabled={disabled}
          {...rest}
          // className={`${s.textarea} ${error ? s.error : ''} ${
          //   classNameTextArea ? s.classNameTextArea : ''
          // }`}
          className={classNames.textArea}
        />
      </div>
      <Typography variant={'regular_text_14'} as={'div'} color="error" className={s.error}>
        {error}
      </Typography>
    </div>
  )
})

export default TextArea
