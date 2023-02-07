import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Timeline from '@material-ui/lab/Timeline'
import TimelineItem from '@material-ui/lab/TimelineItem'
import TimelineSeparator from '@material-ui/lab/TimelineSeparator'
import TimelineConnector from '@material-ui/lab/TimelineConnector'
import TimelineContent from '@material-ui/lab/TimelineContent'
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent'
import TimelineDot from '@material-ui/lab/TimelineDot'
import FastfoodIcon from '@material-ui/icons/Fastfood'
import LaptopMacIcon from '@material-ui/icons/LaptopMac'
import HotelIcon from '@material-ui/icons/Hotel'
import RepeatIcon from '@material-ui/icons/Repeat'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Style from './timeline.module.css'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
    backgroundColor: '#3f51b5',
  },
  content: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  secondaryTail: {
    backgroundColor: '#00cfff',
    height: '50px',
  },
}))

export default function TimeLine() {
  const roadMapData = [
    {
      roundName: 'QUALIFIER ROUND',
      dividedInto: '25',
      teamPerGroup: '20',
      matchMakingStyle: 'default',
      matchPerGroup: '2',
      qualify: '10',
      isFinal: false,
      qualifiedTeam: '500',
      invitedTeam: '0',
    },

    {
      roundName: 'QUARTERFINAL ROUND',
      dividedInto: '25',
      teamPerGroup: '20',
      matchMakingStyle: 'default',
      matchPerGroup: '2',
      qualify: '10',
      isFinal: false,
      qualifiedTeam: '126',
      invitedTeam: '20',
    },
    {
      roundName: 'SEMI FINAL',
      dividedInto: '4',
      teamPerGroup: '8',
      matchMakingStyle: 'round-robin',
      matchPerGroup: '12',
      qualify: '18',
      isFinal: false,
      qualifiedTeam: '35',
      invitedTeam: '5',
    },
    {
      roundName: 'PRE FINAL',
      dividedInto: '4',
      teamPerGroup: '8',
      matchMakingStyle: 'round-robin',
      matchPerGroup: '12',
      isFinal: false,
      qualify: '18',
      qualifiedTeam: '18',
      invitedTeam: '0',
    },
    {
      roundName: 'FINAL',
      dividedInto: '0',
      teamPerGroup: '16',
      matchMakingStyle: 'default',
      matchPerGroup: '15',
      qualify: '0',
      isFinal: true,
      qualifiedTeam: '18',
      invitedTeam: '0',
    },
  ]
  const classes = useStyles()

  return (
    <Timeline style={{ padding: '0', alignItems: 'center' }} align="alternate">
      {roadMapData.map((tour, i) => {
        console.log(i / 2)
        if (!tour.isFinal) {
          return (
            <TimelineItem style={{ width: '100%' }}>
              <TimelineOppositeContent
              className={Style.oppositeContent}
                style={{
                  display: 'flex',
               
                  justifyContent: `${i % 2 === 0 ? 'right' : 'left'}`,
                  paddingTop: '30px',
                }}
              >
                <Typography color="textSecondary">
                  {' '}
                  <p
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontWeight: '800',
                      fontSize: '15px',
                      marginBottom: '0',
                      marginTop: '5px',
                      textAlign: 'center',
                    }}
                  >
                    {i === 0
                      ? `TOTAL ${tour.qualifiedTeam} TEAM`
                      : ` QUALIFIED ${tour.qualifiedTeam} ${
                          parseInt(tour.invitedTeam)
                            ? `+ ${tour.invitedTeam}  INVITED`
                            : ''
                        } TEAM`}
                  </p>
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot
                  className={Style.timelineDotBg}
                  style={{
                    backgroundImage: `url("/img/assets/images.png")`,
                    backgroundSize: 'cover',
                    padding: '15px',
                    textAlign: 'center',
                    fontWeight: '700',
                    fontFamily: "'Rajdhani', sans-serif",
                    width: '95px',
                    height: '95px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 0,
                  }}
                >
                  <span style={{ zIndex: '2' }}> {tour.roundName}</span>
                </TimelineDot>

                {i === roadMapData.length - 1 ? (
                  <></>
                ) : (
                  <TimelineConnector className={classes.secondaryTail} />
                )}
              </TimelineSeparator>
              <TimelineContent style={{ padding: '6px 16px' }}>
                <Paper
                  style={{
                    backgroundImage: `url("/img/assets/contact-titleBg.jpg")`,
                    backgroundSize: 'cover',
                  }}
                  elevation={3}
                  className={classes.paper}
                >
                  {' '}
                  <Typography
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontWeight: '800',
                    }}
                    className={classes.content}
                  >
                    <p>
                      {' '}
                      DIVIDED INTO {tour.dividedInto} GROUP <br />
                      {tour.teamPerGroup} TEAM PER GROUP <br />
                      {tour.matchPerGroup} MATCH EACH GROUP{' '}
                      {tour.matchMakingStyle === 'round-robin' &&
                        'IN ROUND ROBIN FORMAT'}
                    </p>
                    <p style={{ color: 'greenyellow' }}>
                      TOP {tour.qualify} TEAM WILL QUALIFY FOR NEXT ROUND
                    </p>
                  </Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          )
        }
        if (tour.isFinal) {
          return (
            <>
              {' '}
              <TimelineItem>
                <TimelineSeparator>
                  <p
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontWeight: '800',
                      fontSize: '15px',
                      marginBottom: '0',
                      marginTop: '5px',
                      textAlign: 'center',
                      color:'grey'
                    }}
                  >
                    {tour.qualifiedTeam} FINALIST TEAM
                  </p>
                  <TimelineDot
                    className={Style.timelineDotBg}
                    style={{
                      backgroundImage: `url("/img/assets/images.png")`,
                      backgroundSize: 'cover',
                      padding: '15px',
                      textAlign: 'center',
                      fontWeight: '700',
                      fontFamily: "'Rajdhani', sans-serif",
                      width: '95px',
                      height: '95px',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: 0,
                    }}
                  >
                    <span style={{ zIndex: '2' }}>{tour.roundName}</span>
                  </TimelineDot>

                  <TimelineConnector className={classes.secondaryTail} />
                </TimelineSeparator>
                <TimelineContent
                  style={{ padding: '6px 16px' }}
                ></TimelineContent>
              </TimelineItem>{' '}
              <Paper
                style={{
                  marginTop: '10px',
                  padding: '20px 30px',
                  backgroundImage: `url("/img/assets/contact-titleBg.jpg")`,
                  backgroundSize: 'cover',
                }}
                elevation={3}
                className={classes.paper}
              >
                {' '}
                <Typography
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: '800',
                    color: 'greenyellow',
                    textAlign: 'center',
                  }}
                  className={classes.content}
                >
                  <p style={{ margin: '0' }}>
                    {tour.teamPerGroup} TEAM WILL PLAY {tour.matchPerGroup}{' '}
                    MATCH TO WIN THE TITLE{' '}
                    {tour.matchMakingStyle === 'round-robin' &&
                      'IN ROUND ROBIN FORMAT'}
                  </p>
                </Typography>
              </Paper>
            </>
          )
        }
      })}
    </Timeline>
  )
}
