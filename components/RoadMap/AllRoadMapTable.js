import React, { useEffect, useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import {
  Grid,
  Button,
  Chip,
  ImageList,
  ImageListItem,
  Tooltip,
} from '@material-ui/core'
import { Icon } from '@iconify/react'

//internal import
import CustomButton from '/components/CustomButtons/Button.js'
import LoadingSkeleton from '../LoadingSkeleton/LoadingSkeleton'
import ColumnsDialog from '../ColumnDialog/ColumnsDialog'

//dialog
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import StarBorderIcon from '@material-ui/icons/StarBorder'

//dialog component
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
}))

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow)

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: '#00cfff',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip)

const AllRoadMapTable = ({ tournaments, handleTournaments, reload }) => {
  console.log(tournaments)
  const classes = useStyles()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const handleChangePage = (event, newPage) => {
    console.log(newPage)
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  //handle columns

  const [open, setOpen] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const [viewableColumns, setViewableColumns] = useState({
    tourFormat: true,
    orgLogo: true,
    tourLogo: true,
    tournament_Title: true,
    org_Name: true,
  })

  const {
    tourFormat,
    orgLogo,
    tourLogo,
    tournament_Title,
    org_Name,
  } = viewableColumns

  let tableColumnsName = 'RoadMapTableColumns'

  const [updateColumns, setUpdateColumns] = useState(false)

  const headerCell = [
    {
      label: 'Tournament Title',
      value: tournament_Title,
      registerName: 'tournament_Title',
    },
    { label: 'Organization', value: org_Name, registerName: 'org_Name' },
    { label: 'Format', value: tourFormat, registerName: 'tourFormat' },
    { label: 'Organization Logo', value: orgLogo, registerName: 'orgLogo' },
    { label: 'Tournament Logo', value: tourLogo, registerName: 'tourLogo' },
  ]

  //handle img dialog

  const [imgDialogOpen, setImgDialogOpen] = useState(false)
  const [image, setImage] = useState([])

  const handleGallery = (image) => {
    setImage(image)
    if (image) {
      handleImgDialogOpen()
    }
  }

  const handleImgDialogOpen = () => {
    setImgDialogOpen(true)
  }

  const handleImgDialogClose = () => {
    setImgDialogOpen(false)
  }

  // useForm and on Submit functions
  useEffect(() => {
    if (localStorage.getItem(tableColumnsName)) {
      setViewableColumns(JSON.parse(localStorage.getItem(tableColumnsName)))
    }
  }, [updateColumns])

  return (
    <>
      <Grid>
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
          <span> All RoadMaps</span>
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

        <TableContainer className={classes.containerFluid}>
          <Table size="small" stickyHeader aria-label="sticky table">
            <TableHead style={{ height: 50 }}>
              <TableRow>
                {headerCell.map((item, i) => {
                  if (item?.value) {
                    return (
                      <TableCell
                        key={i}
                        style={{
                          background: '#00cfff',
                          color: 'white',
                        }}
                        align="left"
                      >
                        {item?.label}
                      </TableCell>
                    )
                  }
                })}
                <TableCell
                  style={{
                    background: '#00cfff',
                    color: 'white',
                  }}
                  align="left"
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tournaments?.length > 0 &&
                tournaments
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, i) => {
                    return (
                      <StyledTableRow
                        key={i}
                        style={{ height: '60px' }}
                        hover
                        role="checkbox"
                        tabIndex={-1}
                      >
                        {tournament_Title && (
                          <StyledTableCell align="left">
                            {reload ? (
                              <LoadingSkeleton />
                            ) : (
                              item?.tournament_Title
                            )}
                          </StyledTableCell>
                        )}
                        {org_Name && (
                          <StyledTableCell align="left">
                            {reload ? <LoadingSkeleton /> : item?.org_Name}
                          </StyledTableCell>
                        )}

                        {tourFormat && (
                          <StyledTableCell align="left">
                            {reload ? <LoadingSkeleton /> : item?.tourFormat}
                          </StyledTableCell>
                        )}
                        {orgLogo && (
                          <StyledTableCell
                            onClick={() => handleGallery(item?.orgLogo)}
                            style={{ cursor: 'pointer' }}
                            align="left"
                          >
                            {reload ? (
                              <LoadingSkeleton />
                            ) : item?.orgLogo ? (
                              <>
                                {' '}
                                <LightTooltip title="Gallery" placement="top">
                                  <Chip
                                    color="primary"
                                    style={{
                                      margin: '1px',
                                      cursor: 'pointer',
                                    }}
                                    key={item?.orgLogo}
                                    label={'VIEW ORG LOGO'}
                                    className={classes.chip}
                                  />
                                  {/* <a>VIEW ORG LOGO</a> */}
                                </LightTooltip>
                              </>
                            ) : (
                              // <p>NOT UPLOADED</p>
                              <Chip
                                color="default"
                                style={{ margin: '1px', cursor: 'pointer' }}
                                label={'NOT UPLOADED'}
                                className={classes.chip}
                              />
                            )}
                          </StyledTableCell>
                        )}
                        {tourLogo && (
                          <StyledTableCell
                            onClick={() => handleGallery(item?.tourLogo)}
                            style={{ cursor: 'pointer' }}
                            align="left"
                          >
                            {reload ? (
                              <LoadingSkeleton />
                            ) : item?.tourLogo ? (
                              <>
                                {' '}
                                <LightTooltip title="Gallery" placement="top">
                                  <Chip
                                    color="secondary"
                                    style={{
                                      margin: '1px',
                                      cursor: 'pointer',
                                    }}
                                    key={item?.tourLogo}
                                    label={'VIEW TOUR LOGO'}
                                    className={classes.chip}
                                  />
                                </LightTooltip>
                              </>
                            ) : (
                              <Chip
                                color="default"
                                style={{ margin: '1px', cursor: 'pointer' }}
                                label={'NOT UPLOADED'}
                                className={classes.chip}
                              />
                            )}
                          </StyledTableCell>
                        )}

                        <StyledTableCell align="left">
                          {reload ? (
                            <LoadingSkeleton />
                          ) : (
                            <Button
                              onClick={() => handleTournaments(item)}
                              variant="outlined"
                              color="primary"
                            >
                              View
                            </Button>
                          )}
                        </StyledTableCell>
                      </StyledTableRow>
                    )
                  })}
            </TableBody>
          </Table>
          {tournaments.length <= 0 && (
            <h4
              style={{
                color: 'black',
                fontWeight: 'bold',
                marginTop: '0px',
                textAlign: 'center',
                display: 'block',
              }}
              className={classes.title}
            >
              No Tournaments available
            </h4>
          )}
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={tournaments?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Grid>
      <ColumnsDialog
        tableColumnsName={tableColumnsName}
        updateColumns={updateColumns}
        setUpdateColumns={setUpdateColumns}
        handleClose={handleClose}
        open={open}
        headerCell={headerCell}
      ></ColumnsDialog>
      <Dialog
        open={imgDialogOpen}
        onClose={handleImgDialogClose}
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
          <ImageList
            style={{ justifyContent: 'center' }}
            gap={1}
            className={classes.imageList}
          >
            <ImageListItem style={{ padding: '20px' }}>
              <img src={image} alt={image} />
            </ImageListItem>
          </ImageList>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleImgDialogClose()} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AllRoadMapTable
