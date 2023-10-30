import { ElementRef, ReactElement, ReactNode, SVGProps, forwardRef } from 'react'
import * as DropdownRadixMenu from '@radix-ui/react-dropdown-menu'

import { DotsIcon } from '@/assets/icons'
import { Button } from '../button'

import s from './dropdown-menu.module.scss'
import { Typography } from '../typography'

type PropsType = {
  buttonIcon?: ReactNode
  options: {
    title: string
    icon: (props: SVGProps<SVGSVGElement>) => ReactElement
  }[]
} & DropdownRadixMenu.DropdownMenuProps &
  DropdownRadixMenu.DropdownMenuContentProps

export const DropdownMenu = forwardRef<ElementRef<typeof DropdownRadixMenu.Root>, PropsType>(
  (props: PropsType, ref) => {
    const { buttonIcon = <DotsIcon />, options, align = 'end', ...rest } = props

    return (
      <DropdownRadixMenu.Root>
        <DropdownRadixMenu.Trigger asChild>
          <Button variant="withIcon">{buttonIcon}</Button>
        </DropdownRadixMenu.Trigger>

        <DropdownRadixMenu.Portal>
          <DropdownRadixMenu.Content className={s.content} align={align} ref={ref}>
            {options.map(({ title, icon: Icon }) => {
              return (
                <DropdownRadixMenu.Item key={title} className={s.item}>
                  <Icon />
                  <Typography variant="regular_text_14">{title}</Typography>
                </DropdownRadixMenu.Item>
              )
            })}
          </DropdownRadixMenu.Content>
        </DropdownRadixMenu.Portal>
      </DropdownRadixMenu.Root>
    )
  }
)
