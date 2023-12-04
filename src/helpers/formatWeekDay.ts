import { capitalizeFirstLetter } from '@/helpers/capitalizeFirstLetter'

export const formatWeekDay = (day: string) => capitalizeFirstLetter(day.substring(0, 2))
