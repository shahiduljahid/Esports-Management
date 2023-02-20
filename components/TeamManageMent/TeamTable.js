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


//core component

import TeamTableToolkit from './TeamTableToolkit'
import TeamTableHead from './TeamTableHead'


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

TeamTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
}

TeamTableToolkit.propTypes = {
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

export default function TournamentTable({ tableData, setTableData,tournament }) {
  const classes = useStyles()
  const [reload, setReload] = useState()
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)



  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = tableData.map((n) => n.id)
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

  const headerCell = [
    {
      id: 'teamName',
      label: 'Tournament Name',
   
    }
  ]



  return (
    <div className={classes.root}>
      <TeamTableToolkit
        setTableData={setTableData}
        tableData={tableData}
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
          <TeamTableHead
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
                const isItemSelected = isSelected(row?.id)
                const labelId = `enhanced-table-checkbox-${index}`

                return (
                  <StyledTableRow
                    className={`${isItemSelected && classes.selected}`}
                    style={{ height: '60px' }}
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <StyledTableCell
                      onClick={(event) => handleClick(event, row?.id)}
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
                    {teamName && (
                      <StyledTableCell align="left">
                        {reload ? <LoadingSkeleton /> : row?.teamName}
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
            No Team available
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

    </div>
  )
}
