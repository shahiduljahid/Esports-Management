import React from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Checkbox from '@material-ui/core/Checkbox'

function TeamTableHead(props) {
  const {
    headerCell,
    classes,
    onSelectAllClick,
    numSelected,
    rowCount,
  
  } = props


  return (
    <TableHead>
      <TableRow
        style={{
          background: '#00cfff',
          color: 'white',
          height: '60px',
          fontSize: '20px',
        }}
      >
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headerCell.map((headCell) => {
           return (
            <TableCell
              style={{
                color: 'white',
                fontSize: '15px',
                fontWeight: 'bold',
              }}
              key={headCell.id}
              align="left"              
            >
        
              {headCell.label}
             
            </TableCell>
          )
        })}
      </TableRow>
    </TableHead>
  )
}

export default TeamTableHead
