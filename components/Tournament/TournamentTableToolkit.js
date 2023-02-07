import clsx from 'clsx'
import React, { useState } from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { useAuth } from '../../lib/auth'
import { Icon } from '@iconify/react'
import CustomButton from '/components/CustomButtons/Button.js'
import EditTournament from '/components/Tournament/EditTournament.js'

//dialog component
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: '',
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}))

const TournamentTableToolkit = (props) => {
  const { user } = useAuth()
  const { enqueueSnackbar } = useSnackbar()

  const classes = useToolbarStyles()
  const {
    numSelected,
    selected,
    setSelected,
    setReload,
    handleClickOpen,
    tableData,
    setTableData,
  } = props
  const handleUserTourData = (userId, allTour) => {
    return allTour.filter((item) => item.creator === userId)
  }

  // delete tournaments
  const handleTournaments = async (item) => {
    console.log(item)
    setReload(true)
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/tournaments/deleteTournament`,
      selected,
    )
    setTableData(handleUserTourData(user?._id, result.data))
    setSelected([])
    setReload(false)
  }
  //edit tournament
  const [editTournamentElement, setEditTournamentElement] = useState({})

  const handleEdit = () => {
    const getElement = tableData.find((ele) => ele._id === selected[0])
    setEditTournamentElement(getElement)
    handleOpen()
  }

  // handle edit  dialog

  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <>
            {numSelected === 1 ? (
              <>
                {' '}
                <Button
                  style={{ marginRight: '5px' }}
                  variant="outlined"
                  color="primary"
                  onClick={() => handleEdit()}
                >
                  Edit Tournament
                </Button>{' '}
                <Button
                  style={{ marginRight: '5px' }}
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleTournaments()}
                >
                  Delete Tournament
                </Button>
              </>
            ) : (
              <>
                <Button
                  style={{ marginRight: '5px' }}
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleTournaments()}
                >
                  Delete Tournament
                </Button>
              </>
            )}
          </>
        ) : (
          <>
            <h4
              style={{
                color: 'black',
                fontWeight: 'bold',
                marginTop: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              className={classes.title}
            >
              <span> All Tournaments</span>
              <CustomButton
                onClick={handleClickOpen}
                target="_blank"
                color="info"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Icon style={{ fontSize: '28px' }} icon="bx:hide" />
                <span>Hide/Show columns</span>
              </CustomButton>
            </h4>
          </>
        )}
      </Toolbar>

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
          {'EDIT TOURNAMENT'}
        </DialogTitle>
        <DialogContent>
          <EditTournament
            setSelected={setSelected}
            setTableData={setTableData}
            tournament={editTournamentElement}
            handleClose={handleClose}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default TournamentTableToolkit
