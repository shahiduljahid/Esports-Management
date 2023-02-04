import React, { useState } from 'react'
import CustomInput from '../CustomInput/CustomInput.js'
import { Icon } from '@iconify/react'
import searchFill from '@iconify/icons-eva/search-fill'

import Button from '../CustomButtons/Button.js'
import styles from '../../assets/jss/material-dashboard-react/components/headerLinksStyle'
import { Hidden } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Search from '@material-ui/icons/Search'
import { styled, fade } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import {
  Box,
  Input,
  Slide,
  // Button,
  InputAdornment,
  IconButton,
} from '@material-ui/core'

// ----------------------------------------------------------------------

const APPBAR_MOBILE = 64
const APPBAR_DESKTOP = 92

const SearchbarStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: APPBAR_MOBILE,
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  padding: theme.spacing(0, 3),
  // boxShadow: theme.customShadows.z8,
  backgroundColor: `${fade(theme.palette.background.default, 0.72)}`,
  [theme.breakpoints.up('md')]: {
    height: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}))

const useStyles = makeStyles(styles)
const SearchBar = () => {
  const classes = useStyles()
  const [isOpen, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen((prev) => !prev)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Hidden xsDown implementation="css">
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          className={classes.searchWrapper}
        >
          <CustomInput
            formControlProps={{
              className: classes.search,
            }}
            inputProps={{
              placeholder: 'Search',
              inputProps: {
                'aria-label': 'Search',
              },
            }}
            style={{ color: 'black' }}
          />
          <Button color="white" aria-label="edit" justIcon round>
            <Search />
          </Button>
        </div>
      </Hidden>
      <Hidden smUp implementation="css">
        {!isOpen && (
          <Button
            onClick={handleOpen}
            color="white"
            aria-label="edit"
            justIcon
            round
          >
            <Search />
          </Button>
        )}

        <Slide
          style={{ display: 'flex' }}
          direction="down"
          in={isOpen}
          mountOnEnter
          unmountOnExit
        >
          <SearchbarStyle>
            <Input
              autoFocus
              fullWidth
              disableUnderline
              placeholder="Search…"
              startAdornment={
                <InputAdornment position="start">
                  <Button
                    color="danger"
                    aria-label="edit"
                    justIcon
                    round
                    onClick={handleClose}
                  >
                    <CloseIcon />
                  </Button>
                </InputAdornment>
              }
              sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
            />
            <Button
              color="info"
              aria-label="edit"
              justIcon
              round
              onClick={handleClose}
            >
              <Box
                component={Icon}
                icon={searchFill}
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </Button>
          </SearchbarStyle>
        </Slide>
      </Hidden>
    </>
  )
}

export default SearchBar
