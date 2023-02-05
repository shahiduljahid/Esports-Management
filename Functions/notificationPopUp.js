const notificationPopUp = (message, variant, enqueueSnackbar) => {
  return enqueueSnackbar(message.toUpperCase(), {
    variant: variant,
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center',
    },
  })
}

export default notificationPopUp
