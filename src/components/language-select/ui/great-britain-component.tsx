import Image from 'next/image'

import enIcon from './../../../../public/en.png'

import { Typography } from '@/components/typography'
import { useTranslation } from '@/hooks/use-translation'

export const GreatBritainComponent = () => {
  const { t } = useTranslation()

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ marginRight: '5px', display: 'flex', alignItems: 'center' }}>
        <Image width={24} height={24} src={enIcon} alt=" Great Britain flag" />
      </div>
      <Typography variant="regular_text_16">{t.languageSelect.english}</Typography>
    </div>
  )
}
