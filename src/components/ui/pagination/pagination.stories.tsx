import { useState } from 'react'

import { Pagination } from '@/components'

const meta = {
  title: 'Components/UI/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/M7753HAzy0tm9rQWyRBrnI/Inctagram?type=design&node-id=1787-9974&mode=dev',
    },
  },
}

export default meta

const PaginationWithHooks = () => {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState('8')
  const TOTAL_PAGES_COUNT = 10

  return (
    <Pagination
      count={TOTAL_PAGES_COUNT}
      page={page}
      onChange={setPage}
      perPage={perPage}
      onPerPageChange={setPerPage}
      perPageOptions={[5, 8, 12, 100]}
    />
  )
}

export const Default = {
  render: () => <PaginationWithHooks />,
}
