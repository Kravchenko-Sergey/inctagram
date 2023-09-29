import React from 'react'

import { useRouter } from 'next/router'

const Github = () => {
  const { query } = useRouter()

  console.log('value', query.accessToken)

  return <></>
}

export default Github
