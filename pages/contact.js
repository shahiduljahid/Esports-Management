import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GridContainer from '/components/Grid/GridContainer.js'
import GridItem from '/components/Grid/GridItem.js'
import homeStyle from '../components/Header/Header.module.css'
import CustomInput from '/components/CustomInput/CustomInput.js'
import CustomButtons from '/components/CustomButtons/Button.js'
import Image from 'next/image'
import Layout from './../Layout/Layout'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { Button, TextField } from '@material-ui/core'
import { useSnackbar } from 'notistack'

import emailjs from '@emailjs/browser'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 300,
  },
  cssLabel: {
    color: 'white',
  },

  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `grey !important`,
    },
  },

  cssFocused: {},

  notchedOutline: {
    borderWidth: '1px',
    borderColor: 'rgb(91, 41, 104) !important',
  },
})

const contact = () => {
  const [downloading, setDownloading] = useState(false)
  const [loading, setLoading] = useState(true)
  const loader = () => {
    setTimeout(() => {
      setLoading(false)
    }, 10)
  }
  loader()

  const { enqueueSnackbar } = useSnackbar()
  const notificationPopUp = (message, variant) => {
    enqueueSnackbar(message.toUpperCase(), {
      variant: variant,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
    })
  }

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = async (data) => {
    setDownloading(true)
    console.log(process.env.NEXT_PUBLIC_EMAILJS_SERVICEID)

    emailjs
      .send(
        `service_u9jac3a`,
        `template_d83z4a8`,
        data,
        `user_Se0Rdu8pmQynduEs8uokY`,
      )
      .then(
        function (response) {
          setDownloading(false)
          notificationPopUp('email send successfully', 'success')
          reset()
        },
        function (error) {
          setDownloading(false)
          notificationPopUp('failed to send email', 'error')
          console.log('FAILED...', error)
        },
      )
  }

  const classes = useStyles()
  return (
    <>
      {' '}
      {downloading && (
        <div
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              zIndex: 2099,
              top: 0,
              left: 0,
              right: 0,
              height: '100vh',
              position: 'fixed',
              width: '100%',
              backdropFilter: 'blur(3px)',
              background: '#2b2b2bb0',
              padding: '30px',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: 'auto',
                background: '#ffff',
                padding: '4px',
                textAlign: 'center',
                boxShadow: 'rgb(53 53 53 / 52%) 1px 1px 10px 4px',
              }}
            >
              <img style={{ width: 300 }} src="/img/progress.gif" />
            </div>
          </div>
        </div>
      )}
      <Layout image={'/img/assets/contactBg.jpg'}>
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
                marginTop: '120px',
                marginBottom: '50px',
                backgroundImage: `url('/img/assets/contact-titleBg.jpg')`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                transition: '2s',
                backgroundPosition: `${loading ? 'unset' : 'center 0'}`,
              }}
            >
              <GridItem className={homeStyle.contactTitleSection}>
                <h3
                  style={{ color: 'white' }}
                  className={homeStyle.contactTitleText}
                >
                  CONTACT US
                </h3>
              </GridItem>
            </GridItem>
            <GridItem xs={12} md={6}>
              <h3
                style={{ color: 'white', marginBottom: '100px' }}
                className={homeStyle.contactFormText}
              >
                CONTACT US
                <span style={{ color: '#5821a9' }}> ABOUT YOUR FEEDBACK,</span>
                <br /> POTENTIAL
                <span style={{ color: '#5821a9' }}> ABOUT YOUR FEEDBACK,</span>
                <br /> AND CUSTOM
                <span style={{ color: '#5821a9' }}> DESIGN REQUESTS</span>
              </h3>
              <Link href={'/about'} target="_blank">
                <Button
                  style={{ marginBottom: '20px', height: '50px' }}
                  variant="outlined"
                  color="secondary"
                >
                  MEET OUR TEAM
                </Button>
              </Link>

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
                  href={'https://www.facebook.com/Shahidul.3333/'}
                  target="_blank"
                >
                  <p
                    style={{
                      fontSize: '30px',
                      cursor: 'pointer',
                      paddingRight: '10px',
                    }}
                  >
                    <Icon icon="ri:facebook-box-fill" />
                  </p>
                </a>
                <a
                  style={{ color: 'white' }}
                  href={'https://discordapp.com/users/678951547824242707'}
                  target="_blank"
                >
                  <p
                    style={{
                      fontSize: '30px',
                      cursor: 'pointer',
                      paddingRight: '10px',
                    }}
                  >
                    <Icon icon="ri:discord-fill" />
                  </p>
                </a>
              </div>
            </GridItem>
            <GridItem style={{ marginTop: '50px' }} xs={12} md={6} lg={4}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      InputLabelProps={{
                        classes: {
                          root: classes.cssLabel,
                          focused: classes.cssFocused,
                        },
                      }}
                      InputProps={{
                        style: { fontFamily: 'Rajdhani', color: 'white' },
                        classes: {
                          root: classes.cssOutlinedInput,
                          focused: classes.cssFocused,
                          notchedOutline: classes.notchedOutline,
                        },
                        inputMode: 'numeric',
                      }}
                      color="secondary"
                      style={{ width: '100%', marginBottom: '20px' }}
                      id="name"
                      name="name"
                      label="Your Name"
                      variant="outlined"
                      {...register('name', { required: true })}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      InputLabelProps={{
                        classes: {
                          root: classes.cssLabel,
                          focused: classes.cssFocused,
                        },
                      }}
                      InputProps={{
                        style: { fontFamily: 'Rajdhani', color: 'white' },
                        classes: {
                          root: classes.cssOutlinedInput,
                          focused: classes.cssFocused,
                          notchedOutline: classes.notchedOutline,
                        },
                        inputMode: 'numeric',
                      }}
                      color="secondary"
                      style={{ width: '100%', marginBottom: '20px' }}
                      id="email"
                      type="email"
                      name="email"
                      label="Your Email"
                      variant="outlined"
                      {...register('email', { required: true })}
                    />
                  </GridItem>
                  <GridItem xs={12}>
                    <TextField
                      InputLabelProps={{
                        classes: {
                          root: classes.cssLabel,
                          focused: classes.cssFocused,
                        },
                      }}
                      InputProps={{
                        style: { fontFamily: 'Rajdhani', color: 'white' },
                        classes: {
                          root: classes.cssOutlinedInput,
                          focused: classes.cssFocused,
                          notchedOutline: classes.notchedOutline,
                        },
                        inputMode: 'numeric',
                        multiline: true,
                        rows: 5,
                      }}
                      color="secondary"
                      style={{ width: '100%', marginBottom: '20px' }}
                      id="message"
                      name="message"
                      label="Your Message"
                      variant="outlined"
                      {...register('message', { required: true })}
                    />
                  </GridItem>

                  <GridItem
                    xs={12}
                    sm={12}
                    md={4}
                    className={classes.textCenter}
                  >
                    <CustomButtons type="submit" color="danger">
                      Send Message
                    </CustomButtons>
                  </GridItem>
                </GridContainer>
              </form>
            </GridItem>
          </GridContainer>
        </div>
      </Layout>
    </>
  )
}

export default contact
