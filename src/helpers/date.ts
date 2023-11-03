export const getTimeAgo = (createdAt: Date) => {
  const difference = new Date().getTime() - new Date(createdAt).getTime()

  const sec = Math.round(difference / 1000)

  if (sec < 60) {
    return 'Less than minute ago'
  }

  const minutes = Math.round(sec / 60)

  if (minutes < 60) {
    return `${minutes} minutes ago`
  }

  const hours = Math.round(minutes / 60)

  if (hours < 24) {
    return `${hours} hours ago`
  }

  const days = Math.round(hours / 24)

  if (days < 14) {
    return `${days} days ago`
  }

  return 'More than 2 weeks ago'
}
