import React, { useState } from 'react'
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
import DashboardLayout from '../../Layout/DashboardLayout'
import getUrl from '../../Functions/getUrl'

//dialog component
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import notificationPopUp from './../../Functions/notificationPopUp'
import AllTournamentTable from '/components/Tournament/AllTournamentTable'

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

const textFields = [
  {
    label: 'Tournament Title',
    placeHolder: 'Pubg Mobile Pro league',
    type: 'text',
    name: 'tournament_Title',
    isRequired: true,
  },
  {
    label: 'Organization Name',
    placeHolder: 'Esports Ground Esports',
    type: 'text',
    name: 'org_Name',
    isRequired: true,
  },
]

const CreateTournament = ({ users, tournaments }) => {
  const [tableData, setTableData] = useState(tournaments)
  const classes = useStyles()
  const [imgLoading, setImageLoading] = useState(false)
  const [reload, setReload] = useState(false)

  const [tourFormat, setTourFormat] = useState()
  const [tourLogo, setTourLogo] = useState()
  const [orgLogo, setOrgLogo] = useState()
  const [galleryImg, setGalleryImg] = useState([])
  const handleTournamentFormat = (e) => {
    setTourFormat(e.target.value)
  }

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

    data.tourFormat = tourFormat ? tourFormat : 'SQUAD'
    data.orgLogo = orgLogo ? orgLogo : ''
    data.tourLogo = tourLogo
    console.log(data)
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/tournaments`,
      data,
    )
    if (res.data) {
      setTableData(res.data)
      notificationPopUp(
        'tournament created successfully',
        'success',
        enqueueSnackbar,
      )
      // reset()
      // setTourLogo()
      // setOrgLogo()
    }
  }

  //handle image upload

  const handleFile = async (e, name) => {
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
    console.log(data)
    setGalleryImg([data])
    setImgDialogOpen(true)
  }

  const handleImgDialogClose = () => {
    setImgDialogOpen(false)
  }

  //handle Delete Tournament
  const handleTournaments = async (item) => {
    setReload(true)
    try {
      const id = item._id
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/tournaments/${id}`,
      )
      if (res.data) {
        const deletedEleId = res.data._id
        const newTableData = tableData.filter(
          (item) => item._id !== deletedEleId,
        )
        setTableData(newTableData)
        setReload(false)
      }
    } catch (err) {
      console.log(err)
    }
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
          <span>Create New Tournament</span>
        </h4>

        <GridContainer style={{ margin: 0 }}>
          {textFields.map((textField) => {
            return (
              <GridItem xs={12} sm={6} md={4}>
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

          <GridItem xs={12} sm={6} md={4}>
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
          </GridItem>
          <GridItem xs={6} sm={4} md={3}>
            <div style={{ display: 'flex' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'start',
                  alignItems: 'center',
                }}
              >
                <input
                  onChange={(e) => handleFile(e, 'orgLogo')}
                  accept="image/*"
                  id="orgLogo"
                  type="file"
                  hidden
                />
                <label htmlFor="orgLogo">
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
          <GridItem xs={6} sm={4} md={3}>
            <div style={{ display: 'flex' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'start',
                  alignItems: 'center',
                }}
              >
                <input
                  onChange={(e) => handleFile(e, 'tourLogo')}
                  accept="image/*"
                  id="tourLogo"
                  type="file"
                  hidden
                />
                <label htmlFor="tourLogo">
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
          Create Tournament
        </CustomButton>
      </form>
      <div>
        <AllTournamentTable
          tournaments={tableData}
          handleTournaments={handleTournaments}
          reload={reload}
        />
      </div>
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

CreateTournament.layout = DashboardLayout
export async function getServerSideProps() {
  // Fetch data from external API
  const tournament = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/tournaments`,
  )
  const tournaments = await tournament.json()
  const user = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users`)
  const users = await user.json()
  return { props: { users, tournaments } }
}

export default CreateTournament
