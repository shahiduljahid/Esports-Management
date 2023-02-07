import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Checkbox from '@material-ui/core/Checkbox'
import { useAuth } from '../../lib/auth'
import LoadingSkeleton from '../LoadingSkeleton/LoadingSkeleton'
import ColumnsDialog from '../ColumnDialog/ColumnsDialog'

//dialog component
//dialog component
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TournamentTableToolkit from './TournamentTableToolkit'
import TournamentTableHead from './TournamentTableHead'
import { Paper, Chip, Tooltip, Button, Grid } from '@material-ui/core'

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

TournamentTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
}

TournamentTableToolkit.propTypes = {
  numSelected: PropTypes.number.isRequired,
}

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
  },
  selected: {
    backgroundColor: 'rgb(0 200 247 / 6%) !important',
    '&:hover': {
      backgroundColor: 'rgb(0 200 247 / 6%) !important',
    },
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}))

export default function TournamentTable({ tableData, setTableData }) {
  const classes = useStyles()
  const [reload, setReload] = useState()
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const { user } = useAuth()

  const handleDate = (getDate) => {
    let date = new Date(getDate)

    return date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear()
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = tableData.map((n) => n._id)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }
    setSelected(newSelected)
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  const isSelected = (name) => selected.indexOf(name) !== -1
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, tableData.length - page * rowsPerPage)

  // handle table columns
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

  let tableColumnsName = 'TournamentTableColumns'

  const [updateColumns, setUpdateColumns] = useState(false)

  const headerCell = [
    {
      id: 'tournament_Title',
      numeric: false,
      disablePadding: true,
      label: 'Tournament Title',
      value: tournament_Title,
      registerName: 'tournament_Title',
    },
    {
      id: 'org_Name',
      numeric: false,
      disablePadding: true,
      label: 'Organization',
      value: org_Name,
      registerName: 'org_Name',
    },
    {
      id: 'tourFormat',
      numeric: false,
      disablePadding: true,
      label: 'Format',
      value: tourFormat,
      registerName: 'tourFormat',
    },
    {
      id: 'orgLogo',
      numeric: false,
      disablePadding: true,
      label: 'Organization Logo',
      value: orgLogo,
      registerName: 'orgLogo',
    },
    {
      id: 'tourLogo',
      numeric: false,
      disablePadding: true,
      label: 'Tournament Logo',
      value: tourLogo,
      registerName: 'tourLogo',
    },
  ]

  //handle img dialog
  const [galleryImg, setGalleryImg] = useState([])

  const [imgDialogOpen, setImgDialogOpen] = useState(false)

  const handleImgDialogOpen = (data) => {
    setGalleryImg([data])
    setImgDialogOpen(true)
  }

  const handleImgDialogClose = () => {
    setImgDialogOpen(false)
  }
  useEffect(() => {
    if (localStorage.getItem(tableColumnsName)) {
      setViewableColumns(JSON.parse(localStorage.getItem(tableColumnsName)))
    }
  }, [updateColumns])

  return (
    <div className={classes.root}>
      <TournamentTableToolkit
        setTableData={setTableData}
        tableData={tableData}
        handleClickOpen={handleClickOpen}
        setReload={setReload}
        selected={selected}
        numSelected={selected.length}
        setSelected={setSelected}
      />
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size={dense ? 'small' : 'medium'}
          aria-label="enhanced table"
        >
          <TournamentTableHead
            headerCell={headerCell}
            classes={classes}
            numSelected={selected.length}
            onSelectAllClick={handleSelectAllClick}
            rowCount={tableData.length}
          />
          <TableBody>
            {tableData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row?._id)
                const labelId = `enhanced-table-checkbox-${index}`

                return (
                  <StyledTableRow
                    className={`${isItemSelected && classes.selected}`}
                    style={{ height: '60px' }}
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row._id}
                    selected={isItemSelected}
                  >
                    <StyledTableCell
                      onClick={(event) => handleClick(event, row?._id)}
                      padding="checkbox"
                    >
                      {reload ? (
                        <LoadingSkeleton />
                      ) : (
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      )}
                    </StyledTableCell>
                    {tournament_Title && (
                      <StyledTableCell align="left">
                        {reload ? <LoadingSkeleton /> : row?.tournament_Title}
                      </StyledTableCell>
                    )}
                    {org_Name && (
                      <StyledTableCell align="left">
                        {reload ? <LoadingSkeleton /> : row?.org_Name}
                      </StyledTableCell>
                    )}

                    {tourFormat && (
                      <StyledTableCell align="left">
                        {reload ? <LoadingSkeleton /> : row?.tourFormat}
                      </StyledTableCell>
                    )}
                    {orgLogo && (
                      <StyledTableCell
                        onClick={() => handleImgDialogOpen(row?.orgLogo)}
                        style={{ cursor: 'pointer' }}
                        align="left"
                      >
                        {reload ? (
                          <LoadingSkeleton />
                        ) : row?.orgLogo ? (
                          <>
                            {' '}
                            <LightTooltip title="Gallery" placement="top">
                              <Chip
                                color="primary"
                                style={{
                                  margin: '1px',
                                  cursor: 'pointer',
                                }}
                                key={row?.orgLogo}
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
                        onClick={() => handleImgDialogOpen(row?.tourLogo)}
                        style={{ cursor: 'pointer' }}
                        align="left"
                      >
                        {reload ? (
                          <LoadingSkeleton />
                        ) : row?.tourLogo ? (
                          <>
                            {' '}
                            <LightTooltip title="Gallery" placement="top">
                              <Chip
                                color="secondary"
                                style={{
                                  margin: '1px',
                                  cursor: 'pointer',
                                }}
                                key={row?.tourLogo}
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
                  </StyledTableRow>
                )
              })}
          </TableBody>
        </Table>
        {tableData?.length <= 0 && (
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
            No Tournament available
          </h4>
        )}
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={tableData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

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
          <Grid
            style={{ display: 'flex', justifyContent: 'center' }}
            container
            spacing={3}
          >
            {galleryImg.map((item, i) => (
              <Grid
                key={i}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
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
    </div>
  )
}
