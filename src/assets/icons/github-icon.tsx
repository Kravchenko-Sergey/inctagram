import { SVGProps, memo } from 'react'

const GitHubIcon = ({ width, height, ...props }: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 36 36" width={width} height={height} fill="none" {...props}>
    <g>
      <path
        fill="#fff"
        d="M17.71.72h.14c3.23 0 6.25.88 8.83 2.42l-.07-.05A17.79 17.79 0 0 1 33 9.46l.05.09a17.75 17.75 0 0 1-9.6 25.67l-.14.03a1.04 1.04 0 0 1-.92-.16.9.9 0 0 1-.3-.67v-.02a1429.63 1429.63 0 0 1 .04-5.23 4.1 4.1 0 0 0-1.22-2.91c.9-.1 1.7-.24 2.48-.44l-.11.02a9.37 9.37 0 0 0 2.21-.92l-.04.02c.73-.4 1.35-.91 1.86-1.52v-.01c.54-.69.96-1.5 1.22-2.37v-.05c.31-.98.48-2.11.48-3.29v-.2.02-.1c0-1.8-.7-3.44-1.82-4.66a6.02 6.02 0 0 0-.2-4.73l.02.03a2.96 2.96 0 0 0-1.89.26h.02c-.82.3-1.52.64-2.18 1.04l.05-.03-.87.55a16.68 16.68 0 0 0-8.97.03l.11-.03-.98-.62c-.54-.3-1.17-.6-1.83-.86l-.1-.03a3.13 3.13 0 0 0-1.97-.3h.01a6.05 6.05 0 0 0-.17 4.74l-.01-.04a6.8 6.8 0 0 0-1.82 4.75v.18c0 1.17.17 2.3.5 3.36l-.03-.09c.27.93.69 1.73 1.22 2.44v-.02a6.26 6.26 0 0 0 1.82 1.53l.03.02c.62.36 1.34.67 2.1.88l.07.02c.67.18 1.47.32 2.3.4l.06.01a3.88 3.88 0 0 0-1.13 2.36v.02c-.3.14-.65.26-1 .34h-.04c-.37.08-.79.12-1.22.12H11a2.71 2.71 0 0 1-1.51-.5 4.09 4.09 0 0 1-1.26-1.42l-.01-.02a3.75 3.75 0 0 0-1.1-1.19H7.1c-.32-.25-.7-.44-1.12-.55l-.02-.01-.46-.07h-.11c-.2 0-.4.04-.57.1h.01c-.12.07-.16.16-.12.27a1.71 1.71 0 0 0 .5.6h.01l.16.11c.41.22.75.51 1 .87.28.35.52.74.72 1.15l.01.03.23.53c.2.58.55 1.07 1.01 1.42.44.34.96.58 1.53.7h.02c.48.09 1.03.14 1.6.16h.22c.38 0 .75-.03 1.1-.1l-.03.01.53-.09a209.23 209.23 0 0 0 .02 3.3v.02a.9.9 0 0 1-.3.67 1.04 1.04 0 0 1-.93.16A17.8 17.8 0 0 1 2.44 9.45l-.05.09a17.79 17.79 0 0 1 6.37-6.4l.08-.05A17.13 17.13 0 0 1 17.58.72h.14Zm-11 25.44c.05-.1 0-.2-.16-.28-.15-.04-.25-.03-.3.05-.05.1 0 .2.16.28.14.09.24.07.3-.05Zm.72.78c.1-.07.09-.2-.05-.36-.15-.14-.28-.17-.37-.07-.1.07-.09.2.05.36.15.16.27.18.37.07Zm.69 1.04c.14-.1.14-.25 0-.44-.12-.2-.25-.24-.4-.14-.13.08-.13.22 0 .42.15.2.28.25.4.16Zm.97.97c.12-.12.09-.27-.1-.44-.18-.18-.33-.2-.46-.07s-.1.27.1.44c.18.18.33.2.46.06v.01Zm1.31.58c.05-.17-.05-.3-.3-.37-.23-.06-.37-.01-.44.16-.06.17.04.28.3.34.23.1.38.05.44-.13Zm1.45.11c0-.2-.13-.28-.39-.25-.24 0-.37.08-.37.25 0 .2.13.29.4.25.24 0 .36-.08.36-.25Zm1.34-.23c-.03-.17-.17-.24-.41-.2-.25.04-.36.15-.33.34.04.18.17.24.42.18.25-.06.35-.17.32-.32Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h36v36H0z" />
      </clipPath>
    </defs>
  </svg>
)
const Memo = memo(GitHubIcon)

export { Memo as GitHubIcon }
