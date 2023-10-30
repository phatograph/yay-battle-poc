import * as React from 'react'
// import cx from 'classnames'
// import Link from 'next/link'
// import {useRouter} from 'next/router'

const Layout = ({children}) => {
  return (
    <div className='Layout'>
      <div className='Main'>{children}</div>
    </div>
  )
}

export default Layout
