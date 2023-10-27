import { useState } from 'react'

type ExpandableTextProps = {
  text: string | null
  className?: string
}

export const ExpandableText = ({ text, className }: ExpandableTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const sentences = text?.split('. ')
  const closedText = sentences && sentences[0].split(' ')
  const preTriggerText = closedText && closedText.slice(0, -1).join(' ')
  const openTrigger = closedText && closedText.slice(-1).join(' ')
  const restText = sentences && sentences.slice(1).join('. ')

  return (
    sentences && (
      <div>
        <span>{preTriggerText}</span>
        <span onClick={() => setIsExpanded(true)} className={!isExpanded ? className : ''}>
          {isExpanded ? ` ${openTrigger}. ` : ` ${openTrigger}...`}
        </span>
        <span>{isExpanded ? restText : ''}</span>
      </div>
    )
  )
}
