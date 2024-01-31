import React, { ReactNode } from 'react'
import {
  useDeleteAllSessionsMutation,
  useDeleteSessionsByIdMutation,
  useGetAllUserSessionsQuery,
} from '@/services/devices/devices-api'
import s from './devices.module.scss'
import { Button, Card, Typography } from '@/components'
import { useTranslation } from '@/hooks'
import {
  ChromeIcon,
  DesktopIcon,
  FireFoxIcon,
  LogOut,
  MobileIcon,
  OperaIcon,
  SafariIcon,
  YandexIcon,
} from '@/assets/icons'
import { format } from 'date-fns'

export const Devices = () => {
  const { data, isLoading } = useGetAllUserSessionsQuery()
  const [deleteSessionsByID] = useDeleteSessionsByIdMutation()
  const { t } = useTranslation()

  const versionOS = {
    Chrome: <ChromeIcon />,
    Safari: <SafariIcon />,
    Firefox: <FireFoxIcon />,
    Opera: <OperaIcon />,
    Yandex: <YandexIcon />,
  } as Record<string, ReactNode>
  const [deleteAllSessions] = useDeleteAllSessionsMutation()

  return (
    <div className={s.container}>
      <Typography className={s.cardSubtitle} variant="h3">
        {t.devices.currentDevice}
      </Typography>
      <Card className={s.cardContainer}>
        <div className={s.dateContainer}>
          <div className={s.icon}>{data && versionOS[data[0].browserName]}</div>
          <div className={s.info}>
            <Typography className={s.browserTitle} variant="bold_text_16">
              {data && data[0].browserName}
            </Typography>
            <Typography variant="regular_text_14">IP: {data && data[0].ip}</Typography>
          </div>
        </div>
      </Card>
      <div className={s.btnWrap}>
        <Button onClick={() => deleteAllSessions()} variant="ghost">
          {t.devices.terminateAll}
        </Button>
      </div>
      <Typography className={s.cardSubtitle} variant="h3">
        {t.devices.activeSessions}
      </Typography>
      {data?.map(item => (
        <div key={item.deviceId}>
          <Card className={s.cardContainer}>
            <div className={s.dateContainer}>
              <div className={s.iconSmall}>
                {item.deviceType === 'mobile' ? <MobileIcon /> : <DesktopIcon />}
              </div>
              <div className={s.info}>
                <Typography className={s.browserTitle} variant="bold_text_16">
                  {item.deviceName}
                </Typography>
                <Typography className={s.browserIPActive} variant="regular_text_14">
                  IP: {item.ip}
                </Typography>
                <Typography className={s.browserIPActive} variant="regular_text_14">
                  {t.devices.lastVisit}
                  {format(new Date(item.lastActive), 'dd.MM.yyyy')}
                </Typography>
              </div>
              <div className={s.logOut}>
                <Button
                  onClick={() => deleteSessionsByID({ deviceId: item.deviceId })}
                  variant="withIcon"
                >
                  <LogOut className={s.logOutIcon} />
                  <Typography className={s.logOutTitle} variant="regular_text_14">
                    {t.profile.titleLogOut}
                  </Typography>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  )
}
