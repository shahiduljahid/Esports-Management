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
import CreateRoadMapTable from '/components/RoadMap/CreateRoadMapTable'
import AddTeamNumber from '/components/RoadMap/AddTeamNumber'
import EditableTimeLine from '/components/TimeLine/EditableTimeLine'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },

  ...styles,
}))
const dummyData = [
  {
    roundName: 'ROUND 1',
    dividedInto: '25',
    teamPerGroup: '20',
    matchMakingStyle: 'KNOCKOUT',
    matchPerGroup: '2',
    qualify: '10',
    isFinal: false,
    qualifiedTeam: '500',
    invitedTeam: '',
  },

  {
    roundName: 'ROUND 2',
    dividedInto: '14',
    teamPerGroup: '18',
    matchMakingStyle: 'KNOCKOUT',
    matchPerGroup: '2',
    qualify: '9',
    isFinal: false,
    qualifiedTeam: '250',
    invitedTeam: '',
  },
  {
    roundName: 'GROUP STAGE',
    dividedInto: '7',
    teamPerGroup: '18',
    matchMakingStyle: 'KNOCKOUT',
    matchPerGroup: '4',
    qualify: '10',
    isFinal: false,
    qualifiedTeam: '126',
    invitedTeam: '',
  },
  {
    roundName: 'PRE FINAL',
    dividedInto: '4',
    teamPerGroup: '8',
    matchMakingStyle: 'ROUND-ROBIN',
    matchPerGroup: '12',
    isFinal: false,
    qualify: '18',
    qualifiedTeam: '18',
    invitedTeam: '',
  },
  {
    roundName: 'FINAL',
    dividedInto: '',
    teamPerGroup: '16',
    matchMakingStyle: 'KNOCKOUT',
    matchPerGroup: '15',
    qualify: '',
    isFinal: true,
    qualifiedTeam: '18',
    invitedTeam: '',
  },
]

const RoadMap = () => {
  const classes = useStyles()
  const { user } = useAuth()
  const [reload, setReload] = useState(false)
  const [tableData, setTableData] = useState([])
  const [roadMapData, setRoadMapData] = useState(dummyData)
  const [tournamentId, setTournamentId] = useState()
  const [newRoadMap, setNewRoadMap] = useState([])
  const [teamRemaining, setTeamRemaining] = useState()
  const [saveTourId, setTourId] = useState()
  const [qualifiedTeam, setQualifiedTeam] = useState()
  const [viewTeamAddTable, setViewTeamAddTable] = useState(false)

  const handleAddNewRound = () => {
    handleAddRoadMapOpen()
  }
  const handleTournamentStart = (item) => {
    if (item) {
      setTourId(item?._id)
    }
    setViewTeamAddTable(true)
  }

  const handleRoadMapView = (item) => {
    handleViewRoadMapOpen(item)
  }

  const handleSaveRoadMap = () => {
    console.log(newRoadMap)
  }

  //dialogs function

  //handle Choose tour table

  const [open, setOpen] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  //handle view RoadMap Table
  const [viewRoadMap, setViewRoadMap] = React.useState(false)
  const handleViewRoadMapOpen = (item) => {
    console.log(item)
    setViewRoadMap(true)
  }
  const handleViewRoadMapClose = () => {
    setViewRoadMap(false)
  }
  //handle Add RoadMap Table
  const [addRoadMap, setAddRoadMap] = React.useState(false)
  const handleAddRoadMapOpen = () => {
    setAddRoadMap(true)
  }
  const handleAddRoadMapClose = (isAdded, notAdded) => {
    console.log(isAdded)
    if (!isAdded?.length) {
      setTournamentId()
    } else {
      setTournamentId(saveTourId)
    }
    if (notAdded) {
      if (newRoadMap?.length) {
        const temp = [...newRoadMap]
        const lastOne = temp.pop()
        const teamRem =
          parseInt(lastOne.dividedInto) * parseInt(lastOne.qualify)
     
        setTeamRemaining(teamRem)
      }
    }
    setAddRoadMap(false)
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
        {!tournamentId && (
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
        )}

        {tournamentId ? (
          <Button
            onClick={() => handleSaveRoadMap()}
            variant="outlined"
            color="primary"
            component="span"
          >
            Save RoadMap
          </Button>
        ) : (
          <Button
            onClick={() => handleClickOpen()}
            variant="outlined"
            color="primary"
            component="span"
          >
            Choose Tournament
          </Button>
        )}

        {newRoadMap?.length ? (
          <EditableTimeLine
            handleAddNewRound={handleAddNewRound}
            roadMapData={newRoadMap}
          />
        ) : (
          <></>
        )}

        <GridContainer
          style={{ margin: 0, display: 'flex', justifyContent: 'center' }}
        ></GridContainer>

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
            {'Choose Tournament To Add'}
          </DialogTitle>
          <DialogContent>
            {viewTeamAddTable ? (
              <AddTeamNumber
                handleClose={handleClose}
                setViewTeamAddTable={setViewTeamAddTable}
                handleAddRoadMapOpen={handleAddRoadMapOpen}
                setTeamRemaining={setTeamRemaining}
              />
            ) : (
              <AllTournamentTable
                tournaments={tableData}
                handleTournaments={handleTournamentStart}
                reload={reload}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose()} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={viewRoadMap}
          onClose={handleViewRoadMapClose}
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
            {'Tournament RoadMap'}
          </DialogTitle>
          <DialogContent>
            <TimeLine roadMapData={roadMapData} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleViewRoadMapClose()} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={addRoadMap}
          onClose={handleAddRoadMapClose}
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
            <span style={{ fontSize: '15px' }}>{'Add RoadMap'} </span>
            <span
              style={{ paddingLeft: '10%', color: 'grey', fontSize: '15px' }}
            >
              Team Remaining : {teamRemaining}
            </span>
          </DialogTitle>
          <DialogContent>
            <CreateRoadMapTable
              teamRemaining={teamRemaining}
              setTeamRemaining={setTeamRemaining}
              handleAddRoadMapClose={handleAddRoadMapClose}
              newRoadMap={newRoadMap}
              setNewRoadMap={setNewRoadMap}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => handleAddRoadMapClose(newRoadMap, true)}
              color="primary"
            >
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
