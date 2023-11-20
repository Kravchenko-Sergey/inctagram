import { useEffect, useState } from 'react'
import { useTranslation } from '@/hooks/use-translation'
import { hoursTime, min } from '@/consts/time-declination'

export const useTimeAgo = (createdAt: Date) => {
  const [timeAgo, setTimeAgo] = useState<string>('')
  const { t } = useTranslation()

  useEffect(() => {
    const calculateTimeAgo = () => {
      const difference = new Date().getTime() - new Date(createdAt).getTime()
      const sec = Math.round(difference / 1000)

      if (sec < 60) {
        setTimeAgo(t.data.lessMinuteAgo)

        return
      }
      const minutes = Math.round(sec / 60)

      if (minutes < 60) {
        setTimeAgo(
          `${minutes}  ${
            // eslint-disable-next-line no-nested-ternary
            minutes === 1
              ? t.data.minute
              : // eslint-disable-next-line no-nested-ternary
              min.minut.includes(minutes)
              ? t.data.minut
              : // eslint-disable-next-line no-nested-ternary
              min.minuteB.includes(minutes)
              ? t.data.minuteB
              : min.minuteU.includes(minutes)
              ? t.data.minuteU
              : t.data.minutes
          }    ${t.data.ago} `
        )

        return
      }

      const hours = Math.round(minutes / 60)

      if (hours < 24) {
        setTimeAgo(
          // eslint-disable-next-line no-nested-ternary
          `${hours} ${
            // eslint-disable-next-line no-nested-ternary
            hours === 1
              ? t.data.hour
              : // eslint-disable-next-line no-nested-ternary
              hours === 21
              ? t.data.hours21
              : hoursTime.hours.includes(hours)
              ? t.data.hoursA
              : t.data.hours
          } ${t.data.ago} `
        )

        return
      }

      const days = Math.round(hours / 24)

      if (days < 14) {
        setTimeAgo(
          // eslint-disable-next-line no-nested-ternary,no-constant-condition
          `${days} ${days === 1 ? t.data.day : days === 2 || 3 || 4 ? t.data.days2 : t.data.days} ${
            t.data.ago
          }`
        )

        return
      }

      setTimeAgo(t.data.more2Weeks)
    }

    calculateTimeAgo()
  }, [createdAt, t])

  return timeAgo
}
