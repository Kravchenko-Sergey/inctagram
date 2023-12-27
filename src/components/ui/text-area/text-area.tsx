import { ComponentPropsWithoutRef, forwardRef } from 'react'

import { Typography } from '@/components'

import { clsx } from 'clsx'
import s from './text-area.module.scss'

export type TextAreaProps = {
  error?: string
  label?: string
  className?: string
  classNameTextArea?: string
  onClearClick?: () => void
  errorMessage?: string
  counter?: number
} & ComponentPropsWithoutRef<'textarea'>

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  const { label, counter, disabled, className, classNameTextArea, error, ...rest } = props
  const classNames = {
    root: clsx(s.root, className),
    textArea: clsx(s.textarea, error && s.error, classNameTextArea),
  }
    console.log(classNameTextArea)
  return (
    <div className={classNames.root}>
      <Typography
        variant="regular_text_14"
        as="label"
        className={`${s.label} ${disabled && s.disabled}`}
      >
        {label}
      </Typography>
      <div className={`${s.container} ${error ? s.error : ''} ${disabled ? s.disabled : ''}`}>
        <textarea ref={ref} disabled={disabled} {...rest} className={classNames.textArea} />
      </div>
      <div className={s.footer}>
        <div className={s.errorContainer}>
          {error && (
            <Typography variant="regular_text_14" as="div" color="error" className={s.error}>
              {error}
            </Typography>
          )}
        </div>
        {counter && (
          <Typography
            as="span"
            style={{ textAlign: 'end', marginTop: '3px' }}
            variant="small_text"
            color="secondary"
          >
            {rest?.value?.toString().length}/{counter}
          </Typography>
        )}
      </div>
    </div>
  )
})
