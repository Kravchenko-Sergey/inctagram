import { ReactNode } from 'react'

import { Scrollbar } from '@/components'

import s from './sidebar.module.scss'

type SidebarProps = {
  children: ReactNode
  className?: string
}

export const Sidebar = ({ children, className }: SidebarProps) => {
  return (
    <div className={`${s.root} ${className ? className : ''}`}>
      <Scrollbar>{children}</Scrollbar>
    </div>
  )
}
