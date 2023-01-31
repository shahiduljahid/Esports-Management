import React from 'react'
// react component for creating beautiful carousel
import Carousel from 'react-slick'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'

// core components
import GridContainer from '/components/Grid/GridContainer.js'
import GridItem from '/components/Grid/GridItem.js'
import Card from '/components/Card/Card.js'
import homeStyle from '/Components/Header/Header.module.css'
import styles from '/styles/jss/nextjs-material-kit/pages/componentsSections/carouselStyle.js'
import Components from './../../pages/components'
const useStyles = makeStyles(styles)

const CustomCarousel = ({ data }) => {
  const { image1, image2, image3 } = data[0]
  const classes = useStyles()
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  }
  return (
    <div>
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12} className={classes.marginAuto}>
            <Card carousel>
              <Carousel {...settings}>
                <div>
                  <img
                    className={`slick-image ${homeStyle.slideImg}`}
                    src={image1}
                    alt="First slide"
                  />
                </div>
                <div>
                  <img
                    src={image2}
                    alt="second slide"
                    className={` slick-image ${homeStyle.slideImg}`}
                  />
                </div>
                <div>
                  <img
                    src={image3}
                    alt="Third slide"
                    className={`slick-image ${homeStyle.slideImg} `}
                  />
                </div>
              </Carousel>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  )
}

export default CustomCarousel
