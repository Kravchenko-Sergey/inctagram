import React, { useState } from 'react'
import { Column, Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table'
import { useMySubscriptionsQuery } from '@/services/subscriptions'
import s from './profile-payments.module.scss'
import { format } from 'date-fns'
import { Loader, Pagination } from '@/components'
import { useTranslation } from '@/hooks'

export const ProfilePayments = () => {
  const { data, isLoading } = useMySubscriptionsQuery()
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState('8')

  const { t } = useTranslation()
  const startIndex = (page - 1) * +perPage

  const displayedElements = data?.slice(startIndex, startIndex + +perPage)

  const headers: Column[] = [
    { title: t.profile.dateOfPayment, key: '0' },
    { title: t.profile.endDateSubscription, key: '1' },
    { title: t.profile.price, key: '2' },
    { title: t.profile.subscriptionType, key: '3' },
    { title: t.profile.paymentType, key: '4' },
  ]

  if (isLoading) {
    return <Loader />
  }

  const value = {
    MONTHLY: t.profile.monthly,
    DAY: t.profile.day,
    WEEKLY: t.profile.weekly,
  }

  return (
    <div className={s.root}>
      <div className={s.rootTable}>
        <Table>
          <TableHeader columns={headers} />
          <TableBody>
            {displayedElements?.map(item => {
              return (
                <TableRow key={item.subscriptionId}>
                  <TableCell>
                    <div
                      style={{ wordBreak: 'break-word', display: 'flex', flexDirection: 'column' }}
                    >
                      {format(new Date(item.dateOfPayment), 'dd.MM.yyyy')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      style={{ wordBreak: 'break-word', display: 'flex', flexDirection: 'column' }}
                    >
                      {format(new Date(item.endDateOfSubscription), 'dd.MM.yyyy')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      style={{ wordBreak: 'break-word', display: 'flex', flexDirection: 'column' }}
                    >
                      {item.price}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      style={{ wordBreak: 'break-word', display: 'flex', flexDirection: 'column' }}
                    >
                      {value[item.subscriptionType]}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      style={{ wordBreak: 'break-word', display: 'flex', flexDirection: 'column' }}
                    >
                      {item.paymentType === 'STRIPE' ? t.profile.stripe : t.profile.payPal}
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
      {data?.length! > +perPage && (
        <Pagination
          perPage={perPage}
          count={Math.ceil(data?.length! / +perPage)}
          page={page}
          onPerPageChange={setPerPage}
          perPageOptions={[5, 8, 12, 100]}
          onChange={setPage}
        />
      )}
    </div>
  )
}
