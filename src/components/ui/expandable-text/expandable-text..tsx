import ShowMoreText from 'react-show-more-text'
import s from './expandable-text.module.scss'
import { useTranslation } from '@/hooks'

type ExpandableTextProps = {
  text: string | null
  className?: string
  callback?: () => void
}

export const ExpandableText = ({ text, callback }: ExpandableTextProps) => {
  const { t } = useTranslation()

  const executeOnClick = () => {
    // callback!()
  }

  return (
    <ShowMoreText
      lines={2}
      more={t.showMore}
      less={t.hide}
      className={s.root}
      anchorClass={s.anchor}
      // className="content-css"
      // anchorClass="show-more-less-clickable"
      onClick={executeOnClick}
      expanded={false}
      // width={280}
      truncatedEndingComponent={' '}
    >
      {text}
    </ShowMoreText>
  )
}
