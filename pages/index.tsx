import * as React from 'react'
// import cx from 'classnames'
// import Link from 'next/link'
// import {useRouter} from 'next/router'

const Index = ({}) => {
  return (
    <div className='Index'>
      <a
        className='Button'
        onClick={() => {
          if (
            window.webkit &&
            window.webkit.messageHandlers.bridge &&
            window.webkit.messageHandlers.bridge.postMessage
          ) {
            window.webkit.messageHandlers.bridge.postMessage(
              '{"event": "finish"}'
            )
          }

          if (window.Android && window.Android.onButtonClick) {
            window.Android.onButtonClick('skipBtn')
          }
        }}
      >
        Skip battle
      </a>
    </div>
  )
}

export default Index

Index.getLayout = function getLayout(page: React.ReactElement) {
  return page
}
