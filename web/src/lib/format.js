export function timeAgo(isoDate) {
  if (!isoDate) return ''
  const seconds = Math.floor((Date.now() - new Date(isoDate).getTime()) / 1000)
  const units = [
    ['year', 31536000],
    ['month', 2592000],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ]
  for (const [name, secs] of units) {
    const value = Math.floor(seconds / secs)
    if (value >= 1) return `Posted ${value} ${name}${value > 1 ? 's' : ''} ago`
  }
  return 'Posted just now'
}
