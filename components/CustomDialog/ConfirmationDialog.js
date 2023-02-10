import React from 'react'
//dialog
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import CustomButton from '/components/CustomButtons/Button.js'


const ConfirmationDialog = ({
  handleYes,
  handleNo,
  confirmOpen,
  handleConfirmClose,
  title,
  message,
}) => {
  return (
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
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          style={{ color: 'black', textTransform: 'uppercase' }}
          id="alert-dialog-description"
        >
          {message}
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
  )
}

export default ConfirmationDialog
