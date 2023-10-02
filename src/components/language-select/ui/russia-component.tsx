import Image from 'next/image'

import ruIcon from 'public/ru.png'

import { Typography } from '@/components/typography'
import { useTranslation } from '@/hooks/use-translation'

export const RussiaComponent = () => {
  const { t } = useTranslation()

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ marginRight: '5px', display: 'flex', alignItems: 'center' }}>
        <Image width={24} height={24} src={ruIcon} alt=" Russia flag" />
      </div>
      <Typography variant="regular_text_16">{t.languageSelect.russian}</Typography>
    </div>
  )
}
