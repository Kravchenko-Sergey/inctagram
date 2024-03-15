import { ElementRef, ReactNode, forwardRef } from 'react'
import * as DropdownRadixMenu from '@radix-ui/react-dropdown-menu'

import { DotsIcon } from '@/assets/icons'
import { Button } from '../button'

import s from './dropdown-menu.module.scss'
import { clsx } from 'clsx'

type PropsType = {
  buttonIcon?: ReactNode
} & DropdownRadixMenu.DropdownMenuProps &
  DropdownRadixMenu.DropdownMenuContentProps

export const DropdownMenu = forwardRef<ElementRef<typeof DropdownRadixMenu.Root>, PropsType>(
  (props: PropsType, ref) => {
    const { buttonIcon = <DotsIcon />, align = 'end', className, sideOffset, children } = props
    const classNames = {
      mainIcon: clsx(className, s.mainIcon),
    }

    return (
      <DropdownRadixMenu.Root>
        <DropdownRadixMenu.Trigger asChild>
          <Button variant="withIcon" className={classNames.mainIcon}>
            {buttonIcon}
          </Button>
        </DropdownRadixMenu.Trigger>

        <DropdownRadixMenu.Portal>
          <DropdownRadixMenu.Content
            className={s.content}
            align={align}
            sideOffset={sideOffset}
            ref={ref}
          >
            {children}
          </DropdownRadixMenu.Content>
        </DropdownRadixMenu.Portal>
      </DropdownRadixMenu.Root>
    )
  }
)
