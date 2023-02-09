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
import notificationPopUp from '../../Functions/notificationPopUp'
import { useSnackbar } from 'notistack'
import DeleteIcon from '@material-ui/icons/Delete'
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },

  ...styles,
}))

const handleUserTourData = (userId, allTour) => {
  return allTour.filter((item) => item.creator === userId)
}
const handleRoadMapFilter = (array) => {
  return array.filter((ele) => ele.roadMap.length > 0)
}
const handleWithOutRoadMapFilter = (array) => {
  return array.filter((ele) => ele.roadMap.length === 0)
}
const RoadMap = () => {
  const classes = useStyles()
  const { user } = useAuth()
  const [reload, setReload] = useState(false)
  const [tableData, setTableData] = useState([])
  const [roadMapData, setRoadMapData] = useState()
  const [selectedRoadmap, setSelectedRoadMap] = useState()
  const [tournamentId, setTournamentId] = useState()
  const [newRoadMap, setNewRoadMap] = useState([])
  const [teamRemaining, setTeamRemaining] = useState()
  const [saveTourId, setTourId] = useState()
  const [qualifiedTeam, setQualifiedTeam] = useState()
  const [viewTeamAddTable, setViewTeamAddTable] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const itemWithRoadMap = handleRoadMapFilter(tableData)
  const itemWithOutRoadMap = handleWithOutRoadMapFilter(tableData)

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
    if (item?.roadMap?.length) {
      setSelectedRoadMap(item)
      setRoadMapData(item.roadMap)
      handleViewRoadMapOpen(item)
    }
  }

  const handleSaveRoadMap = async () => {
    let isComplete = false
    for (let index = 0; index < newRoadMap.length; index++) {
      const element = newRoadMap[index]
      if (element.isFinal) {
        isComplete = true
      }
    }
    if (isComplete) {
      setReload(true)
      const tournamentFind = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/tournaments/TournamentById/${tournamentId}`,
      )
      const tournament = tournamentFind?.data

      tournament.roadMap = newRoadMap
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/tournaments/TournamentDetails/${tournamentId}`,
        tournament,
      )
      if (res.data) {
        setTableData(handleUserTourData(user?._id, res.data))
        notificationPopUp(
          'Road Map added successfully',
          'success',
          enqueueSnackbar,
        )
        setNewRoadMap([])
        setTeamRemaining()
        setTournamentId()
        setTourId()
      }
      setReload(false)

    } else {
      handleConfirmOpen()
    }
  }
  const handleRemoveEditingRoadMap=()=>{
    handleConfirmOpen()

  }
  const handleDelete = async() => {
    setReload(true)
    const tournamentFind = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/tournaments/TournamentById/${selectedRoadmap._id}`,
    )
    const tournament = tournamentFind?.data

    tournament.roadMap = []
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/tournaments/TournamentDetails/${selectedRoadmap._id}`,
      tournament,
    )
    if (res.data) {
      setTableData(handleUserTourData(user?._id, res.data))
      notificationPopUp(
        'Road Map Deleted successfully',
        'success',
        enqueueSnackbar,
      )
   
    }
    handleViewRoadMapClose()
    setReload(false)
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
    setViewRoadMap(true)
  }
  const handleViewRoadMapClose = () => {
    setViewRoadMap(false)
    setSelectedRoadMap()
    setRoadMapData()
  }
  //handle Add RoadMap Table
  const [addRoadMap, setAddRoadMap] = React.useState(false)
  const handleAddRoadMapOpen = () => {
    setAddRoadMap(true)
  }
  const handleAddRoadMapClose = (isAdded, notAdded) => {
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

  //confirm dialog

  const [confirmOpen, setConfirmOpen] = useState(false)

  const handleConfirmOpen = () => {
    setConfirmOpen(true)
  }

  const handleConfirmClose = () => {
    setConfirmOpen(false)
  }
  const handleNo = () => {
    handleConfirmClose()
  }
  const handleYes = async () => {
    setNewRoadMap([])
    setTeamRemaining()
    setTournamentId()
    setTourId()
    handleConfirmClose()
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
          tournaments={itemWithRoadMap}
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
         <div style={{display:'flex'}}> <Button
         onClick={() => handleSaveRoadMap()}
         variant="outlined"
         color="primary"
         component="span"
       >
         Save RoadMap
       </Button>
         <Button
         style={{marginLeft:'10px'}}
         onClick={() => handleRemoveEditingRoadMap()}
         variant="outlined"
         color="secondary"
         component="span"
       >
         Delete RoadMap
       </Button></div>
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
                tournaments={itemWithOutRoadMap}
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
            <span style={{ display: 'flex', justifyContent: 'center' }}>
              <span style={{ fontSize: '15px' }}>{'Tournament RoadMap'}</span>
              <span
                onClick={() => handleDelete()}
                style={{ paddingLeft: '10%', color: 'grey', fontSize: '13px' }}
              >
                <DeleteIcon />
              </span>
            </span>
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
            <span style={{ fontSize: '13px' }}>{'Add RoadMap'} </span>
            <span
              style={{ paddingLeft: '10%', color: 'grey', fontSize: '13px' }}
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
        <Dialog
          open={confirmOpen}
          onClose={handleConfirmClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            style={{ color: '#00cfff', textTransform: 'uppercase' }}
            id="alert-dialog-title"
          >
            {'Do you want to saved unfinished Tournament?'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              style={{ color: 'black', textTransform: 'uppercase' }}
              id="alert-dialog-description"
            >
              There is no final stage in this roadMap . you can not add this
              roadMap to your tournament . Are you want to leave this roadMap ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <CustomButton onClick={() => handleNo()} size="sm" color="danger">
              cancel
            </CustomButton>
            <CustomButton
              onClick={() => handleYes()}
              color="info"
              size="sm"
              autoFocus
            >
              Yes
            </CustomButton>
          </DialogActions>
        </Dialog>
      </div>
    </>
  )
}
RoadMap.layout = DashboardLayout
export default RoadMap
