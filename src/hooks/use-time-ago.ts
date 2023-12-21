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
        let label = t.data.minutes

        switch (true) {
          case minutes === 1:
            label = t.data.minute
            break
          case min.minut.includes(minutes):
            label = t.data.minut
            break
          case min.minuteB.includes(minutes):
            label = t.data.minuteB
            break
          case min.minuteU.includes(minutes):
            label = t.data.minuteU
            break
        }

        setTimeAgo(`${minutes} ${label} ${t.data.ago}`)

        return
      }

      const hours = Math.round(minutes / 60)

      if (hours < 24) {
        let label = t.data.hours

        switch (hours) {
          case 1:
            label = t.data.hour
            break
          case 21:
            label = t.data.hours21
            break
          default:
            if (hoursTime.hours.includes(hours)) {
              label = t.data.hoursA
            }
        }

        setTimeAgo(`${hours} ${label} ${t.data.ago}`)

        return
      }

      const days = Math.round(hours / 24)

      if (days < 14) {
        let label

        switch (days) {
          case 1:
            label = t.data.day
            break
          case 2:
          case 3:
          case 4:
            label = t.data.days2
            break
          default:
            label = t.data.days
        }

        setTimeAgo(`${days} ${label} ${t.data.ago}`)

        return
      }

      setTimeAgo(t.data.more2Weeks)
    }

    calculateTimeAgo()
  }, [createdAt, t])

  return timeAgo
}
