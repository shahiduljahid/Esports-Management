import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, InputLabel, Button, Grid } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import CustomButton from '/components/CustomButtons/Button.js'
import GridContainer from '/components/Grid/GridContainer.js'
import GridItem from '/components/Grid/GridItem.js'
import { useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack'
import axios from 'axios'

// core components
import getUrl from '../../Functions/getUrl'
import { useAuth } from '../../lib/auth'
//dialog component
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import notificationPopUp from './../../Functions/notificationPopUp'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}))

const handleUserTourData = (userId, allTour) => {
  return allTour.filter((item) => item.creator === userId)
}
const EditTournament = ({ setTableData, tournament, handleClose ,setSelected }) => {
  const { user } = useAuth()
  const classes = useStyles()
  const [imgLoading, setImageLoading] = useState(false)
  const [tourFormat, setTourFormat] = useState(tournament?.tourFormat)
  const [tourLogo, setTourLogo] = useState(tournament?.tourLogo)
  const [orgLogo, setOrgLogo] = useState(tournament?.tourLogo)
  const [galleryImg, setGalleryImg] = useState([])
  const handleTournamentFormat = (e) => {
    setTourFormat(e.target.value)
  }
  const textFields = [
    {
      label: 'Tournament Title',
      placeHolder: 'Pubg Mobile Pro league',
      type: 'text',
      name: 'tournament_Title',
      defaultValue: tournament?.tournament_Title,
      isRequired: true,
    },
    {
      label: 'Organization Name',
      placeHolder: 'Esports Ground Esports',
      type: 'text',
      name: 'org_Name',
      defaultValue: tournament?.org_Name,
      isRequired: true,
    },
  ]

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()
  const { enqueueSnackbar } = useSnackbar()

  //useForm and on Submit functions

  const onSubmit = async (data) => {
    if (!orgLogo) {
      notificationPopUp(
        'organization logo not uploaded',
        'warning',
        enqueueSnackbar,
      )
    }
    if (!tourLogo) {
      notificationPopUp(
        'tournament logo not uploaded',
        'warning',
        enqueueSnackbar,
      )
    }
    data.creator = user?._id
    data.tourFormat = tourFormat ? tourFormat : 'SQUAD'
    data.orgLogo = orgLogo ? orgLogo : ''
    data.tourLogo = tourLogo ? tourLogo : ''
    console.log(data)
     const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/tournaments/TournamentDetails/${tournament._id}`,
      data,
    )
    if (res.data) {
      setTableData(handleUserTourData(user?._id, res.data))
      notificationPopUp(
        'tournament Edited successfully',
        'success',
        enqueueSnackbar,
      )
      setSelected([])
      reset()
      setTourLogo()
      setOrgLogo()
      handleClose()
    }
  }

  //handle image upload

  const handleEditFile = async (e, name) => {
    setImageLoading(true)
    const file = await e.target.files[0]
    const url = await getUrl(file)
    if (name === 'tourLogo') {
      setTourLogo(url)
    }
    if (name === 'orgLogo') {
      setOrgLogo(url)
    }
    setImageLoading(false)
  }
  //handle img dialog

  const [imgDialogOpen, setImgDialogOpen] = useState(false)

  const handleImgDialogOpen = (data) => {
    setGalleryImg([data])
    setImgDialogOpen(true)
  }

  const handleImgDialogClose = () => {
    setImgDialogOpen(false)
  }

  return (
    <>
      {imgLoading && (
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
      <form
        style={{
          marginTop: '20px',
          padding: 5,
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <GridContainer style={{ margin: 0 }}>
          {textFields.map((textField, i) => {
            return (
              <GridItem key={i} xs={12} sm={6}>
                <InputLabel
                  required={textField.isRequired}
                  style={{
                    marginBottom: '10px',
                  }}
                >
                  {textField.label}
                </InputLabel>

                <TextField
                  style={{
                    marginBottom: '20px',
                    marginRight: '10px',
                    width: '100%',
                  }}
                  variant={'outlined'}
                  type={textField.type}
                  id={textField.name}
                  name={textField.name}
                  defaultValue={textField.defaultValue}
                  {...register(textField.name, {
                    required: textField.isRequired,
                  })}
                ></TextField>
              </GridItem>
            )
          })}

          {/* <GridItem xs={12} sm={6}>
            <InputLabel>Select Tournament Format</InputLabel>

            <Autocomplete
              value={tourFormat}
              style={{
                width: '100%',
                margin: '2px 0px',
                marginTop: '10px',
                marginBottom: '10px',
              }}
              // searchText="example"
              id="tags-filled"
              options={['SQUAD', 'DUO', 'SOLO', 'TDM'].map((option) => option)}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <>
                  <TextField
                    onBlur={(e) => handleTournamentFormat(e)}
                    id="standard-select-currency"
                    variant="outlined"
                    name="user"
                    {...params}
                  />
                </>
              )}
            />
          </GridItem> */}
          <GridItem
            style={{ display: 'flex', paddingTop: '10px' }}
            xs={12}
            sm={6}
          >
            <div style={{ display: 'flex' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'start',
                  alignItems: 'center',
                }}
              >
                <input
                  onChange={(e) => handleEditFile(e, 'orgLogo')}
                  accept="image/*"
                  id="EditOrgLogo"
                  type="file"
                  hidden
                />
                <label htmlFor="EditOrgLogo">
                  <Button color="primary" variant="outlined" component="span">
                    {' '}
                    {'Organization Logo'}
                  </Button>
                </label>
              </div>
              {orgLogo && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: '10px',
                  }}
                >
                  <a
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleImgDialogOpen(orgLogo)}
                  >
                    VIEW IMAGE
                  </a>
                </div>
              )}
            </div>
          </GridItem>
          <GridItem
            style={{ display: 'flex', paddingTop: '10px' }}
            xs={12}
            sm={6}
          >
            <div style={{ display: 'flex' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'start',
                  alignItems: 'center',
                }}
              >
                <input
                  onChange={(e) => handleEditFile(e, 'tourLogo')}
                  accept="image/*"
                  id="EditTourLogo"
                  type="file"
                  hidden
                />
                <label htmlFor="EditTourLogo">
                  <Button color="secondary" variant="outlined" component="span">
                    {' '}
                    {'Tournament Logo'}
                  </Button>
                </label>
              </div>
              {tourLogo && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: '10px',
                  }}
                >
                  <a
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleImgDialogOpen(tourLogo)}
                  >
                    VIEW IMAGE
                  </a>
                </div>
              )}
            </div>
          </GridItem>
        </GridContainer>
        <CustomButton style={{ marginTop: '50px' }} type="submit" color="info">
          Edit Tournament
        </CustomButton>
      </form>
      <Dialog
        open={imgDialogOpen}
        onClose={handleImgDialogClose}
        fullScreen={true}
        fullWidth={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: '#00cfff',
              textTransform: 'uppercase',
            }}
          >
            {'Gallery'}
            <Button
              onClick={() => handleImgDialogClose()}
              variant="outlined"
              color="primary"
            >
              Close
            </Button>
          </div>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            {galleryImg.map((item, i) => (
              <Grid
                key={i}
                style={{ display: 'flex', flexDirection: 'column' }}
                item
                xs={12}
                sm={6}
                md={4}
              >
                <img
                  style={{ width: '100%' }}
                  src={item}
                  alt="uploaded image"
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  )
}
export default EditTournament
