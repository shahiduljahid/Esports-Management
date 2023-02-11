import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
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
import AddBoxIcon from '@material-ui/icons/AddBox'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Style from './timeLine.module.css'

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

export default function EditableTimeLine({ roadMapData, handleAddNewRound }) {
  const classes = useStyles()
  let viewAddBtn = true
  const handleShowAddBtn = () => {
    roadMapData.map((rd) => {
      if (rd.isFinal === true) {
        viewAddBtn = false
      }
    })
  }
  handleShowAddBtn()
  return (
    <>
      <Timeline
        style={{ padding: '0', alignItems: 'center' }}
        align="alternate"
      >
        {roadMapData?.map((tour, i) => {
          if (!tour?.isFinal) {
            return (
              <TimelineItem key={i} style={{ width: '100%' }}>
                <TimelineOppositeContent
                  className={Style.oppositeContent}
                  style={{
                    display: 'flex',

                    justifyContent: `${i % 2 === 0 ? 'right' : 'left'}`,
                    paddingTop: '30px',
                  }}
                >
                  <Typography
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontWeight: '800',
                      fontSize: '15px',
                      marginBottom: '0',
                      marginTop: '5px',
                      textAlign: 'center',
                    }}
                    color="textSecondary"
                  >
                    {' '}
                    {i === 0
                      ? `TOTAL ${tour?.qualifiedTeam} TEAM`
                      : ` QUALIFIED ${tour?.qualifiedTeam} ${
                          tour?.invitedTeam
                            ? `+ ${tour?.invitedTeam}  INVITED`
                            : ''
                        } TEAM`}
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
                    <span style={{ zIndex: '2' }}> {tour?.roundName}</span>
                  </TimelineDot>

                  {i === roadMapData?.length - 1 ? (
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
                      <span>
                        {' '}
                        DIVIDED INTO {tour?.dividedInto} GROUP <br />
                        {tour?.teamPerGroup} TEAM PER GROUP <br />
                        {tour?.matchPerGroup} MATCH EACH GROUP{' '}
                        {tour?.matchMakingStyle === 'ROUND-ROBIN' &&
                          'IN ROUND ROBIN FORMAT'}
                      </span>
                      <br />
                      <span style={{ color: 'greenyellow' }}>
                        TOP {tour?.qualify} TEAM WILL QUALIFY FOR NEXT ROUND
                      </span>
                    </Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            )
          }
          if (tour?.isFinal) {
            return (
              <span key={i}>
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
                        color: 'grey',
                      }}
                    >
                       {tour?.qualifiedTeam
                        ? parseInt(tour?.qualifiedTeam)
                        : 0 + tour?.invitedTeam
                        ? parseInt(tour?.invitedTeam)
                        : 0}{' '}
                      FINALIST TEAM
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
                      <span style={{ zIndex: '2' }}>{tour?.roundName}</span>
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
                    <span style={{ margin: '0' }}>
                      {tour?.qualifiedTeam
                        ? parseInt(tour?.qualifiedTeam)
                        : 0 + tour?.invitedTeam
                        ? parseInt(tour?.invitedTeam)
                        : 0}{' '}
                      TEAM WILL PLAY {tour?.matchPerGroup} MATCH TO WIN THE
                      TITLE
                      {tour?.matchMakingStyle === 'ROUND-ROBIN' &&
                        'IN ROUND ROBIN FORMAT'}
                    </span>
                  </Typography>
                </Paper>
              </span>
            )
          }
        })}
        {viewAddBtn ? (
          <Button
            style={{ marginTop: '20px' }}
            onClick={() => handleAddNewRound()}
            variant="outlined"
            color="primary"
            component="span"
            startIcon={<AddBoxIcon />}
          >
            ADD NEW ROUND
          </Button>
        ) : (
          <></>
        )}
      </Timeline>
    </>
  )
}
