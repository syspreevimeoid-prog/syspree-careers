import {Link} from 'react-router-dom'

// Internal links (this careers app) go through React Router; everything else is
// a plain link to the main syspree.com site.
export default function SiteLink({item, className, children, onClick}) {
  if (item.internal) {
    return (
      <Link to={item.href} className={className} onClick={onClick}>
        {children ?? item.label}
      </Link>
    )
  }
  return (
    <a href={item.href} className={className} onClick={onClick}>
      {children ?? item.label}
    </a>
  )
}
