import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'

// core components
import GridContainer from '/components/Grid/GridContainer.js'
import GridItem from '/components/Grid/GridItem.js'
import Button from '/components/CustomButtons/Button.js'
import Parallax from '/components/Parallax/Parallax.js'
import styles from '/styles/jss/nextjs-material-kit/pages/landingPage.js'
import homeStyle from '../components/Header/Header.module.css'
import Image from 'next/image'
import Layout from './../Layout/Layout'
import OverViewSection from '/components/Home/OverViewSection'
import ContactSection from '/components/Home/ContactSection'
import FeaturedSection from '../components/Home/FeaturedSection'
import FaqSection from '../components/Home/FaqSection'
import Link from 'next/link'

const dashboardRoutes = []

const useStyles = makeStyles(styles)

export default function LandingPage(props) {
  const [loading, setLoading] = useState(true)
  const classes = useStyles()
  const { ...rest } = props
  const sliderImages = [
    '/img/slider/heroBg.jpg',
    '/img/slider/heroBg2.jpg',
    '/img/slider/heroBg3.jpg',
    '/img/slider/heroBg4.jpg',
    '/img/slider/heroBg5.jpg',
  ]
  const [sliderIndex, setSliderIndex] = useState(0)
  const timer = () => setSliderIndex(sliderIndex + 1)

  useEffect(() => {
    if (sliderIndex >= sliderImages.length) {
      setSliderIndex(0)
      return
    }
    const id = setInterval(timer, 6000)
    return () => clearInterval(id)
  }, [sliderIndex])

  const loader = () => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }
  loader()

  return (
    <div>
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
        <Layout>
          <Parallax
            className={homeStyle.container}
            filter
            responsive
            image={sliderImages[sliderIndex]}
          >
            <div
              style={{ marginTop: '100px', marginBottom: '100px' }}
              className={classes.container}
            >
              <GridContainer>
                <GridItem xs={12}>
                  <GridContainer
                    style={{ display: 'flex', justifyContent: 'center' }}
                    justifyContent="center"
                    spacing={1}
                  >
                    <GridItem data-aos="fade-right" xs={4}>
                      {' '}
                      <Image
                        src={'/img/assets/esGroundOnlyLogo.png'}
                        alt="logo"
                        width={300}
                        height={300}
                      />
                    </GridItem>
                    <GridItem xs={4}>
                      <h1 data-aos="fade-left" className={homeStyle.heroTitle}>
                        <span>ESPORTS</span> <br /> <span>GROUND</span>
                      </h1>

                      {/* <h2 className={textStyle.heroTitle}>Third Party Certificate Oman</h1> */}
                    </GridItem>
                  </GridContainer>

                  <p data-aos="zoom-in" className={homeStyle.subtitle}>
                    A esports management Platform
                  </p>

                  <br />
                </GridItem>
                <GridItem
                  data-aos="fade-up"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                  xs={12}
                  sm={12}
                  md={12}
                  className={classes.textCenter}
                >
                  <Link href="/dashboard">
                    <Button round color="danger" target="_blank">
                      GET STARTED
                    </Button>
                  </Link>
                </GridItem>
              </GridContainer>
            </div>
          </Parallax>
          <div>
            <div className={classNames(classes.main, classes.mainRaised)}>
              <div className={homeStyle.backGround}>
                {' '}
                <div className={classes.container}>
                  <OverViewSection />
                  <FeaturedSection />
                  <FaqSection />
                  <ContactSection />
                </div>
              </div>
            </div>
          </div>
        </Layout>
      )}

      {/* landing-bg.jpg */}
    </div>
  )
}
