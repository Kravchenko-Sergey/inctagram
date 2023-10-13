import { ComponentPropsWithoutRef, FC, ReactNode } from 'react'

import * as ScrollArea from '@radix-ui/react-scroll-area'

import s from './scrollbar.module.scss'

export type ScrollbarProps = {
  children: ReactNode
  className?: string
  maxHeight?: number | string
  maxWidth?: number | string
} & ComponentPropsWithoutRef<'div'>

export const Scrollbar: FC<ScrollbarProps> = ({ children, maxHeight, maxWidth, ...rest }) => {
  const maxHeightConverted = typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight
  const maxWidthConverted = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth

  const viewportStyles = { maxHeight: maxHeightConverted, maxWidth: maxWidthConverted }

  return (
    <ScrollArea.Root asChild>
      <div className={s.root} {...rest}>
        <ScrollArea.Viewport className={s.viewport} style={viewportStyles}>
          {children}
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar className={s.scrollbar} orientation="vertical">
          <ScrollArea.Thumb className={s.thumb} />
        </ScrollArea.Scrollbar>
        <ScrollArea.Scrollbar className={s.scrollbar} orientation="horizontal">
          <ScrollArea.Thumb className={s.thumb} />
        </ScrollArea.Scrollbar>
      </div>
    </ScrollArea.Root>
  )
}
