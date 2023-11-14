import { SVGProps } from 'react'

export const DotsIcon = ({ width = 24, height = 24, ...props }: SVGProps<SVGSVGElement>) => (
  <svg width={width} height={height} fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM19 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM5 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
    />
  </svg>
)
