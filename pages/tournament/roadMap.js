import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import GridContainer from '/components/Grid/GridContainer.js'
import GridItem from '/components/Grid/GridItem.js'
import styles from '/styles/jss/nextjs-material-kit/dashboard'

//dialog
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

//core component
import { useAuth } from '../../lib/auth'
import DashboardLayout from './../../Layout/DashboardLayout'
import AllRoadMapTable from '/components/RoadMap/AllRoadMapTable'
import CustomButton from '/components/CustomButtons/Button.js'
import AllTournamentTable from '/components/Tournament/AllTournamentTable'
import TimeLine from '/components/TimeLine/TimeLine'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },

  ...styles,
}))

const RoadMap = () => {
  const classes = useStyles()
  const { user } = useAuth()
  const [reload, setReload] = useState(false)
  const [tableData, setTableData] = useState([])
  const handleTournamentStart = (item) => {
    console.log(item)
  }

  const handleRoadMapView = (item) => {
    console.log(item)
  }
  //handle columns

  const [open, setOpen] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  useEffect(async () => {
    setReload(true)
    const id = user._id
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/tournaments/singleUserTournament/${id}`,
    )
    setTableData(res.data)
    setReload(false)
  }, [user])
  return (
    <>
      <div className={classes.containerFluid}>
        <AllRoadMapTable
          tournaments={tableData}
          handleTournaments={handleRoadMapView}
          reload={reload}
        />

        <h4
          style={{
            color: 'black',
            fontWeight: 'bold',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          className={classes.title}
        >
          <span>Create New RoadMap</span>
        </h4>
        <Button
          onClick={() => handleClickOpen()}
          variant="outlined"
          color="primary"
          component="span"
        >
          Choose Tournament
        </Button>
        <GridContainer
          style={{ margin: 0, display: 'flex', justifyContent: 'center' }}
        >
          <GridItem style={{padding:'0'}} xs={12} sm={8} md={8}>
            {' '}
            <TimeLine />
          </GridItem>
        </GridContainer>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            style={{
              textAlign: 'center',
              color: '#00cfff',
              textTransform: 'uppercase',
            }}
            id="alert-dialog-title"
          >
            {'Gallery'}
          </DialogTitle>
          <DialogContent>
            <AllTournamentTable
              tournaments={tableData}
              handleTournaments={handleTournamentStart}
              reload={reload}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose()} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  )
}
RoadMap.layout = DashboardLayout
export default RoadMap
