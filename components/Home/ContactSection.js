import React from 'react'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'

// @material-ui/icons

// core components
import GridContainer from '/components/Grid/GridContainer.js'
import GridItem from '/components/Grid/GridItem.js'
import CustomInput from '/components/CustomInput/CustomInput.js'
import Button from '/components/CustomButtons/Button.js'
import homeStyle from '/components/Header/Header.module.css'

import styles from '/styles/jss/nextjs-material-kit/pages/landingPageSections/workStyle.js'
import { classNames } from 'classnames'

const useStyles = makeStyles(styles)

export default function ContactSection() {
  const classes = useStyles()
  return (
    <div
      style={{ color: 'white', textAlign: 'center' }}
      className={classes.section}
    >
      <GridContainer justify="center">
        <GridItem>
          {' '}
          <h2 className={homeStyle.workTitle}>
            IT’S TIME TO UP YOUR GAME!
            <br />
            LET'S START TODAY
          </h2>
          <h4 style={{ fontFamily: "'Montserrat', sans-serif" }}>JOIN US</h4>
        </GridItem>
        <GridItem cs={12} sm={12} md={8}>
          <form>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  color="dark"
                  labelText="Your Name"
                  id="name"
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Your Email"
                  id="email"
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <CustomInput
                labelText="Your Message"
                id="message"
                formControlProps={{
                  fullWidth: true,
                  className: classes.textArea,
                }}
                inputProps={{
                  multiline: true,
                  rows: 5,
                }}
              />
              <GridItem  xs={12} sm={12} md={4} className={classes.textCenter}>
                <Button color="danger">Send Message</Button>
              </GridItem>
            </GridContainer>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  )
}
