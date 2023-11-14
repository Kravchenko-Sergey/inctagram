import { SVGProps } from 'react'

export const EditPencilIcon = ({ width = 24, height = 24, ...props }: SVGProps<SVGSVGElement>) => (
  <svg width={width} height={height} fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M19 20H5a1 1 0 000 2h14a1 1 0 000-2zM5 18h.09l4.17-.38a2 2 0 001.21-.57l9-9a1.92 1.92 0 00-.07-2.71L16.66 2.6A2 2 0 0014 2.53l-9 9a2 2 0 00-.57 1.21L4 16.91A1 1 0 005 18zM15.27 4L18 6.73l-2 1.95L13.32 6l1.95-2zm-8.9 8.91L12 7.32l2.7 2.7-5.6 5.6-3 .28.27-2.99z"
    ></path>
  </svg>
)
