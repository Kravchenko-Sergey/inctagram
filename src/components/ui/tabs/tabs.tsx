import {ComponentPropsWithoutRef, MouseEventHandler, ReactNode} from 'react'

import * as TabsRadixUI from '@radix-ui/react-tabs'

import s from './tabs.module.scss'

export type SwitcherOptions = {
  label: string
  value: string
  disabled:boolean
}

//Тут изменил onChange на onValueChange так как ругался TS когда передавал в onChange свою функцию
type TabsProps = {
  tabs: SwitcherOptions[]
  content?:ReactNode
  disabled?: boolean
  className?: string
} & ComponentPropsWithoutRef<typeof TabsRadixUI.Root>

export const Tabs = (
    {
      tabs,
      children,
      value,
      defaultValue,
      className,
      content,
      ...rest
    }: TabsProps
) => {


  return (
    <TabsRadixUI.Root className={className} value={value} defaultValue={defaultValue} {...rest}>
      <TabsRadixUI.List className={s.tabsList}>
        {tabs?.map(tab => (
          <TabsRadixUI.Trigger
            className={`${s.item} ${tab.disabled ? s.disabled : ''}`}
            key={tab.value}
            value={tab.value}
            disabled={tab.disabled}
          >
            {tab.label}
          </TabsRadixUI.Trigger>
        ))}
      </TabsRadixUI.List>
        <div>{children}</div>
    </TabsRadixUI.Root>
  )
}

type ContentForTabsProps = {

} & ComponentPropsWithoutRef<typeof TabsRadixUI.Content>
export const TabsContent = (
    {
        value,
        children,
        ...rest
    }:ContentForTabsProps
)=>{
    return (
        <TabsRadixUI.Content value={value} {...rest}>
            {children}
        </TabsRadixUI.Content>
    )
}
