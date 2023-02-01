import React from 'react'
import GridContainer from '/components/Grid/GridContainer.js'
import GridItem from '/components/Grid/GridItem.js'
import homeStyle from '../Header/Header.module.css'
import Image from 'next/image'

import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}))

const FaqSection = () => {
  const classes = useStyles()

  const Faqs = [
    {
      id: 1,
      title: 'What features does the esports management software offer?',
      answer: `Esports management software is designed to help esports organizations and teams manage their operations more efficiently. It offers features such as tournament creation, generate overall standings  what automated sorted , serve banner and certificate templates for teams and player. It also provides an easy-to-use interface for managing schedules, and events.`,
    },
    {
      id: 2,
      title: 'Can the software generate schedules for tournaments?',
      answer: `Tournament scheduling is a complex task, and it can be difficult to generate an optimal schedule that meets the needs of all participants. Fortunately, software solutions are now available that can help tournament organizers create schedules quickly and efficiently. By using these solutions, tournament organizers can ensure that their tournaments run smoothly and all participants have an enjoyable experience. The software can also generate schedules for multiple tournaments at once, saving time and effort for tournament organizers.`,
    },
    {
      id: 3,
      title: 'How does the software generate overall standings?',
      answer:
        'Scheduling tournaments can be a time-consuming and complex process, especially when there are multiple teams and players involved. However, with the help of software, it is now possible to generate schedules for tournaments quickly and easily. These software programs use advanced algorithms to create tournament schedules that are optimized for fairness . By using this software, tournament organizers can save time and resources while ensuring that all participants have an equal chance of success.',
    },
    {
      id: 4,
      title:
        'Can teams and players add their logos and names to banner and certificate templates?',
      answer:
        'Teams and players can easily add their logos and names to banner and certificate templates using a wide range of tools. This enables them to create personalized banners and certificates that represent their team or player. It also allows them to share the certificates with friends, family, fans, and sponsors. Using these tools, teams and players can customize their banners and certificates by adding text, images, logos. This helps them create unique designs that reflect the spirit of the team or player. Additionally, they can add their own logos or names to the templates for branding purposes.',
    },
    {
      id: 5,
      title:
        'Is there any customization available for banners and certificates templates?',
      answer:
        'Customization is an important aspect of banners and certificates templates. With the help of customization, organization can create unique designs that reflect their brand identity and message. Customization options for banners and certificates templates vary depending on the  service you are using. If  you want to add your own custom design you need to contact us . from  contact page you can send us your message It is important to understand what customization options are available before you choose a  service for creating your banners and certificates templates so that you can get the best possible results.',
    },
    {
      id: 6,
      title:
        'What type of support is provided for users of the esports management software?',
      answer:
        'Esports management software provides users with a comprehensive suite of tools to manage their esports teams, players, tournaments, and leagues. With this software, users can easily create and manage tournaments, track player performance, monitor team progress, and develop strategies for success. The software also offers support for users in the form of customer service representatives who are available to answer questions related to the software and provide guidance on how to use it effectively. Additionally, the software provides access to online resources such as tutorials and forums that help users make the most out of their experience with the esports management software.',
    },
  ]
  return (
    <div style={{ marginTop: '50px' }}>
      <GridContainer>
        <GridItem style={{ marginBottom: '50px' }}>
          <Image
            src={`/img/assets/faqText.png`}
            alt="faq_title_img"
            width={400}
            height={150}
          ></Image>
        </GridItem>{' '}
        {Faqs.map((faq) => {
          return (
            <GridItem style={{ margin: '10px 0px' }} xs={12} md={6}>
              {' '}
              <div className={classes.root}>
                <Accordion
                  style={{
                    color: 'white',
                    backgroundColor: 'transparent',
                    border: ' 1px solid #5b2968',
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography
                      style={{
                        fontSize: '20px',
                        fontWeight: '700',
                        fontFamily: "'Rajdhani', sans-serif",
                      }}
                      className={classes.heading}
                    >
                      {faq.title}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography
                      style={{ opacity: '0.7' }}
                    >
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
            </GridItem>
          )
        })}
      </GridContainer>
    </div>
  )
}

export default FaqSection
