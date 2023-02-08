import React, { useEffect, useState } from 'react'
import { Button, Typography, Checkbox, IconButton } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { useForm } from 'react-hook-form'
//internal import
//Dialog import
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import CloseIcon from '@material-ui/icons/Close'

//dialog component
const modalStyles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
})

const DialogTitle = withStyles(modalStyles)((props) => {
  const { children, classes, onClose, ...other } = props

  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h4'>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
}))

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent)

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions)
const ColumnsDialog = ({
  handleClose,
  open,
  headerCell,
  updateColumns,
  setUpdateColumns,
  tableColumnsName,
  title,
}) => {
  const classes = useStyles()
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm()
  const onSubmit = async (data) => {
    console.log(data)
    localStorage.setItem(tableColumnsName, JSON.stringify(data))
    setUpdateColumns(!updateColumns)
    handleClose()
  }
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <form style={{ marginBottom: 0 }} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <span
            style={{
              color: 'black',
              fontWeight: 'bold',
              margin: 0,
              padding: 0,
            }}
            className={classes.title}
          >
            {title ? 'Choose Template' : 'Hide/Show columns'}
          </span>
        </DialogTitle>
        <DialogContent dividers>
          <span  style={{ color: '#00cfff' }}>
            <fieldset
              style={{ float: 'left', display: 'flex', flexWrap: 'wrap' }}
            >
              {headerCell.map((item, i) => {
                return (
                
                    <label key={i}>
                      <Checkbox
                        defaultChecked={item?.value}
                        type="checkbox"
                        name={item?.registerName}
                        id={item?.registerName}
                        {...register(item?.registerName)}
                      />
                      {item?.label}
                    </label>
              
                )
              })}
            </fieldset>
          </span>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" type="submit" color="primary">
            Save changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default ColumnsDialog
