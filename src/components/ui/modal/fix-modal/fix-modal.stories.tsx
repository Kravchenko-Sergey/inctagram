import { useState } from 'react'

import type { Meta } from '@storybook/react'

import { Button, Typography } from '@/components'
import { FixModal, FixModalType } from './index'
import {HeaderContent} from "@/components/ui/modal/fix-modal/fix-modal";

export default {
  title: 'UI Components/FixModal',
  component: FixModal,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof FixModal>

const commonArgs = {
  children: (
    <>
      <Typography variant="regular_text_16">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.
      </Typography>
    </>
  ),
  open: true,
}

export const DefaultModal = {
  render: (args: FixModalType) => {
    const [open, setOpen] = useState(false)

    const handleModalClosed = () => {
      setOpen(false)
    }
    const handleModalOpened = () => {
      setOpen(true)
    }

    return (
      <>
        <Button variant="primary" onClick={handleModalOpened}>
          Open modal
        </Button>
        <FixModal {...args} open={open} onOpenChange={handleModalClosed}>
          <Typography variant="regular_text_16">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </Typography>
        </FixModal>
      </>
    )
  },
  args: {
    ...commonArgs,
    title: 'Default modal',
  },
}

export const ModalWithSaveButton = {
  render: (args: FixModalType) => {
    const [open, setOpen] = useState(false)
    const handleModalClosed = () => {
      setOpen(false)
    }
    const handleModalOpened = () => {
      setOpen(true)
    }

    return (
      <>
        <Button variant="primary" onClick={handleModalOpened}>
          Open modal
        </Button>
        <FixModal {...args} open={open} onOpenChange={handleModalClosed}>
          <>
            <Typography variant="regular_text_16">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button onClick={handleModalClosed} variant="primary">
                Save
              </Button>
            </div>
          </>
        </FixModal>
      </>
    )
  },
  args: {
    ...commonArgs,
    title: 'With One Button',
  },
}

const HeaderProps = () => {

  return (
      <>
        <button>back</button>
        <p>title</p>
        <button>next</button>
      </>
  )

}
export const ModalWithHeaderChildren = {
  render: (args: FixModalType) => {
    const [open, setOpen] = useState(false)
    const handleModalClosed = () => {
      setOpen(false)
    }
    const handleModalOpened = () => {
      setOpen(true)
    }

    const headerContentProps:HeaderContent = {
      type:'node',
      node:<HeaderProps/>
    }

    return (
        <div>
          <Button variant="primary" onClick={handleModalOpened}>
            Open modal
          </Button>
          <FixModal  open={open} onOpenChange={handleModalClosed} headerContent={headerContentProps}>
            <>
              <Typography variant="regular_text_16">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </Typography>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button onClick={handleModalClosed} variant="primary">
                  Save
                </Button>
              </div>
            </>
          </FixModal>
        </div>
    )
  },
  args: {
    ...commonArgs,
    title: 'With One Button',
  },

}
