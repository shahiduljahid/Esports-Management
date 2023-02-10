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
import ConfirmationDialog from '/components/CustomDialog/ConfirmationDialog'
import AutoGenerateInfoForm from '/components/RoadMap/AutoGenerateInfoForm'
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
  const handleRemoveEditingRoadMap = () => {
    handleConfirmOpen()
  }
  const handleDelete = async () => {
    handleViewRoadMapClose()
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

  const [chooseTourTableOpen, setChooseTourTableOpen] = React.useState(false)
  const [generateType, setGenerateType] = useState()
  const handleClickOpen = (type) => {
    setGenerateType(type)
    setChooseTourTableOpen(true)
  }
  const handleClose = () => {
    setViewTeamAddTable(false)
    setChooseTourTableOpen(false)
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

  //confirm Delete

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)

  const handleConfirmDeleteOpen = () => {
    setConfirmDeleteOpen(true)
  }

  const handleConfirmDeleteClose = () => {
    setConfirmDeleteOpen(false)
  }
  const handleConfirmDeleteNo = () => {
    handleConfirmDeleteClose()
  }
  const handleConfirmDeleteYes = async () => {
    handleDelete()
    handleConfirmDeleteClose()
  }
  //dialog helpers
  const [open, setOpen] = React.useState(false)
  const [scroll, setScroll] = React.useState('paper')

  const descriptionElementRef = React.useRef(null)
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [open])

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
          <div style={{ display: 'flex' }}>
            {' '}
            <Button
              onClick={() => handleSaveRoadMap()}
              variant="outlined"
              color="primary"
              component="span"
            >
              Save RoadMap
            </Button>
            <Button
              style={{ marginLeft: '10px' }}
              onClick={() => handleRemoveEditingRoadMap()}
              variant="outlined"
              color="secondary"
              component="span"
            >
              Delete RoadMap
            </Button>
          </div>
        ) : (
          <div style={{ display: 'flex' }}>
            {' '}
            <Button
              onClick={() => handleClickOpen('create')}
              variant="outlined"
              color="primary"
              component="span"
            >
              create roadmap
            </Button>
            <Button
              style={{ marginLeft: '10px' }}
              onClick={() => handleClickOpen('auto')}
              variant="outlined"
              color="secondary"
              component="span"
            >
              auto generate
            </Button>
          </div>
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
        {/**choose tour-table for roadmap  dialog**/}
        <Dialog
          open={chooseTourTableOpen}
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
            {viewTeamAddTable?'create a road-Map':'Choose Tournament To Add'}
          </DialogTitle>
          <DialogContent>
            {viewTeamAddTable ? (
              <>
                {generateType === 'create' ? (
                  <AddTeamNumber
                    handleClose={handleClose}
                    setViewTeamAddTable={setViewTeamAddTable}
                    handleAddRoadMapOpen={handleAddRoadMapOpen}
                    setTeamRemaining={setTeamRemaining}
                  />
                ) : (
                  <AutoGenerateInfoForm />
                )}
              </>
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
        {/** choose view RoadMap dialog */}
        <Dialog
          open={viewRoadMap}
          onClose={handleViewRoadMapClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
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
                onClick={() => handleConfirmDeleteOpen()}
                style={{ paddingLeft: '10%', color: 'grey', fontSize: '13px' }}
              >
                <DeleteIcon />
              </span>
            </span>
          </DialogTitle>

          <DialogContent dividers={scroll === 'paper'}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              <TimeLine roadMapData={roadMapData} />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {' '}
            <Button onClick={() => handleViewRoadMapClose()} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
        {/** add roadMap dialog */}
        <Dialog
          open={addRoadMap}
          onClose={handleAddRoadMapClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle style={{ textAlign: 'center' }} id="scroll-dialog-title">
            {' '}
            <span
              style={{
                color: '#00cfff',
                textTransform: 'uppercase',
                fontSize: '13px',
              }}
            >
              {'Add RoadMap'}{' '}
            </span>
            <span
              style={{ paddingLeft: '10%', color: 'grey', fontSize: '13px' }}
            >
              Team Remaining : {teamRemaining}
            </span>
          </DialogTitle>

          <DialogContent dividers={scroll === 'paper'}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              <CreateRoadMapTable
                teamRemaining={teamRemaining}
                setTeamRemaining={setTeamRemaining}
                handleAddRoadMapClose={handleAddRoadMapClose}
                newRoadMap={newRoadMap}
                setNewRoadMap={setNewRoadMap}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {' '}
            <Button
              onClick={() => handleAddRoadMapClose(newRoadMap, true)}
              color="primary"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>{' '}
        {/**saved or delete confirmation dialog */}
        <ConfirmationDialog
          handleYes={handleYes}
          handleNo={handleNo}
          confirmOpen={confirmOpen}
          handleConfirmClose={handleConfirmClose}
          title={'Do you want to saved unfinished Tournament?'}
          message={`There is no final stage in this roadMap . you can not add this
          roadMap to your tournament . Are you want to leave this roadMap ?`}
        />
        {/** delete form saved roadmap confirmation dialog */}
        <ConfirmationDialog
          handleYes={handleConfirmDeleteYes}
          handleNo={handleConfirmDeleteNo}
          confirmOpen={confirmDeleteOpen}
          handleConfirmClose={handleConfirmDeleteClose}
          title={'Do you want to Delete this roadMap?'}
          message={`if you delete this roadmap . the tournaments details related to
          this roadmap will be deleted . Are you sure to delete this roadmap
          ?`}
        />
      </div>
    </>
  )
}
RoadMap.layout = DashboardLayout
export default RoadMap
