import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useApollo } from '../lib/apolloClient'
import { ApolloProvider } from '@apollo/client'
import Link from 'next/link'

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps)
  return (
    <ApolloProvider client={apolloClient}>
      <div>
        <div style={{ height: 50, backgroundColor: 'pink' }}>
          <Link href="/">
            <a>Home</a>
          </Link>
        </div>
        <Component {...pageProps} />
      </div>
    </ApolloProvider>
  )
}

export default MyApp
