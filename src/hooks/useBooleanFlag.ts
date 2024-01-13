import { useCallback, useState } from 'react'

type UseToggleOpenReturn = {
  isTrue: boolean
  toggleFlag: () => void
  setTrue: () => void
  setFalse: () => void
}

export const useBooleanFlag = (
  initialValue: boolean = false,
  extraCondition: boolean = true
): UseToggleOpenReturn => {
  const [isTrue, setIsTrue] = useState<boolean>(initialValue)

  const toggleFlag = useCallback(() => setIsTrue(isTrue => !isTrue), [])
  const setTrue = useCallback(() => {
    if (extraCondition) setIsTrue(true)
  }, [extraCondition])
  const setFalse = useCallback(() => {
    if (extraCondition) setIsTrue(false)
  }, [extraCondition])

  return { isTrue, toggleFlag, setTrue, setFalse }
}
