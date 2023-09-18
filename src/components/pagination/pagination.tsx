import { FC } from 'react'

import { Select } from '../select'

import s from './pagination.module.scss'

import { ArrowLeft } from '@/assets/icons/arrow-left'
import { ArrowRight } from '@/assets/icons/arrow-right'
import { usePagination } from '@/components/pagination/use-pagination'

export type PaginationProps = {
  count: number
  siblings?: number
  page: number
  onChange: (pageNumber: number) => void
  perPage?: string
  perPageOptions?: number[]
  onPerPageChange?: (itemPerPage: string) => void
}
export const Pagination: FC<PaginationProps> = ({
  page,
  count,
  siblings,
  onChange,
  perPage,
  perPageOptions,
  onPerPageChange,
}) => {
  const {
    paginationRange,
    isFirstPage,
    isLastPage,
    handleMainPageClicked,
    handleNextPageClicked,
    handlePreviousPageClicked,
  } = usePagination({ page, count, siblings, onChange })

  const showPerPageSelect = !!perPage && !!perPageOptions && !!onPerPageChange

  return (
    <div className={s.root}>
      <div className={s.container}>
        <button className={s.item} disabled={isFirstPage} onClick={handlePreviousPageClicked}>
          <span className={s.icon}>
            <ArrowLeft />
          </span>
        </button>

        {paginationRange.map((el: number | string, index) => {
          if (typeof el !== 'number') {
            return (
              <span className={s.dots} key={index}>
                &#8230;
              </span>
            )
          }

          return (
            <button
              key={index}
              onClick={handleMainPageClicked(el)}
              className={`${s.item} ${el === page && s.selected}`}
              disabled={el === page}
            >
              {el}
            </button>
          )
        })}

        <button className={s.item} disabled={isLastPage} onClick={handleNextPageClicked}>
          <span className={s.icon}>
            <ArrowRight />
          </span>
        </button>
      </div>
      {showPerPageSelect && (
        <div className={s.selectBox}>
          show
          <Select
            value={perPage}
            onChange={onPerPageChange}
            options={perPageOptions?.map(el => ({ label: `${el}`, value: `${el}` }))}
          />
          per page
        </div>
      )}
    </div>
  )
}
