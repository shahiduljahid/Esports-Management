import React, { useEffect, useState } from 'react'
// nodejs library that concatenates classes
import classNames from 'classnames'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'

// @material-ui/icons

// core components
import Header from '/components/Header/Header.js'
import Footer from '/components/Footer/Footer.js'
import GridContainer from '/components/Grid/GridContainer.js'
import GridItem from '/components/Grid/GridItem.js'
import Button from '/components/CustomButtons/Button.js'
import HeaderLinks from '/components/Header/HeaderLinks.js'
import Parallax from '/components/Parallax/Parallax.js'

import styles from '/styles/jss/nextjs-material-kit/pages/landingPage.js'

// Sections for this page
import ProductSection from '/pages-sections/LandingPage-Sections/ProductSection.js'
import TeamSection from '/pages-sections/LandingPage-Sections/TeamSection.js'
import WorkSection from '/pages-sections/LandingPage-Sections/WorkSection.js'

import homeStyle from '../components/Header/Header.module.css'
import logoImage from '../assets/esGroundOnlyLogo.png'
import preloader from '../assets/preloader.gif'

import Image from 'next/image'
import Layout from './../Layout/Layout';

const dashboardRoutes = []

const useStyles = makeStyles(styles)

export default function LandingPage(props) {
  const [loading, setLoading] = useState(true)
  const classes = useStyles()
  const { ...rest } = props
  const sliderImages = [
    '/img/slider/heroBg1.jpg',
    '/img/slider/heroBg2.jpg',
    '/img/slider/heroBg3.png',
    '/img/slider/heroBg4.jpg',
    '/img/slider/heroBg5.png',
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

const loader = ()=>{
  setTimeout(()=>{
    setLoading(false)
  },1000)
}
loader();

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
            <Image src={preloader} />
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
                        src={logoImage}
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
                    A esports management system
                  </p>

                  <br />
                </GridItem>
              </GridContainer>
            </div>
          </Parallax>
          <div className={homeStyle.backGround}>
            <div className={classNames(classes.main, classes.mainRaised)}>
              <div className={homeStyle.backGround}>
                {' '}
                <div className={classes.container}>
                  <ProductSection />
                  <TeamSection />
                  <WorkSection />
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
