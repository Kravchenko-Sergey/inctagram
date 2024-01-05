import React from 'react'
import {
  Column,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import s from './profile-payments.module.scss'
import { Payment } from '@/services/subscriptions'

const tableHeader: Column[] = [
  { title: 'Date of Payment', key: '0' },
  { title: 'End date of subscription', key: '1' },
  { title: 'Price', key: '2' },
  { title: 'Subscription Type', key: '3' },
  { title: 'Payment Type', key: '4' },
]

const data1: Payment[] = [
  {
    userId: 1,
    subscriptionId: 'sffffgrgg',
    dateOfPayment: '2024-01-05T16:53:17.270Z',
    endDateOfSubscription: '2024-01-05T16:53:17.270Z',
    price: 55,
    subscriptionType: 'MONTHLY',
    paymentType: 'PAYPAL',
  },
  {
    userId: 2,
    subscriptionId: 'sfgrgg',
    dateOfPayment: '2024-01-05T16:53:17.270Z',
    endDateOfSubscription: '2023-01-05T16:53:17.270Z',
    price: 45,
    subscriptionType: 'DAY',
    paymentType: 'STRIPE',
  },
]

export const ProfilePayments = () => {
  return (
    <div>
      <Table>
        <TableHeader columns={tableHeader} />
        <TableBody>
          {data1?.map(item => {
            return (
              <TableRow key={item.subscriptionId}>
                <TableCell>
                  <div
                    style={{ wordBreak: 'break-word', display: 'flex', flexDirection: 'column' }}
                  >
                    {item.dateOfPayment}
                  </div>
                </TableCell>
                <TableCell>
                  <div
                    style={{ wordBreak: 'break-word', display: 'flex', flexDirection: 'column' }}
                  >
                    {item.endDateOfSubscription}
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
                    {item.subscriptionType}
                  </div>
                </TableCell>
                <TableCell>
                  <div
                    style={{ wordBreak: 'break-word', display: 'flex', flexDirection: 'column' }}
                  >
                    {item.paymentType}
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
