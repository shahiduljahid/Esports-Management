import React from 'react'
import GridContainer from '/components/Grid/GridContainer.js'
import GridItem from '/components/Grid/GridItem.js'
import homeStyle from '../Header/Header.module.css'
import Image from 'next/image'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import Link from 'next/link'

const ScheduleLayoutsection = () => {
  const data = [
    {
      id: 1,
      image: '/img/demo.png',
      title: 'MATCH SCHEDULE LAYOUT',
      text:
        ' ESPORTS GROUND lets you showcase single match results in a detailed manner and in the easiest way possible. You can include match summaries, screenshots & more with this stunning premade layout.',
    },
    {
      id: 2,
      image: '/img/demo2.png',
      title: 'TOURNAMENT BANNER',
      text:
        ' ESPORTS GROUND lets you showcase single match results in a detailed manner and in the easiest way possible. You can include match summaries, screenshots & more with this stunning premade layout.',
    },
    {
      id: 3,
      image: '/img/demo3.png',
      title: 'TEAM AND PLAYER CERTIFICATES',
      text:
        ' ESPORTS GROUND lets you showcase single match results in a detailed manner and in the easiest way possible. You can include match summaries, screenshots & more with this stunning premade layout.',
    },
    {
        id: 4,
        image: '/img/demo4.png',
        title: 'FEATURE YOUR STREAMS',
        text:
          ' ESPORTS GROUND lets you showcase single match results in a detailed manner and in the easiest way possible. You can include match summaries, screenshots & more with this stunning premade layout.',
      },
  ]
  return (
    <div>
      <div>
        <GridContainer>
          <GridItem
            style={{
              display: 'flex',
              justifyContent: 'right',
              marginBottom: '50px',
            }}
            xs={12}
          >
            <h1
              style={{
                paddingTop: '50px',
                paddingLeft: '10px',
                position: 'relative',
              }}
              className={homeStyle.overViewTitle}
            >
              ELEMENTS & LAYOUTS
              <br />
              MADE JUST FOR ESPORTS
              <p className={homeStyle.rotatedRightText}>
                <span
                  style={{
                    color: '#7d63e9',
                  }}
                >
                  ##
                </span>
                WEAREGAMERS
              </p>
            </h1>
          </GridItem>
          {data.map((ele, i) => {
            return (
              <>
                {ele.id !== 2 && ele.id !== 4 ? (
                  <GridContainer key={ele.id}>
                  
                    <GridItem xs={12} md={6}>
                      <Image
                        src={ele.image}
                        alt="overViewSubImage"
                        width={500}
                        height={400}
                      />
                    </GridItem>
                    <GridItem style={{ marginTop: '30px' }} xs={12} md={6}>
                      <h2
                        className={homeStyle.rotateLine}
                        style={{
                          fontWeight: '700',
                          fontFamily: "'Rajdhani', sans-serif",
                          position: 'relative',
                          paddingLeft: '10px',
                        }}
                      >
                        {ele.title}
                      </h2>
                      <p style={{ opacity: '0.8', marginTop: '20px' }}>
                        {ele.text}
                      </p>
                      <Link href="/about">
                        <div>
                          {' '}
                          <h4
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              fontWeight: '500',
                              fontFamily: "'Rajdhani', sans-serif",
                              position: 'relative',
                              marginTop: '20px',
                              textTransform: 'uppercase',
                              cursor: 'pointer',
                            }}
                          >
                            <span style={{ marginRight: '10px' }}>
                              view more
                            </span>{' '}
                            <ArrowForwardIcon
                              style={{ paddingBottom: '3px' }}
                            />
                          </h4>
                        </div>
                      </Link>
                    </GridItem>
                  </GridContainer>
                ) : (
                  <GridContainer key={ele.id}>
                    {' '}
                    <GridItem style={{ marginTop: '30px' }} xs={12} md={6}>
                      <h2
                        className={homeStyle.rotateLine}
                        style={{
                          fontWeight: '700',
                          fontFamily: "'Rajdhani', sans-serif",
                          position: 'relative',
                          paddingLeft: '10px',
                        }}
                      >
                        {ele.title}
                      </h2>
                      <p style={{ opacity: '0.8', marginTop: '20px' }}>
                        {ele.text}
                      </p>
                      <Link href="/about">
                        <div>
                          {' '}
                          <h4
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              fontWeight: '500',
                              fontFamily: "'Rajdhani', sans-serif",
                              position: 'relative',
                              marginTop: '20px',
                              textTransform: 'uppercase',
                              cursor: 'pointer',
                            }}
                          >
                            <span style={{ marginRight: '10px' }}>
                              view more
                            </span>{' '}
                            <ArrowForwardIcon
                              style={{ paddingBottom: '3px' }}
                            />
                          </h4>
                        </div>
                      </Link>
                    </GridItem>{' '}
                    <GridItem xs={12} md={6}>
                      <Image
                        src={ele.image}
                        alt="overViewSubImage"
                        width={500}
                        height={400}
                      />
                    </GridItem>
                  </GridContainer>
                )}
              </>
            )
          })}
        </GridContainer>
      </div>
    </div>
  )
}

export default ScheduleLayoutsection
