import { FC, ReactNode } from 'react'

import { Scrollbar } from '../scrollbar/scrollbar'

import s from './sidebar.module.scss'

export type SidebarProps = {
  children: ReactNode
  className?: string
}

export const Sidebar: FC<SidebarProps> = ({ children, className }) => {
  return (
    <div className={`${s.root} ${className}`}>
      <Scrollbar>{children}</Scrollbar>
    </div>
  )
}
