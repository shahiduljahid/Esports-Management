import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer.js'
import HeaderLinks from '../components/Header/HeaderLinks'
import { useRouter } from 'next/router'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'

const Layout = ({ children, color, ...rest }) => {
  const dashboardRoutes = []
  const router = useRouter()
  useEffect(() => {
    Aos.init({
      easing: 'ease-out-cubic',
      duration: 1200,
    })
  }, [])

  return (
    <div>
      <Header
        color={
          router.route !== '/'
            ? `${color ? color : 'transparent'}`
            : 'transparent'
        }
        routes={dashboardRoutes}
        brand=""
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: 'dark',
        }}
        {...rest}
      />
      {children}

      <Footer />
    </div>
  )
}

export default Layout
