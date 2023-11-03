import { ElementRef, ReactNode, forwardRef } from 'react'
import * as DropdownRadixMenu from '@radix-ui/react-dropdown-menu'

import { DotsIcon } from '@/assets/icons'
import { Button } from '../button'

import s from './dropdown-menu.module.scss'

type PropsType = {
  buttonIcon?: ReactNode
} & DropdownRadixMenu.DropdownMenuProps &
  DropdownRadixMenu.DropdownMenuContentProps

export const DropdownMenu = forwardRef<ElementRef<typeof DropdownRadixMenu.Root>, PropsType>(
  (props: PropsType, ref) => {
    const { buttonIcon = <DotsIcon />, align = 'end', sideOffset, children } = props

    return (
      <DropdownRadixMenu.Root>
        <DropdownRadixMenu.Trigger asChild>
          <Button variant="withIcon" className={s.mainIcon}>
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
