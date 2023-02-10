import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer.js'
import HeaderLinks from '../components/Header/HeaderLinks'
import { useRouter } from 'next/router'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect ,useState } from 'react'
import { useAuth } from '../lib/auth'
import Image from 'next/image'


const Layout = ({ children, color, image, ...rest }) => {
  const { user, logOut } = useAuth()
  const dashboardRoutes = []
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const loader = () => {
    setTimeout(() => {
      if(user !=='undefine'){
         setLoading(false)
      } 
    }, 1000)
  }
  loader()
  useEffect(() => {
    Aos.init({
      easing: 'ease-out-cubic',
      duration: 1200,
    })
  }, [])

  return (
    <>
      {loading ? (
        <div
          style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#190e1f',
          }}
        >
          <div>
            {' '}
            <Image src={'/img/assets/preloader.gif'} height={300} width={200} />
          </div>
        </div>
      ) : (
        <div
          style={{
            backgroundImage: `url(${
              image ? image : '/img/landing-bckgrd.jpg'
            })`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
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
      )}
    </>
  )
}

export default Layout
