import { SVGProps, memo } from 'react'

export const ArrowRight = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" {...props}>
    <g clipPath="url(#a)">
      <path fill="currentColor" d="m5.7 11 3-3-3-3 1-1 4 4-4 4-1-1Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="var(--light-100)" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
)
const Memo = memo(ArrowRight)

export { Memo as ReactComponent }
