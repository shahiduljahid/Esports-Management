import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GridContainer from '/components/Grid/GridContainer.js'
import GridItem from '/components/Grid/GridItem.js'
import homeStyle from '../components/Header/Header.module.css'
import Image from 'next/image'
import Layout from './../Layout/Layout'
import { Icon } from '@iconify/react'
import Link from 'next/link'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 300,
  },
})

const about = () => {
  const Team = [
    {
      id: 1,
      image: '/img/sij.jpg',
      role: `C E O`,
      designation: 'founder , ceo',
      name: 'shahidul islam jahid',
      faceBookLink: 'https://www.facebook.com/Shahidul.3333/',
      discordLink: 'https://discordapp.com/users/678951547824242707',
    },
    {
      id: 2,
      image: '/img/cmo.jpg',
      role: `C M O`,
      designation: 'chief marketing officer',
      name: 'Yeasin Arafat',
      faceBookLink: 'https://www.facebook.com/arafar.hasan.14',
      discordLink: 'https://discordapp.com/users/915648117637009448',
    },
  ]
  const classes = useStyles()
  return (
    <Layout>
      <div>
        {' '}
        <GridContainer
          style={{
            margin: '0px',
            marginBottom: '100px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <GridItem
            style={{
              backgroundImage: `url('/img/assets/teamTitleBg.jpg')`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <GridItem
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '100px',
                marginBottom: '50px',
              }}
            >
              <Image
                src={'/img/assets/teamText.png'}
                width={400}
                height={150}
              ></Image>
            </GridItem>
          </GridItem>
          <GridItem
            style={{ margin: '0px', marginTop: '50px' }}
            xs={11}
            md={10}
          >
            <GridContainer>
              {' '}
              {Team.map((member) => {
                return (
                  <GridItem
                    key={member.id}
                    style={{
                      margin: '0px',
                      marginBottom: '50px',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                    xs={12}
                    md={6}
                    lg={4}
                  >
                    {' '}
                    <div
                      className={homeStyle.teamPlayerCard}
                      style={{
                        backgroundImage: `url(${member.image})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: ' column-reverse',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          color: 'white',
                          paddingLeft: '10px',
                          zIndex: '99',
                        }}
                      >
                        <a
                          style={{ color: 'white' }}
                          href={member.faceBookLink}
                          target="_blank"
                        >
                          <p style={{ fontSize: '30px', cursor: 'pointer' }}>
                            <Icon icon="ri:facebook-box-fill" />
                          </p>
                        </a>
                        <a
                          style={{ color: 'white' }}
                          href={member.discordLink}
                          target="_blank"
                        >
                          <p style={{ fontSize: '30px', cursor: 'pointer' }}>
                            <Icon icon="ri:discord-fill" />
                          </p>
                        </a>
                      </div>
                      <p
                        style={{
                          display: 'block',
                          fontSize: '15px',
                          fontWeight: '500',
                          margin: '0px',
                          fontFamily: "'Rajdhani', sans-serif",
                          color: 'white',
                          paddingLeft: '10px',
                          textTransform: 'uppercase',
                          zIndex: '99',
                        }}
                      >
                        {member.designation}
                      </p>
                      <h3
                        style={{
                          fontSize: '25px',
                          fontWeight: '700',
                          paddingLeft: '10px',
                          fontFamily: "'Rajdhani', sans-serif",
                          margin: '0px',
                          color: 'white',
                          textTransform: 'uppercase',
                          zIndex: '99',
                        }}
                      >
                        {member.name}
                      </h3>
                    </div>
                    <div
                      className={homeStyle.teamPlayerName}
                      style={{
                        paddingLeft: '10px',
                        textAlign: 'center',
                      }}
                    >
                      <p
                        style={{
                          fontSize: '50px',
                          fontWeight: '700',
                          fontFamily: "'Blanka', sans-serif",
                          textTransform: 'uppercase',
                        }}
                      >
                        {member.role}
                      </p>
                    </div>
                  </GridItem>
                )
              })}
            </GridContainer>
          </GridItem>
        </GridContainer>
      </div>
    </Layout>
  )
}

export default about
