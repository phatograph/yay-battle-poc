import React from 'react'
// import {useSelector} from 'react-redux'
import {useRouter} from 'next/router'
// import {isNil} from 'lodash'

import {_t} from '@lib/helpers'

export const useLocale = () => {
  const router = useRouter()
  const t = _t(router.locale)

  return [t]
}

export const useMounted = () => {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return mounted
}
