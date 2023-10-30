import * as React from 'react'
import Head from 'next/head'
import smoothscroll from 'smoothscroll-polyfill'
// import {NextPage} from 'next'
import {AppProps} from 'next/app'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'

import '../css/app.scss'

import Layout from '@components/Layout'
import Redux from '@components/Redux'

// type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
//   getLayout?: (page: React.ReactElement) => React.JSX.Element
// }

type AppPropsWithLayout = AppProps & {
  Component: any
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

export default function App({
  Component,
  pageProps: {session, ...pageProps},
}: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ??
    ((page: any) => {
      return <Layout>{page}</Layout>
    })

  React.useEffect(() => {
    smoothscroll.polyfill()
  }, [])

  return (
    <Redux>
      <QueryClientProvider client={queryClient}>
        <Head>
          <meta
            name='viewport'
            key='version'
            content='width=1440, viewport-fit=cover'
          />

          <meta name='version' key='version' content='0.3' />
        </Head>

        {getLayout(<Component {...pageProps} />)}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Redux>
  )
}
