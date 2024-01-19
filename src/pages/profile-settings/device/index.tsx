import React from 'react'
import { getSettingsTabLayout } from '@/components/layout/settings-tabs-layout/settings-tab-layout'
import { Devices } from '@/components/devices'

const Device = () => {
  return (
    <>
      <Devices />
    </>
  )
}

Device.getLayout = getSettingsTabLayout
export default Device
