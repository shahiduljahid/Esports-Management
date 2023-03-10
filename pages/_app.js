import React from 'react'
import ReactDOM from 'react-dom'
import App from 'next/app'
import Head from 'next/head'
import Router from 'next/router'
import { SnackbarProvider } from 'notistack'
import PageChange from '/components/PageChange/PageChange.js'
import '/styles/scss/nextjs-material-kit.scss?v=1.2.0'
import '/styles/css/app.css'
import { AuthProvider } from '../lib/auth'

Router.events.on('routeChangeStart', (url) => {
  document.body.classList.add('body-page-transition')
  ReactDOM.render(<PageChange />, document.getElementById('page-transition'))
})
Router.events.on('routeChangeComplete', () => {
  ReactDOM.unmountComponentAtNode(document.getElementById('page-transition'))
  document.body.classList.remove('body-page-transition')
})
Router.events.on('routeChangeError', () => {
  ReactDOM.unmountComponentAtNode(document.getElementById('page-transition'))
  document.body.classList.remove('body-page-transition')
})

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props
    const Layout = Component.layout || (({ children }) => <>{children}</>)
    return (
      <React.Fragment>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <title>ESPORTS GROUND </title>
        </Head>{' '}
        <SnackbarProvider maxSnack={3}>
          <AuthProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AuthProvider>{' '}
        </SnackbarProvider>
      </React.Fragment>
    )
  }
}
