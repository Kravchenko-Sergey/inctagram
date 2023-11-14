import { SVGProps } from 'react'

export const TrashIcon = ({ width = 24, height = 24, ...props }: SVGProps<SVGSVGElement>) => (
  <svg width={width} height={height} fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M21 6h-5V4.33A2.42 2.42 0 0013.5 2h-3A2.42 2.42 0 008 4.33V6H3a1 1 0 100 2h1v11a3 3 0 003 3h10a3 3 0 003-3V8h1a1 1 0 100-2zM10 4.33c0-.16.21-.33.5-.33h3c.29 0 .5.17.5.33V6h-4V4.33zM18 19a1 1 0 01-1 1H7a1 1 0 01-1-1V8h12v11z"
    ></path>
  </svg>
)
