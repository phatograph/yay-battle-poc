import * as React from 'react'
// import cx from 'classnames'
// import Link from 'next/link'
// import {useRouter} from 'next/router'

const Index = ({}) => {
  const [__count, __countSet] = React.useState(10)

  const endBattle = () => {
    if (
      window.webkit &&
      window.webkit.messageHandlers.bridge &&
      window.webkit.messageHandlers.bridge.postMessage
    ) {
      window.webkit.messageHandlers.bridge.postMessage('{"event": "finish"}')
    }

    if (window.Android && window.Android.onButtonClick) {
      window.Android.onButtonClick('skipBtn')
    }
  }

  const ticker = () => {
    __countSet((prevState) => {
      return prevState - 1
    })
  }

  React.useEffect(() => {
    if (__count > 0) {
      window.setTimeout(() => {
        ticker()
      }, 1000)
    }
  }, [__count])

  return (
    <div className='Index'>
      <div className='Index__wrapper'>
        <a
          className='Button'
          onClick={() => {
            endBattle()
          }}
        >
          Skip battle
        </a>

        <p className='Index__p'>
          {__count > 0
            ? `Battle will automatically end in ${__count} seconds.`
            : 'Battle ended.'}
        </p>
      </div>
    </div>
  )
}

export default Index

Index.getLayout = function getLayout(page: React.ReactElement) {
  return page
}
