import type { Meta, StoryObj } from '@storybook/react'
import { Tabs, TabsContent} from './tabs'
import {useState} from "react";
import {Card} from "@/components";

const meta = {
  title: 'UI Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/M7753HAzy0tm9rQWyRBrnI/Inctagram?type=design&node-id=306-7411&mode=dev',
    },
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

const tabsList = [
  { value: 'tab1', label: 'Account' ,disabled:false},
  { value: 'tab2', label: 'Submit' ,disabled:false},
  { value: 'tab3', label: 'Change',disabled:false },
  { value: 'tab4', label: 'Password', disabled: true },
  { value: 'tab5', label: 'Email', disabled: true },
]

export const Large: Story = {
  args: {
    tabs: tabsList,
  },
}

export const TabsWithContent = {




  render:()=>{

    const [tabsContentValue,setTabsContentValue] = useState('1')

    const tabsList = [
      { value: '1', label: 'General information' ,disabled:false},
      { value: '2', label: 'Devices' ,disabled:false},
      { value: '3', label: 'Account Management',disabled:false },
      { value: '4', label: 'My payments', disabled: false },
    ]


    const onTabsChangeHandler = (value:string)=>{
      setTabsContentValue(value)
    }




      return (

            <Tabs tabs={tabsList} onValueChange={onTabsChangeHandler}  value={tabsContentValue}>
              <Card style={{
                display:'flex',
                flexDirection:'column',
                height:'500px',
                alignItems:'center',
                justifyContent:'center',
                marginTop:'20px'
              }}>
                <TabsContent value={'1'}>
                <div>General information</div>
              </TabsContent>
                <TabsContent value={'2'}>
                  <div>Devices</div>
                </TabsContent>
                <TabsContent value={'3'}>
                  <div>Account Management</div>
                </TabsContent>
                <TabsContent value={'4'}>
                  <div>My payments</div>
                </TabsContent>
              </Card>
            </Tabs>

      )
  }

}
