import React from 'react'
import GridContainer from '/components/Grid/GridContainer.js'
import GridItem from '/components/Grid/GridItem.js'
import homeStyle from '../Header/Header.module.css'
import Image from 'next/image'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import Link from 'next/link'
import CustomCarousel from '../CustomCarousel/CustomCarousel'
import SectionCarousel from '../../pages-sections/Components-Sections/SectionCarousel'

const ScheduleLayoutSection = () => {
  const data = [
    {
      id: 1,
      imgData: [
        {
          image1: '/img/res1.jpg',
          image2: '/img/fix1.jpg',
          image3: '/img/res2.jpg',
        },
      ],
      title: 'MATCH SCHEDULE & RESULT LAYOUT',
      text:
        ' Esports management software is becoming increasingly popular and is being utilized by professional esports teams. It has become an invaluable tool for teams and tournament organizers to generate schedules. It also generates an overall standing of the tournament which can be used as reference for future tournaments. The esports management software provides improved visibility of the competition landscape, making it easier than ever before to plan and run successful tournaments.',
    },
    {
      id: 2,
      imgData: [
        {
          image1: '/img/banner2.jpg',
          image2: '/img/winnerBanner.jpg',
          image3: '/img/banner3.jpg',
        },
      ],

      title: 'TOURNAMENT BANNER',
      text:
        'Esports Ground  provide tournament organizers with the tools they need to create an engaging tournament experience for their players. This includes design tools to create custom banners for the tournament, as well as other features such as scheduling and registration systems. By using these tools, tournament organizers can ensure that they have a professional-looking esports event that will attract players and viewers alike.',
    },
    {
      id: 3,
      imgData: [
        {
          image1: '/img/certificate.jpg',
          image2: '/img/cer2.png',
          image3: '/img/cer3.jpg',
        },
      ],

      title: 'TEAM AND PLAYER CERTIFICATES',
      text:
        'Team and player certificates are an important part of esports management. They serve as a means of recognition and a way to reward players for their hard work and dedication. With the help of esports management software, teams can design their own customised certificates that can be tailored to the individual players or teams they are representing. By using this software, teams can be sure that their certificates are not only aesthetically pleasing but also highly functional, as it enables them to easily customize the content, images and layout according to their needs.',
    },
    {
      id: 4,
      imgData: [
        {
          image1: '/img/assets/commingSoonBG.jpg',
          image2: '/img/assets/commingSoonBG.jpg',
          image3: '/img/assets/commingSoonBG.jpg',
          
        },
      ],

      title: 'FEATURE YOUR STREAMS',
      text:
        'Esports streaming is the future of team and player collaboration. With an esports software, teams and players can customize their streaming features to enhance their performance and maximize their reach. Esports software provides an advanced solution that empowers teams and players to build an audience, increase engagement . Teams and players can streamline the esports experience for their fans without sacrificing quality or performance.',
    },
  ]
  return (
    <div>
      <div>
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
            <div style={{ padding: '0px 10px' }}>
              {ele.id !== 2 && ele.id !== 4 ? (
                <GridContainer key={ele.id}>
                  <GridItem xs={12} md={6}>
                    <CustomCarousel data={ele.imgData} />
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
                          <span style={{ marginRight: '10px' }}>view more</span>{' '}
                          <ArrowForwardIcon style={{ paddingBottom: '3px' }} />
                        </h4>
                      </div>
                    </Link>
                  </GridItem>
                </GridContainer>
              ) : (
                <GridContainer key={ele.id}>
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
                          <span style={{ marginRight: '10px' }}>view more</span>{' '}
                          <ArrowForwardIcon style={{ paddingBottom: '3px' }} />
                        </h4>
                      </div>
                    </Link>
                  </GridItem>
                  <GridItem xs={12} md={6}>
                    <CustomCarousel data={ele.imgData} />
                  </GridItem>
                </GridContainer>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ScheduleLayoutSection
