import React from 'react'
import GridContainer from '/components/Grid/GridContainer.js'
import GridItem from '/components/Grid/GridItem.js'
import homeStyle from '../Header/Header.module.css'
import Image from 'next/image'

const OverViewSection = () => {
  const data = [
    {
      id: 1,
      image: '/img/land-home-img-5.jpg',
      subImage: '/img/landing-logo-4.png',
      text: 'text',
      title: 'title',
    },
    {
      id: 2,
      image: '/img/land-home-img-6.jpg',
      subImage: '/img/landing-logo-2.png',
      text: 'text',
      title: 'title',
    },
  ]
  return (
    <div>
      <div>
        <GridContainer>
          <GridItem xs={12}>
            {' '}
            <h1
              style={{
                paddingTop: '50px',
                paddingLeft: '10px',
                position: 'relative',
              }}
              className={homeStyle.overViewTitle}
            >
              ESPORTS AND GAMING <br />
              GOLIATH{' '}
              <p className={homeStyle.rotatedLeftText}>
                <span
                  style={{
                    color: '#7d63e9',
                  }}
                >
                  {' '}
                  ##{' '}
                </span>{' '}
                DOMINATION{' '}
              </p>{' '}
            </h1>{' '}
          </GridItem>
          {data.map((ele) => {
            return (
              <GridItem
                key={ele.id}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: '50px',
                }}
                xs={12}
                md={6}
              >
                <div
                  style={{ backgroundImage: `url(${ele.image})` }}
                  className={homeStyle.overViewImage}
                ></div>
                <div className={homeStyle.overViewSubImage}>
                  <Image
                    src={ele.subImage}
                    alt="overViewSubImage"
                    width={200}
                    height={200}
                  />
                </div>
              </GridItem>
            )
          })}{' '}
        </GridContainer>{' '}
      </div>{' '}
    </div>
  )
}

export default OverViewSection
