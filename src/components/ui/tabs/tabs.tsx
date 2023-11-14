import { MouseEventHandler } from 'react'

import * as TabsRadixUI from '@radix-ui/react-tabs'

import s from './tabs.module.scss'

type Tab = {
  value: string
  title: string
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
  disabled?: boolean
}

type TabsProps = {
  tabsList: Tab[]
}

export const Tabs = ({ tabsList }: TabsProps) => {
  const defaultValue = tabsList[0].value

  return (
    <TabsRadixUI.Root className={s.tabsRoot} defaultValue={defaultValue}>
      <TabsRadixUI.List className={s.tabsList}>
        {tabsList.map(tab => (
          <TabsRadixUI.Trigger
            className={`${s.item} ${tab.disabled ? s.disabled : ''}`}
            key={tab.value}
            value={tab.value}
            disabled={tab.disabled}
            onClick={tab.onClick}
          >
            {tab.title}
          </TabsRadixUI.Trigger>
        ))}
      </TabsRadixUI.List>
    </TabsRadixUI.Root>
  )
}
